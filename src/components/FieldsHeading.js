import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GreenColor, WhiteColor } from '../constants/colors'

export default FieldsHeading = props => (
  <View style={styles.fieldHeadingWrapper}>
    <Text style={styles.fieldHeadingText}>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  fieldHeadingWrapper: {
    marginTop: 15,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: GreenColor,
    backgroundColor: GreenColor,
  },
  fieldHeadingText: {
    fontSize: 16,
    color: WhiteColor,
  },
})
