import * as React from 'react';
import {ImageStyle, StyleProp, StyleSheet, View} from 'react-native';
import VectorImage from 'react-native-vector-image';
import svg from './svg';

export type IconType = keyof typeof svg;
export type IconProps = {
  name: IconType;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
};

const Icon = ({name, color, size, style}: IconProps) => {
  const _style = StyleSheet.compose(
    {
      tintColor: color,
      width: size,
      height: size,
    },
    style,
  );
  return <VectorImage style={_style} source={svg[name]} />;
};

export default React.memo(Icon);
