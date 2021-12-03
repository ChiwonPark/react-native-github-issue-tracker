import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import {RepositoriesResponse, Repository} from '../api/types';
import SearchBar from '../components/SearchBar';

export default function RepositoriesScreen() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const fetchRepositoriesByKeyword = async (keyword: string) => {
    try {
      const {data} = await axios.get<RepositoriesResponse>(
        'https://api.github.com/search/repositories',
        {
          params: {
            q: keyword,
          },
        },
      );
      setRepositories(data.items);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepositoriesByKeyword('react-native');
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <SearchBar onSubmit={fetchRepositoriesByKeyword} />
      {repositories.map(item => (
        <Text key={`repo-${item.id}`}>{item.name}</Text>
      ))}
    </View>
  );
}
