import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ModalProps} from 'react-native';
import PickerItem from './PickerItem';
import {Text} from './shared';
import ModalBase from './shared/ModalBase';

type PickerItem = {
  label: string;
  value: string;
};

type PickerProps = {
  title?: string;
  items: PickerItem[];
  value?: string;
  onSelect?: (value: string) => void;
} & ModalProps;

const Picker = ({title, items, value, onSelect, ...props}: PickerProps) => {
  const handleSelectItem = (value: string) => {
    onSelect && onSelect(value);
    props.onRequestClose && props.onRequestClose();
  };

  return (
    <ModalBase {...props}>
      <View style={styles.popupContainer}>
        {!!title && (
          <View style={styles.popupTitle}>
            <Text fontSize={15} fontWeight="900">
              {title}
            </Text>
          </View>
        )}
        {items.map(e => (
          <PickerItem
            key={e.value}
            label={e.label}
            selected={value === e.value}
            onPress={() => handleSelectItem(e.value)}
          />
        ))}
      </View>
    </ModalBase>
  );
};

export default Picker;

const styles = StyleSheet.create({
  popupContainer: {
    width: 300,
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  popupTitle: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  popupFooter: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
