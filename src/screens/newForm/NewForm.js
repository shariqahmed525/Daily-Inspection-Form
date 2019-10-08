import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native'
import _ from 'lodash';

import Button from '../../components/Button';
import { InspectionTypesItems } from '../../constants/constant';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import { GreenColor, RedColor } from '../../constants/colors';


export default NewForm = props => {

  const [inspectorName, setInspectorName] = useState("");
  const [checkedInspection, setCheckedInspection] = useState([]);
  const [inspectorNameError, setInspectorNameError] = useState("");
  const [checkedInspectionOther, setCheckedInspectionOther] = useState("");
  const [checkedInspectionError, setCheckedInspectionError] = useState("");
  const [checkedInspectionOtherError, setCheckedInspectionOtherError] = useState("");

  const validateForm = () => {
    if (!inspectorName) {
      setInspectorNameError("Please enter inspector name");
    }
    if (checkedInspection.length < 1) {
      setCheckedInspectionError("Please select anyone option of given inspection types")
    }
    else {
      if (checkedInspection.includes("Other") && checkedInspectionOther == "") {
        setCheckedInspectionOtherError("Please enter inspection whatever you want");
      }
    }
  }

  const handleCheckBox = checkedItem => {
    let find = checkedInspection.includes(checkedItem);
    let findIndex = _.findIndex(checkedInspection, o => o === checkedItem);
    if (find) {
      checkedInspection.splice(findIndex, 1);
      setCheckedInspectionError("");
      setCheckedInspection([...checkedInspection]);
    }
    else {
      setCheckedInspectionError("")
      setCheckedInspection([...checkedInspection, checkedItem]);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View>
          <InputField
            value={inspectorName}
            label='Inspector Name *'
            error={inspectorNameError}
            onChangeText={(e) => {
              setInspectorName(e)
              setInspectorNameError("")
            }}
          />

          <Text style={styles.lable}>Inspection Types *</Text>
          <CheckBox
            items={InspectionTypesItems}
            handleCheckBox={handleCheckBox}
            checkedItems={checkedInspection}
          />

          {checkedInspectionError !== "" && (
            <Text style={styles.error}>
              {checkedInspectionError}
            </Text>
          )}

          {checkedInspection.includes("Other") && (
            <InputField
              value={checkedInspectionOther}
              label='Other'
              error={checkedInspectionOtherError}
              onChangeText={(e) => {
                setCheckedInspectionOther(e)
                setCheckedInspectionOtherError("")
              }}
            />
          )}

          <View style={{ marginTop: 20 }}>
            <Button
              text="Add Details"
              onPress={validateForm}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: '6%',
    backgroundColor: "#f5f5f5",
  },
  lable: {
    marginVertical: 10,
    fontSize: 16,
    color: GreenColor,
  },
  error: {
    marginVertical: 10,
    fontSize: 13,
    color: RedColor,
  }
})
