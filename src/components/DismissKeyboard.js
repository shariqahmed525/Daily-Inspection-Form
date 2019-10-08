import React from 'react'
import { TouchableNativeFeedback, Keyboard } from 'react-native'

export default DismissKeyboard = ({ children }) => {
  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableNativeFeedback>
  )
}


