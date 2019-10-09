import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default RadioButtons = props => {
  const { items, handleRadioOptions, selectedOption } = props
  return (
    items && items.map((v, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => handleRadioOptions(v)}
        style={styles.radioButtonsWrapper}
      >
        <Image
          style={styles.radioButtonImage}
          source={
            selectedOption === v ?
              require('../assets/form/radio-filled.png') :
              require('../assets/form/radio-unfilled.png')
          }
        />
        <Text style={styles.radioButtonText}>{v}</Text>
      </TouchableOpacity>
    ))
  )
}

const styles = StyleSheet.create({
  radioButtonsWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    marginRight: 15,
  },
  radioButtonImage: {
    width: 20,
    height: 20,
  },
  radioButtonText: {
    fontSize: 15,
    marginLeft: 10,
  }
})
