import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, TextInput} from './shared';

type SearchBarProps = {
  onSearch: (keyword: string) => void;
};

const SearchBar = ({onSearch}: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <Icon name="search" size={16} />
      <TextInput
        style={styles.input}
        value={keyword}
        autoFocus
        placeholder={'저장소 이름을 입력하세요.'}
        onChangeText={setKeyword}
        onEndEditing={() => onSearch(keyword)}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    paddingHorizontal: 8,
    margin: 8,
  },
  input: {
    flex: 1,
    marginLeft: 4,
  },
});
