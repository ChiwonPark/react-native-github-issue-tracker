import Toast, {ToastShowParams} from 'react-native-toast-message';

export default {
  show: (params: ToastShowParams | string) =>
    Toast.show(typeof params === 'string' ? {text1: params} : params),
  hide: Toast.hide,
  error: (params: Error | string) => {
    if (typeof params === 'string') {
      Toast.show({
        type: 'error',
        text1: params,
      });
    } else {
      Toast.show({
        type: 'error',
        text1:
          params?.message || '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  },
};
