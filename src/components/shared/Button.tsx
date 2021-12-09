import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  Button as RNButton,
  ViewStyle,
  TouchableOpacityProps,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {Icon, IconType} from '.';

type ButtonProps = {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  icon?: IconType;
  large?: boolean;
  block?: boolean;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
} & Omit<TouchableOpacityProps, 'children'>;

const Button = ({
  style: styleProp,
  labelStyle: labelStyleProp,
  label,
  icon,
  disabled,
  color = 'gery',
  onPress = () => {},
}: ButtonProps) => {
  const buttonStyle: ViewStyle = {
    backgroundColor: disabled ? '#ddd' : color,
  };

  const labelStyle: TextStyle = {
    color: disabled ? '#999' : '#fff',
  };

  return (
    <TouchableOpacity
      style={[styles.buttonBase, buttonStyle, styleProp]}
      onPress={onPress}>
      {!!icon && (
        <Icon style={styles.icon} name={icon} size={16} color="white" />
      )}
      {!!label && (
        <Text style={[styles.labelBase, labelStyle, labelStyleProp]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  labelBase: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 4,
  },
});
