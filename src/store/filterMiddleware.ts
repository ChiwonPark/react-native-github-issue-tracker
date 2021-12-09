import {Middleware} from 'redux';
import {addRepository, removeRepository, resetFilter} from './slice';

// 저장소 등록/삭제시 필터 초기화
export const filterMiddleware: Middleware<{}, any> =
  storeApi => next => action => {
    const result = next(action);

    if (
      action.type === addRepository.type ||
      action.type === removeRepository.type
    ) {
      storeApi.dispatch(resetFilter());
    }
    return result;
  };
