import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { GreenColor } from '../constants/colors';

export default InputField = props => {
  return (
    <TextField
      textColor="#000"
      tintColor={GreenColor}
      value={props.value}
      label={props.label}
      error={props.error}
      onChangeText={props.onChangeText}
      containerStyle={styles.inputContainer}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
})
