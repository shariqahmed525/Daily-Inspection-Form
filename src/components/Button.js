import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { GreenColor } from '../constants/colors'

export default Button = props => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={.8}
      onPress={props.onPress}
      style={{
        ...styles.button,
        opacity: props.disabled ? .8 : 1,
      }}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginTop: 7,
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: GreenColor,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    zIndex: 10
  },
})

