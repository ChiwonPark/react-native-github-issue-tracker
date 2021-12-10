import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '.';
import {FilterType, Repository} from '../api/types';
import Toast from '../utils/Toast';

type RootState = {
  repositories: Repository[];
  filter: FilterType;
};

const initialState: RootState = {
  repositories: [],
  filter: {
    issueState: 'open',
    repos: [],
    sort: 'newest',
  },
};

const slice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setFilter: (state, {payload}: PayloadAction<Partial<FilterType>>) => {
      state.filter = {...state.filter, ...payload};
    },
    resetFilter: state => {
      state.filter = {
        issueState: 'open',
        repos: state.repositories.map(e => e.full_name),
        sort: 'newest',
      };
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
      Toast.show('삭제되었습니다.');
    } else if (repositories.length >= 4) {
      Toast.show('최대 4개까지만 등록할 수 있습니다.');
    } else {
      dispatch(addRepository(repo));
      Toast.show('저장소가 등록되었습니다.');
    }
  };

export const {setFilter, resetFilter, addRepository, removeRepository} =
  slice.actions;

export default slice;
