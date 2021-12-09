import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Repository} from '../api/types';
import colors from '../lib/colors';
import Dot from './Dot';
import {Icon} from './shared';

type SearchListItemProps = {
  data: Repository;
  active: boolean;
  onPress: (repo: Repository) => void;
};

const SearchListItem = ({data, active, onPress}: SearchListItemProps) => {
  console.log('render ', data.name);
  return (
    <TouchableWithoutFeedback onPress={() => onPress(data)}>
      <View style={[styles.container, active && styles.active]}>
        {/* 프로필 이미지 */}
        <Image style={styles.avatar} source={{uri: data.owner.avatar_url}} />
        <View style={styles.info}>
          {/* 저장소 이름 */}
          <Text style={styles.ownerName}>{data.owner.login}</Text>
          <Text style={styles.repoName}>{data.name}</Text>

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

            {/* 개발 언어 */}
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
          </View>
        </View>
        {/* 추가/삭제 상태표시 아이콘 */}
        <Icon name={active ? 'minus' : 'plus'} size={20} color="#000" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(SearchListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 8,
  },
  active: {
    backgroundColor: '#dbe4ff',
  },
  avatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ownerName: {
    fontSize: 12,
    color: '#555',
  },
  subInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  subInfoIcon: {
    marginRight: 2,
  },
  subInfoText: {
    fontSize: 12,
    marginRight: 8,
  },
});
