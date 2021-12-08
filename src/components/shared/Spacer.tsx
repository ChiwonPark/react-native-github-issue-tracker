import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

type SpacerProps = {
  flex?: number | true;
  width?: number;
  height?: number;
};

const Spacer = ({flex, width, height}: SpacerProps) => {
  const style = {
    flex: flex === true ? 1 : flex,
    width,
    height,
  };
  return <View style={style} />;
};

export default React.memo(Spacer);
