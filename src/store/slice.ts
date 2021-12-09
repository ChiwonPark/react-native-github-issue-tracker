import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterType, Repository} from '../api/types';
import Toast from 'react-native-toast-message';
import {AppThunk} from '.';

type RootState = {
  repositories: Repository[];
  filter: FilterType;
};

const initialState: RootState = {
  repositories: [],
  filter: {
    issueState: 'all',
    repoNames: [],
    sort: 'created',
    order: 'desc',
  },
};

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setFilter: (state, {payload}: PayloadAction<FilterType>) => {
      state.filter = {...state.filter, ...payload};
    },
    addRepository: (state, {payload}: PayloadAction<Repository>) => {
      state.repositories.push(payload);
    },
    removeRepository: (state, {payload: repoId}: PayloadAction<number>) => {
      state.repositories = state.repositories.filter(e => e.id !== repoId);
    },
  },
});

export const toggleRepository =
  (repo: Repository): AppThunk =>
  async (dispatch, getState) => {
    const {repositories} = getState();
    if (repositories.find(e => e.id === repo.id)) {
      dispatch(removeRepository(repo.id));
      Toast.show({
        text1: '삭제되었습니다.',
        position: 'bottom',
      });
    } else if (repositories.length >= 4) {
      Toast.show({
        text1: '최대 4개까지만 등록할 수 있습니다.',
        position: 'bottom',
        type: 'error',
      });
    } else {
      dispatch(addRepository(repo));
      Toast.show({
        text1: '저장소가 등록되었습니다.',
        position: 'bottom',
      });
    }
  };

export const {setFilter, addRepository, removeRepository} = slice.actions;

export default slice;
