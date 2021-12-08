import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type DotProps = {
  style?: StyleProp<ViewStyle>;
  color: string;
  size: number;
};

const Dot = ({style: styleProp, color = '#000', size = 12}: DotProps) => {
  const style: StyleProp<ViewStyle> = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  };

  return <View style={[style, styleProp]} />;
};

export default Dot;
