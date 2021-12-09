import * as React from 'react';
import {
  Modal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type ModalBaseProps = {
  //외부영역 터치 이벤트
  onOutsidePress?: () => void;
  //외부영역을 터치해서 모달을 닫을 수 있습니다. (default: true)
  closeOnOutsidePress?: boolean;
} & ModalProps;

const ModalBase = ({
  closeOnOutsidePress = true,
  onOutsidePress,
  ...props
}: ModalBaseProps) => {
  //외부영역 터치 핸들러
  const handleOutsidePress = () => {
    if (closeOnOutsidePress) {
      props.onRequestClose && props.onRequestClose();
    }
    onOutsidePress && onOutsidePress();
  };

  return (
    <Modal transparent={true} animationType={'fade'} {...props}>
      {/* 외부 영역 */}
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.overlay}>
          {/*
           내부 컨텐츠 컨테이너.
           내부 터치시 handleOutsidePress가 발생하지 않도록
          touchable로 감싸줍니다. 
           */}
          <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalBase;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {},
});
