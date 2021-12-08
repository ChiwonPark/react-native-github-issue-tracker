import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {Repository} from '../api/types';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import api from '../api';
import RepositoryListItem from '../components/RepositoryListItem';
import {Button, Spacer, Text} from '../components/shared';
import {
  HomeTabParamList,
  RootStackParamList,
} from '../navigators/RootNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/core';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Repositories'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function RepositoriesScreen({navigation}: Props) {
  const registeredRepos = useSelector((state: RootState) => state.repositories);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const fetchRepositories = async () => {
    if (registeredRepos.length === 0) {
      return;
    }

    const promises = registeredRepos.map(repo =>
      api.getRepositoryById(repo.id),
    );

    setIsLoading(true);
    try {
      const result = await Promise.all(promises);
      setRepositories(result);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [registeredRepos]);

  if (registeredRepos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>등록된 저장소가 없습니다.</Text>
        <Spacer height={12} />
        <Button
          label="저장소 찾기"
          icon={'search'}
          large
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      {repositories.map(item => (
        <RepositoryListItem key={`repo-${item.id}`} data={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
