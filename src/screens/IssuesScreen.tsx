import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import api from '../api';
import {Issue} from '../api/types';
import IssueFilter from '../components/IssueFilter';
import IssueListItem from '../components/IssueListItem';
import {Spacer, Text} from '../components/shared';
import FloatingButton from '../components/shared/FloatingButton';
import colors from '../lib/colors';
import {
  HomeTabParamList,
  RootStackParamList,
} from '../navigators/RootNavigator';
import {RootState} from '../store';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Issues'>,
  NativeStackScreenProps<RootStackParamList>
>;

const IssuesScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const {filter} = useSelector((state: RootState) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Issue[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const [visibleScrollUpButton, setVisibleScrollUpButton] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);

  const fetchIssues = async (isRefresh?: boolean) => {
    if (filter.repos.length === 0) {
      return;
    }

    isRefresh ? setIsRefreshing(true) : setIsLoading(true);
    try {
      const data = await api.getIssues({
        page: 1,
        issueState: filter.issueState,
        repos: filter.repos,
        sort: filter.sort === 'updated' ? 'updated' : 'created',
        order: filter.sort === 'oldest' ? 'asc' : 'desc',
      });
      setData(data.items);
      setIsError(false);
      setCurrentPageNum(1);
      setIsLastPage(data.isLastPage);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      isRefresh ? setIsRefreshing(false) : setIsLoading(false);
    }
  };

  const fetchMoreIssues = async () => {
    if (isLastPage) {
      console.log('isLastPage');
      return;
    }

    setIsMoreLoading(true);
    try {
      const data = await api.getIssues({
        page: currentPageNum + 1,
        issueState: filter.issueState,
        repos: filter.repos,
        sort: filter.sort === 'updated' ? 'updated' : 'created',
        order: filter.sort === 'oldest' ? 'asc' : 'desc',
      });
      setData(prev => [...prev, ...data.items]);
      setCurrentPageNum(prev => prev + 1);
      setIsLastPage(data.isLastPage);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [filter]);

  let container = null;

  if (isLoading) {
    container = (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    container = (
      <FlatList
        ref={listRef}
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchIssues(true)}
          />
        }
        data={data}
        onScroll={({nativeEvent}) => {
          if (nativeEvent.contentOffset.y < 10) {
            setIsScrollTop(true);
          } else {
            setIsScrollTop(false);
          }

          if (nativeEvent.contentOffset.y > height) {
            if (!visibleScrollUpButton) {
              setVisibleScrollUpButton(true);
            }
          } else {
            if (visibleScrollUpButton) {
              setVisibleScrollUpButton(false);
            }
          }
        }}
        renderItem={({item}) => <IssueListItem data={item} />}
        ListHeaderComponent={() => <Spacer height={12} />}
        ListEmptyComponent={() => (
          <View style={[styles.container, styles.center]}>
            <Text>이슈가 없습니다.</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.listFooter}>
            {isMoreLoading ? <ActivityIndicator /> : null}
          </View>
        )}
        onEndReached={() => {
          console.log('onEndReached');
          fetchMoreIssues();
        }}
        keyExtractor={item => `issue-${item.node_id}`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <IssueFilter visibleShadow={!isScrollTop} />
      {container}
      {visibleScrollUpButton && (
        <FloatingButton
          icon="arrow-up"
          backgroundColor={colors.primary}
          opacity={0.7}
          onPress={() => {
            listRef.current?.scrollToOffset({offset: 0});
          }}
        />
      )}
    </View>
  );
};

export default IssuesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listFooter: {
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
