import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import api from '../api';
import {Repository} from '../api/types';
import SearchBar from '../components/SearchBar';
import SearchListItem from '../components/SearchListItem';
import {RootStackParamList} from '../navigators/RootNavigator';
import {RootState} from '../store';
import {toggleRepository} from '../store/slice';
import Toast from 'react-native-toast-message';
import {Text} from '../components/shared';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen = (props: Props) => {
  const dispatch = useDispatch();
  const registeredRepos = useSelector((state: RootState) => state.repositories);
  const [searchResult, setSearchResult] = useState<Repository[]>([]);

  const handleSearch = async (keyword: string) => {
    if (!keyword) {
      return;
    }
    try {
      const data = await api.getRepositoriesByName(keyword);
      setSearchResult(data.items);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  const handleItemPress = (repo: Repository) => {
    dispatch(toggleRepository(repo));
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={searchResult}
        ListEmptyComponent={() => (
          <View style={[styles.container, styles.center]}>
            <Text>검색결과가 없습니다.</Text>
          </View>
        )}
        renderItem={({item}) => {
          return (
            <SearchListItem
              data={item}
              active={registeredRepos.findIndex(e => e.id === item.id) > -1}
              onPress={handleItemPress}
            />
          );
        }}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
