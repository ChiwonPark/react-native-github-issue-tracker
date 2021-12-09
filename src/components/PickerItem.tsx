import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text} from './shared';

type PickerItemProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const PickerItem = ({label, selected, onPress}: PickerItemProps) => {
  return (
    <TouchableOpacity style={styles.checkItem} onPress={onPress}>
      <Text style={styles.checkItemLabel} fontSize={14} fontWeight="500">
        {label}
      </Text>
      {selected && <Icon name="check" size={16} color={'#339af0'} />}
    </TouchableOpacity>
  );
};

export default PickerItem;

const styles = StyleSheet.create({
  checkItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  checkItemLabel: {
    flex: 1,
    marginRight: 4,
  },
});
