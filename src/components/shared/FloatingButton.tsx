import * as React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Icon, IconType} from '.';

type FloatingButtonProps = {
  style?: ViewStyle;
  icon?: IconType;
  opacity?: number;
  backgroundColor?: string;
  zIndex?: number;
  onPress?: () => void;
};

const FloatingButton = ({
  style: styleProp,
  icon,
  opacity,
  backgroundColor,
  zIndex = 100,
  onPress,
}: FloatingButtonProps) => {
  const style = {
    backgroundColor,
    opacity,
    zIndex,
  };
  return (
    <TouchableOpacity
      style={[styles.container, style, styleProp]}
      onPress={onPress}>
      {icon && <Icon name={icon} size={16} color="white" />}
    </TouchableOpacity>
  );
};

export default React.memo(FloatingButton);

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
