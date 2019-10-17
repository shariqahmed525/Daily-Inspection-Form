import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default Box = props => (
  <TouchableOpacity
    activeOpacity={.8}
    style={props.style}
    onPress={props.onPress}
  >
    <Image
      style={props.imageStyle}
      source={props.image}
    />
    <Text style={styles.text}>{props.text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
})
