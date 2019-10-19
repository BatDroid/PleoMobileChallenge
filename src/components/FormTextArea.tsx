import React from 'react';
import {
  Dimensions,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

const {height} = Dimensions.get('window');

interface Props extends TextInputProps {
  title: string;
}

export default (props: Props) => {
  const {title, ...inputProps} = props;
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        multiline
        textAlignVertical="top"
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: height * 0.015,
  },
  title: {
    marginBottom: 10,
    color: 'black',
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#CCC',
    color: 'black',
    paddingLeft: 10,
    paddingBottom: 5,
    minHeight: 80,
    marginBottom: height * 0.06,
  },
});
