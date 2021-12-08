import {configureStore} from '@reduxjs/toolkit';
import slice from './slice';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {filterMiddleware} from './filterMiddleware';

export const store = configureStore({
  reducer: slice.reducer,
  middleware: getDefaultMiddleware => {
    const reduxDebugger = __DEV__ && require('redux-flipper').default();
    return getDefaultMiddleware()
      .concat(filterMiddleware)
      .concat(reduxDebugger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
