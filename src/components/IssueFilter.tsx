import React, {useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../lib/colors';
import {RootState} from '../store';
import {setFilter} from '../store/slice';
import Formatter from '../utils/Formatter';
import {Button, Chip, Icon, Spacer, Text} from './shared';
import ModalBase from './shared/ModalBase';

type IssueFilterProps = {
  visibleShadow?: boolean;
};

const IssueFilter = ({visibleShadow}: IssueFilterProps) => {
  const dispatch = useDispatch();
  const {repositories, filter} = useSelector((state: RootState) => state);
  const {issueState, repos, sort} = filter;
  const [pickerId, setPickerId] = useState<
    'issueState' | 'repo' | 'sort' | null
  >(null);

  const [selectedRepos, setSelectedRepos] = useState(repos);

  const issueChipColor = useMemo(() => {
    return {
      all: 'grey',
      open: colors.github.issue_opend,
      closed: colors.github.issue_closed,
    }[issueState];
  }, [issueState]);

  const repoChipColor =
    repositories.length === repos.length ? 'grey' : 'purple';

  const sortChipColor = sort === 'newest' ? 'grey' : 'orange';

  const onSelectIssueState = (value: 'all' | 'open' | 'closed') => {
    dispatch(
      setFilter({
        issueState: value,
      }),
    );
    setPickerId(null);
  };

  const onSelectSort = (sort: 'newest' | 'oldest' | 'updated') => {
    dispatch(
      setFilter({
        sort,
      }),
    );
    setPickerId(null);
  };

  useEffect(() => {
    setSelectedRepos(repos);
  }, [pickerId, repos]);

  const onSelectRepo = (value: string) => {
    if (selectedRepos.includes(value)) {
      setSelectedRepos(prev => prev.filter(e => e !== value));
    } else {
      setSelectedRepos(prev => [...prev, value]);
    }
  };

  const applyRepoFilter = () => {
    dispatch(
      setFilter({
        repos: selectedRepos,
      }),
    );
    setPickerId(null);
  };

  return (
    <View style={[styles.container, visibleShadow && styles.shadow]}>
      <Icon name="filter" size={16} />
      <Spacer width={4} />
      {/* 이슈 상태 필터 */}
      <Chip
        style={styles.chip}
        labelStyle={styles.chipLabel}
        label={Formatter.capitalize(issueState)}
        color={issueChipColor}
        borderColor={issueChipColor}
        rightIcon="triangle-down"
        rightIconSize={16}
        rightIconColor="grey"
        onPress={() => setPickerId('issueState')}
      />
      <ModalBase
        visible={pickerId === 'issueState'}
        onRequestClose={() => setPickerId(null)}
        onOutsidePress={() => setPickerId(null)}>
        <View style={styles.popupContainer}>
          <View style={styles.popupTitle}>
            <Text fontSize={15} fontWeight="900">
              이슈 상태 필터
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => onSelectIssueState('all')}>
            <Text fontSize={14} fontWeight="500">
              All
            </Text>
            {issueState === 'all' && (
              <Icon name="check" size={16} color={'#339af0'} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => onSelectIssueState('open')}>
            <Text fontSize={14} fontWeight="500">
              Open
            </Text>
            {issueState === 'open' && (
              <Icon name="check" size={16} color={'#339af0'} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => onSelectIssueState('closed')}>
            <Text fontSize={14} fontWeight="500">
              Closed
            </Text>
            {issueState === 'closed' && (
              <Icon name="check" size={16} color={'#339af0'} />
            )}
          </TouchableOpacity>
        </View>
      </ModalBase>

      {/* 저장소 필터 */}
      <Chip
        style={styles.chip}
        labelStyle={styles.chipLabel}
        label="repositories"
        color={repoChipColor}
        borderColor={repoChipColor}
        rightIcon="triangle-down"
        rightIconSize={16}
        rightIconColor="grey"
        onPress={() => setPickerId('repo')}
      />

      <ModalBase
        visible={pickerId === 'repo'}
        onRequestClose={() => setPickerId(null)}
        onOutsidePress={() => setPickerId(null)}>
        <View style={styles.popupContainer}>
          <View style={styles.popupTitle}>
            <Text fontSize={15} fontWeight="900">
              저장소 필터
            </Text>
          </View>
          {repositories.map(e => (
            <TouchableOpacity
              key={`${e.id}`}
              style={styles.checkItem}
              onPress={() => onSelectRepo(e.full_name)}>
              <Text
                style={styles.checkItemLabel}
                fontSize={14}
                fontWeight="500">
                {e.full_name}
              </Text>
              {selectedRepos.includes(e.full_name) && (
                <Icon name="check" size={16} color={'#339af0'} />
              )}
            </TouchableOpacity>
          ))}
          <View style={styles.popupFooter}>
            <Button
              disabled={selectedRepos.length === 0}
              label="적용"
              color={colors.primary}
              onPress={applyRepoFilter}
            />
          </View>
        </View>
      </ModalBase>

      {/* 정렬 순서 */}
      <Chip
        style={styles.chip}
        labelStyle={styles.chipLabel}
        label={Formatter.capitalize(sort)}
        color={sortChipColor}
        borderColor={sortChipColor}
        rightIcon="triangle-down"
        rightIconSize={16}
        rightIconColor="grey"
        onPress={() => setPickerId('sort')}
      />
      <ModalBase
        visible={pickerId === 'sort'}
        onRequestClose={() => setPickerId(null)}
        onOutsidePress={() => setPickerId(null)}>
        <View style={styles.popupContainer}>
          <View style={styles.popupTitle}>
            <Text fontSize={15} fontWeight="900">
              정렬
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => onSelectSort('newest')}>
            <Text fontSize={14} fontWeight="500">
              Newest
            </Text>
            {sort === 'newest' && (
              <Icon name="check" size={16} color={'#339af0'} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => onSelectSort('oldest')}>
            <Text fontSize={14} fontWeight="500">
              Oldest
            </Text>
            {sort === 'oldest' && (
              <Icon name="check" size={16} color={'#339af0'} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => onSelectSort('updated')}>
            <Text fontSize={14} fontWeight="500">
              Recently Updated
            </Text>
            {sort === 'updated' && (
              <Icon name="check" size={16} color={'#339af0'} />
            )}
          </TouchableOpacity>
        </View>
      </ModalBase>
    </View>
  );
};

export default IssueFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        zIndex: 1,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  chip: {
    height: 28,
    paddingLeft: 12,
    borderRadius: 14,
  },
  chipLabel: {
    fontSize: 14,
  },
  popupContainer: {
    width: 300,
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  popupTitle: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  popupFooter: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  checkItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  checkItemLabel: {
    flex: 1,
    marginRight: 4,
  },
});
