import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {ThunkAction} from 'redux-thunk';
import {filterMiddleware} from './filterMiddleware';
import slice, {setFilter} from './slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['repositories'],
};

const persistedReducer = persistReducer(persistConfig, slice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const reduxDebugger = __DEV__ && require('redux-flipper').default();
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(filterMiddleware)
      .concat(reduxDebugger);
  },
});

export const persistor = persistStore(store, {}, () => {
  //repository filter 값을 등록한 저장소 목록으로 세팅해줌.
  const state = store.getState();
  store.dispatch(
    setFilter({
      repos: state.repositories.map(e => e.full_name),
    }),
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
