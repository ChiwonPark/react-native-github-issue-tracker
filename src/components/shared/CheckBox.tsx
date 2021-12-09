import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from '.';

type CheckBoxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const CheckBox = ({value, onChange}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, value && styles.activeBorder]}
      onPress={() => onChange(!value)}>
      {value && <Icon name="check" color="green" size={12} />}
    </TouchableOpacity>
  );
};

export default React.memo(CheckBox);

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderWidth: 1,
  },
  activeBorder: {
    borderColor: 'green',
  },
});
