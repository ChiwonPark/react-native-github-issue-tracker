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
  onPress?: () => void;
} & Omit<TouchableOpacityProps, 'children'>;

const Button = ({
  style: styleProp,
  labelStyle: labelStyleProp,
  label,
  icon,
  onPress = () => {},
}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.buttonBase, styleProp]} onPress={onPress}>
      {!!icon && (
        <Icon style={styles.icon} name={icon} size={16} color="white" />
      )}
      {!!label && (
        <Text style={[styles.labelBase, labelStyleProp]}>{label}</Text>
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
