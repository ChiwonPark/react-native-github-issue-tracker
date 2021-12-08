import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, IconType, Text} from '.';

type ChipProps = {
  icon?: IconType;
  iconColor?: string;
  label: string;
  color?: string;
  small?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
};

const Chip = ({
  icon,
  iconColor,
  label,
  color,
  backgroundColor = '#fff',
  borderColor = backgroundColor,
}: ChipProps) => {
  const style = {
    backgroundColor,
    borderColor,
  };
  return (
    <View style={[styles.container, style]}>
      {icon && <Icon style={styles.icon} name={icon} size={10} color={color} />}
      <Text color={color} fontSize={10}>
        {label}
      </Text>
    </View>
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
});
