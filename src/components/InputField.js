import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { GreenColor } from '../constants/colors';

export default InputField = props => {
  return (
    <TextField
      {...props}
      labelHeight={15}
      textColor="#000"
      value={props.value}
      label={props.label}
      error={props.error}
      tintColor={GreenColor}
      onChangeText={props.onChangeText}
      containerStyle={styles.inputContainer}
    />
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
  },
})
