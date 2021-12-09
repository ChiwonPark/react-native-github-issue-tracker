import {configureStore} from '@reduxjs/toolkit';
import slice from './slice';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {filterMiddleware} from './filterMiddleware';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
