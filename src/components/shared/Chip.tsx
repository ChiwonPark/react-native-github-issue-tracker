import * as React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {Icon, IconType, Text} from '.';

type ChipProps = {
  style?: ViewStyle;
  icon?: IconType;
  iconColor?: string;
  rightIcon?: IconType;
  rightIconColor?: string;
  rightIconSize?: number;
  label: string;
  labelStyle?: TextStyle;
  color?: string;
  small?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  active?: boolean;
  activeColor?: boolean;
  onPress?: () => void;
  onClose?: () => void;
};

const Chip = ({
  style: styleProp,
  icon,
  iconColor,
  rightIcon,
  rightIconColor,
  rightIconSize,
  label,
  labelStyle: labelStyleProp,
  color,
  backgroundColor = '#fff',
  borderColor = backgroundColor,
  onPress,
}: ChipProps) => {
  const style = {
    backgroundColor,
    borderColor,
  };
  return (
    <TouchableOpacity
      style={[styles.container, style, styleProp]}
      onPress={onPress}>
      {icon && <Icon style={styles.icon} name={icon} size={10} color={color} />}
      <Text style={labelStyleProp} color={color} fontSize={10}>
        {label}
      </Text>
      {rightIcon && (
        <Icon
          style={styles.icon}
          name={rightIcon}
          size={rightIconSize}
          color={rightIconColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(Chip);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 10,
    margin: 2,
  },
  icon: {
    marginRight: 2,
  },
  rightIcon: {
    marginLeft: 2,
  },
});
