import * as React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Issue} from '../api/types';
import colors from '../lib/colors';
import {isLight} from '../utils/colorUtils';
import Formatter from '../utils/Formatter';
import {Chip, Spacer, Text} from './shared';

type IssueListItemProps = {
  data: Issue;
};

const IssueListItem = ({data}: IssueListItemProps) => {
  const onPress = () => {
    Linking.openURL(data.html_url);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.upperBlock}>
          {/* 저장소 이름 */}
          <Text fontSize={12} color="#555">
            {data.repository_url.split('/').slice(-2).join('/')}
          </Text>
          <Spacer flex />
          {/* 이슈 생성일 */}
          <Text fontSize={12} color="#555">
            {Formatter.getDiffShorten(new Date(), new Date(data.created_at))}
          </Text>
        </View>

        {/* 이슈 제목 */}
        <Text color="#000" fontSize={14} fontWeight="500">
          {data.title}
        </Text>

        {/* 이슈 작성자 */}
        <View style={styles.author}>
          <Image style={styles.avatar} source={{uri: data.user.avatar_url}} />
          <Text fontSize={12} color="#555" fontWeight="500">
            {data.user.login}
          </Text>
        </View>
        <View style={styles.labelsBlock}>
          {/* 이슈 열림/닫힘 */}
          <Chip
            icon={data.state === 'closed' ? 'issue-closed' : 'issue-opened'}
            label={`${data.state}`}
            color={
              data.state === 'closed'
                ? colors.github.issue_closed
                : colors.github.issue_opend
            }
            borderColor={
              data.state === 'closed'
                ? colors.github.issue_closed
                : colors.github.issue_opend
            }
          />
          {/* 코멘트 갯수 */}
          {data.comments > 0 && (
            <Chip
              icon="comment"
              label={`${data.comments}`}
              color="#333"
              backgroundColor="#eee"
              borderColor="#ddd"
            />
          )}
          {/* 이슈 라벨 */}
          {data.labels.map(e => (
            <Chip
              key={`label-${e.id}`}
              color={isLight('#' + e.color) ? '#000' : '#fff'}
              borderColor={e.color === 'ffffff' ? '#000' : '#fff'}
              backgroundColor={`#${e.color}`}
              label={e.name}
            />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(IssueListItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
  },
  upperBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 14,
    height: 14,
    borderRadius: 7,
    resizeMode: 'cover',
    marginRight: 4,
  },
  ownerRepoName: {
    fontSize: 12,
    color: '#555',
  },
  issueTitle: {
    color: '#000',
    fontSize: 14,
  },
  author: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  circle: {
    width: 4,
    height: 4,
    backgroundColor: 'green',
    borderRadius: 2,
  },
  issueClosed: {
    borderColor: 'purple',
  },
  labelsBlock: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 6,
  },
});
