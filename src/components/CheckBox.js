import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default CheckBox = props => {
  const { items, handleCheckBox, checkedItems } = props
  return (
    items && items.map((v, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => handleCheckBox(v)}
        style={styles.checkBoxWrapper}
      >
        <Image
          style={styles.checkBoxImage}
          source={
            checkedItems.includes(v) ?
              require('../assets/login/check-square.png') :
              require('../assets/login/unchecked.png')
          }
        />
        <Text style={styles.checkBoxText}>{v}</Text>
      </TouchableOpacity>
    ))
  )
}

const styles = StyleSheet.create({
  checkBoxWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    marginRight: 15,
  },
  checkBoxImage: {
    width: 20,
    height: 20,
  },
  checkBoxText: {
    fontSize: 15,
    marginLeft: 10,
  }
})
