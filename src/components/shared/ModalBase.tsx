import * as React from 'react';
import {
  StyleSheet,
  ModalProps,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type ModalBaseProps = ModalProps;

const ModalBase = (props: ModalBaseProps) => {
  return (
    <Modal transparent={true} animationType={'fade'} {...props}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>{props.children}</View>
          </TouchableWithoutFeedback>
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
