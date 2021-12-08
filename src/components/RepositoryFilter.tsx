import React, {useState} from 'react';
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
import {Button, CheckBox, Spacer} from './shared';

type RepositoryFilterProps = {} & ModalProps;

const RepositoryFilter = ({onRequestClose, ...rest}: RepositoryFilterProps) => {
  const dispatch = useDispatch();
  const {repositories, filter} = useSelector((state: RootState) => state);
  const [checkedList, setCheckedList] = useState<string[]>(
    filter.repoNames && filter.repoNames.length > 0
      ? filter.repoNames
      : repositories.map(e => e.full_name),
  );

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
              {repositories.map(repo => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 2,
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    value={checkedList.includes(repo.full_name)}
                    onChange={value => {
                      if (value) {
                        setCheckedList(prev => [...prev, repo.full_name]);
                      } else {
                        setCheckedList(prev =>
                          prev.filter(e => repo.full_name !== e),
                        );
                      }
                    }}
                  />
                  <Spacer width={8} />
                  <Text>{repo.full_name}</Text>
                </View>
              ))}
              <Spacer height={12} />
              <Button
                label="적용하기"
                onPress={() => {
                  if (checkedList.length === 0) {
                    Alert.alert('', '최소 1개 이상은 선택되어야 합니다.');
                    return;
                  }
                  dispatch(setFilter({repoNames: checkedList}));
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default RepositoryFilter;

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
