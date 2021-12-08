import React, {useMemo} from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

type TextProps = Pick<
  TextStyle,
  'color' | 'fontSize' | 'fontWeight' | 'lineHeight'
> &
  RNTextProps;

const Text = ({
  children,
  style: styleProp,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  ...rest
}: TextProps) => {
  const textStyle = {
    color: color || '#000',
    fontSize,
    fontWeight,
    lineHeight,
  };

  return (
    <RNText style={[styles.textBase, textStyle, styleProp]} {...rest}>
      {children}
    </RNText>
  );
};

export default React.memo(Text);

const styles = StyleSheet.create({
  textBase: {
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
