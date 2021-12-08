import {Middleware} from 'redux';

import {addRepository, removeRepository, setFilter} from './slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

//저장소를 등록, 삭제할 경우 저장소 filter를 초기화
export const filterMiddleware: Middleware<{}, any> =
  storeApi => next => action => {
    const result = next(action);
    const state = storeApi.getState();
    if (
      action.type === addRepository.type ||
      action.type === removeRepository.type
    ) {
      storeApi.dispatch(
        setFilter({repoNames: state.repositories.map((e: any) => e.full_name)}),
      );
    }
    return result;
  };
