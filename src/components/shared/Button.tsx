import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {Icon, IconType} from '.';
import colors from '../../lib/colors';

type ButtonProps = {
  primary?: boolean;
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
  primary,
  style: styleProp,
  labelStyle: labelStyleProp,
  label,
  icon,
  disabled,
  color = 'gery',
  onPress = () => {},
}: ButtonProps) => {
  const buttonStyle: ViewStyle = {
    backgroundColor: disabled ? '#ddd' : primary ? colors.primary : color,
  };

  const labelStyle: TextStyle = {
    color: disabled ? '#999' : '#fff',
  };

  return (
    <TouchableOpacity
      style={[styles.buttonBase, buttonStyle, styleProp]}
      disabled={disabled}
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
