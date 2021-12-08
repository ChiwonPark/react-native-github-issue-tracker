import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ModalProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setFilter} from '../store/slice';
import {Button} from './shared';

type IssueStateFilterProps = {} & ModalProps;

const IssueStateFilter = ({onRequestClose, ...rest}: IssueStateFilterProps) => {
  const dispatch = useDispatch();

  const handleSelect = (value?: 'open' | 'closed') => {
    dispatch(
      setFilter({
        issueState: value,
      }),
    );
    onRequestClose && onRequestClose();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
      {...rest}>
      <SafeAreaView style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.outsideArea}
          onPress={() => {
            onRequestClose && onRequestClose();
          }}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Button label="All" onPress={() => handleSelect(undefined)} />
              <Button label="open" onPress={() => handleSelect('open')} />
              <Button label="closed" onPress={() => handleSelect('closed')} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default IssueStateFilter;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  outsideArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 34,
  },
});
