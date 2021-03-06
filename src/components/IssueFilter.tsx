import React, {useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../lib/colors';
import {RootState} from '../store';
import {setFilter} from '../store/slice';
import Formatter from '../utils/Formatter';
import {Button, Chip, Icon, Picker, PickerItem, Spacer, Text} from './shared';
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
      {/* ?????? ?????? ?????? */}

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

      <Picker
        visible={pickerId === 'issueState'}
        title="?????? ?????? ??????"
        value={issueState}
        items={[
          {label: 'All', value: 'all'},
          {label: 'Open', value: 'open'},
          {label: 'Closed', value: 'closed'},
        ]}
        onSelect={(value: string) =>
          onSelectIssueState(value as 'all' | 'open' | 'closed')
        }
        onRequestClose={() => setPickerId(null)}
      />

      {/* ????????? ?????? */}
      <Chip
        style={styles.chip}
        labelStyle={styles.chipLabel}
        label="Repository"
        color={repoChipColor}
        borderColor={repoChipColor}
        rightIcon="triangle-down"
        rightIconSize={16}
        rightIconColor="grey"
        onPress={() => setPickerId('repo')}
      />

      <ModalBase
        visible={pickerId === 'repo'}
        onRequestClose={() => setPickerId(null)}>
        <View style={styles.popupContainer}>
          <View style={styles.popupTitle}>
            <Text fontSize={15} fontWeight="900">
              ????????? ??????
            </Text>
          </View>
          {repositories.map(e => (
            <PickerItem
              key={`${e.id}`}
              label={e.full_name}
              selected={selectedRepos.includes(e.full_name)}
              onPress={() => onSelectRepo(e.full_name)}
            />
          ))}
          <View style={styles.popupFooter}>
            <Button
              label="??????"
              color={colors.primary}
              disabled={selectedRepos.length === 0}
              onPress={applyRepoFilter}
            />
          </View>
        </View>
      </ModalBase>

      {/* ?????? ?????? */}
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

      <Picker
        visible={pickerId === 'sort'}
        title="??????"
        value={sort}
        items={[
          {label: 'Newest', value: 'newest'},
          {label: 'Oldest', value: 'oldest'},
          {label: 'Recently Updated', value: 'updated'},
        ]}
        onSelect={(value: string) =>
          onSelectSort(value as 'newest' | 'oldest' | 'updated')
        }
        onRequestClose={() => setPickerId(null)}
      />
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
