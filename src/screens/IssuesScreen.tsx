import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import IssueFilter from '../components/IssueFilter';
import IssueListItem from '../components/IssueListItem';
import {FloatingButton, Spacer, Text} from '../components/shared';
import {useFetchIssues} from '../hooks';
import colors from '../lib/colors';
import {
  HomeTabParamList,
  RootStackParamList,
} from '../navigators/RootNavigator';
import Toast from '../utils/Toast';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Issues'>,
  NativeStackScreenProps<RootStackParamList>
>;

const IssuesScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const [visibleScrollUpButton, setVisibleScrollUpButton] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);

  const {
    isLoading,
    isRefreshing,
    isMoreLoading,
    error,
    isError,
    data,
    fetchIssues,
    refresh,
    fetchNextPage,
  } = useFetchIssues();

  useEffect(() => {
    if (!error) return;

    Toast.error(error);
  }, [error]);

  const renderItem = useCallback(({item}) => <IssueListItem data={item} />, []);

  return (
    <View style={styles.container}>
      <IssueFilter visibleShadow={!isScrollTop} />
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

      {isLoading && (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!isLoading && (
        <FlatList
          ref={listRef}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
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
          renderItem={renderItem}
          ListHeaderComponent={() => <Spacer height={12} />}
          ListEmptyComponent={() => (
            <View style={[styles.container, styles.center]}>
              <Text>????????? ????????????.</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.listFooter}>
              {isMoreLoading ? <ActivityIndicator /> : null}
            </View>
          )}
          onEndReached={fetchNextPage}
          keyExtractor={item => `issue-${item.node_id}`}
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
