import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface SearchBarProps {
  onSubmit: (keyword: string) => void;
}

const SearchBar = ({onSubmit}: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSearchPress = () => {
    onSubmit && onSubmit(keyword);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        onEndEditing={handleSearchPress}
      />
      <Button title="검색" onPress={handleSearchPress} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
  },
});
