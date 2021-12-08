import React, {useMemo} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '.';

type TextInputProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & Pick<TextStyle, 'color' | 'fontSize' | 'fontWeight'> &
  RNTextInputProps;

const TextInput = ({
  style: styleProp,
  textStyle: textStyleProp,
  color,
  fontSize,
  fontWeight,
  placeholderTextColor = '#BBB',
  ...rest
}: TextInputProps) => {
  const visibleClear = useMemo(() => {
    return !!rest.value;
  }, [rest.value]);

  const textStyle = {
    color: color || '#000',
    fontSize,
  };

  const onClear = () => {
    rest.onChangeText && rest.onChangeText('');
  };

  return (
    <View style={[styles.textInputBase, styleProp]}>
      <RNTextInput
        style={[styles.textBase, textStyle, textStyleProp]}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />

      <TouchableOpacity
        style={!visibleClear && styles.hidden}
        hitSlop={{top: 12, left: 12, right: 12, bottom: 12}}
        onPress={onClear}>
        <Icon name="x-circle-fill" size={14} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TextInput);

const styles = StyleSheet.create({
  textInputBase: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBase: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  hidden: {
    display: 'none',
  },
});
