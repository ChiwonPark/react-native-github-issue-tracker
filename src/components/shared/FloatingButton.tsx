import * as React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Icon, IconType} from '.';

type FloatingButtonProps = {
  style?: ViewStyle;
  icon?: IconType;
  opacity?: number;
  backgroundColor?: string;
  onPress?: () => void;
};

const FloatingButton = ({
  style: styleProp,
  icon,
  opacity,
  backgroundColor,
  onPress,
}: FloatingButtonProps) => {
  const style = {
    backgroundColor,
    opacity,
  };
  return (
    <TouchableOpacity
      style={[styles.container, style, styleProp]}
      onPress={onPress}>
      {icon && <Icon name={icon} size={16} color="white" />}
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});
