import * as React from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Repository} from '../api/types';
import colors from '../lib/colors';
import {removeRepository} from '../store/slice';
import Dot from './Dot';
import {Icon, Spacer, Text} from './shared';

type RepositoryListItemProps = {
  data: Repository;
};

const RepositoryListItem = ({data}: RepositoryListItemProps) => {
  const dispatch = useDispatch();
  const openBrowser = () => {
    Linking.openURL(data.html_url);
  };

  const handleDelete = () => {
    Alert.alert('', `선택한 저장소를 삭제하시겠습니까?`, [
      {
        text: '취소',
      },
      {
        text: '삭제',
        onPress: () => {
          dispatch(removeRepository(data.id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.repo}>
        <Image style={styles.avatar} source={{uri: data.owner.avatar_url}} />
        <Text style={styles.repositoryName}>{data.full_name}</Text>
        <Spacer flex />
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="trash" size={14} color="#fa5252" />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{data.description}</Text>

      <View style={styles.divider} />

      <View style={styles.subInfo}>
        {/* 스타 */}
        <Icon
          style={styles.subInfoIcon}
          name="star-fill"
          color="#fcc419"
          size={16}
        />
        <Text style={styles.subInfoText}>
          {data.stargazers_count.toLocaleString()}
        </Text>
        {/* 언어 */}
        {data.language && (
          <>
            <Dot
              style={styles.subInfoIcon}
              color={colors.language[data.language.toLowerCase()]}
              size={12}
            />
            <Text style={styles.subInfoText}>{data.language}</Text>
          </>
        )}
        <Spacer flex={1} />
        {/* 깃허브 링크 */}
        <TouchableOpacity onPress={openBrowser}>
          <Icon name="mark-github" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepositoryListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    margin: 12,
    //shadow
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  repo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 4,
    resizeMode: 'center',
  },
  repositoryName: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    marginVertical: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 8,
    backgroundColor: '#eeeeee',
  },
  subInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subInfoIcon: {
    marginRight: 2,
  },
  subInfoText: {
    fontSize: 12,
    marginRight: 8,
  },
});
