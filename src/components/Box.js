import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native'

export default Box = props => (
  <TouchableNativeFeedback
    onPress={props.onPress}
    background={TouchableNativeFeedback.SelectableBackground()}
  >
    <View style={props.style}>
      <Image
        style={props.imageStyle}
        source={props.image}
      />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
})
