import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import DatePicker from "react-native-modal-datetime-picker";

import Button from '../../components/Button';
import {
  CLEANING_TYPES,
  INSPECTION_TYPES,
  DEFECT_FOUND_DURING_INSPECTIONS,
  OPERATIONS_AFFECTED,
  CATEGORIES
} from '../../constants/constant';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';
import { GreenColor, RedColor, GreyColor } from '../../constants/colors';
import RadioButtons from '../../components/RadioButtons';

const FieldsHeading = props => (
  <View style={styles.fieldHeadingWrapper}>
    <Text style={styles.fieldHeadingText}>{props.text}</Text>
  </View>
)

export default NewForm = props => {

  const [isLoading, setIsLoading] = useState(false)

  /* First Section */
  const [inspectorName, setInspectorName] = useState("");
  const [checkedInspection, setCheckedInspection] = useState([]);
  const [inspectorNameError, setInspectorNameError] = useState("");
  const [checkedInspectionOther, setCheckedInspectionOther] = useState("");
  const [checkedInspectionError, setCheckedInspectionError] = useState("");
  const [checkedInspectionOtherError, setCheckedInspectionOtherError] = useState("");
  const [siteInspected, setSiteInspected] = useState("");
  const [siteInspectedError, setSiteInspectedError] = useState("");
  const [unit, setUnit] = useState("");
  const [unitError, setUnitError] = useState("");

  /* Second Section */
  const [descOfLocationInspected, setDescOfLocationInspected] = useState("");
  const [descOfLocationInspectedError, setDescOfLocationInspectedError] = useState("");
  const [cleanType, setCleanType] = useState("");
  const [cleanTypeError, setCleanTypeError] = useState("");

  /* Third Section */
  const [comments, setComments] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");

  /* Fourth Section */
  const [defectFound, setDefectFound] = useState("");
  const [defectFoundError, setDefectFoundError] = useState("");
  const [operationsAffected, setOperationsAffected] = useState("");
  const [operationsAffectedError, setOperationsAffectedError] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [otherCategoryError, setOtherCategoryError] = useState("");
  const [defectDescription, setDefectDescription] = useState("");
  const [defectDescriptionError, setDefectDescriptionError] = useState("");

  /* Fifth section */
  const [reference, setReference] = useState("");
  const [referenceError, setReferenceError] = useState("");
  const [datePickerModal, setDatePickerModal] = useState(false);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    setIsLoading(true)
  }, [])

  /* Handlers */

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

  const handleCleaningTypes = selectedOption => {
    setCleanTypeError("");
    setCleanType(selectedOption);
  }

  const handleImagePicker = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const conditionalOptions =
      selectedPhoto ? {
        ...options,
        customButtons: [{ name: 'remove photo', title: 'Remove Photo' }],
      } : { ...options }

    ImagePicker.showImagePicker(conditionalOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        setPhotoError(response.error)
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setPhotoError("");
        setPhoto(null);
        setSelectedPhoto("");
      } else {
        const source = response.uri;
        setPhotoError("");
        setPhoto(response);
        setSelectedPhoto(source);
      }
    });
  }

  const handleDefectFound = selectedOption => {
    setDefectFoundError("");
    setDefectFound(selectedOption);
  }

  const handleOperationsAffected = selectedOption => {
    setOperationsAffectedError("");
    setOperationsAffected(selectedOption);
  }

  const handleCategory = selectedOption => {
    setOtherCategory("");
    setCategoryError("");
    setOtherCategoryError("");
    setCategory(selectedOption);
  }

  const handleDatePicker = date => {
    setDateError("");
    setDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getYear()}`)
  }

  const validateForm = () => {
    if (!siteInspected) {
      setSiteInspectedError("Please enter site inspected");
    }
    if (!unit) {
      setUnitError("Please enter unit");
    }
    if (!inspectorName) {
      setInspectorNameError("Please enter inspector name");
    }
    if (checkedInspection.length < 1) {
      setCheckedInspectionError("Please select atleast one type from given inspection types")
    }
    if (checkedInspection.includes("Other") && checkedInspectionOther == "") {
      setCheckedInspectionOtherError("Please enter inspection whatever you want");
    }
    if (!descOfLocationInspected) {
      setDescOfLocationInspectedError("Please enter description of location inspected");
    }
    if (!cleanType) {
      setCleanTypeError("Please select anyone option from given cleaning types")
    }
    if (!selectedPhoto) {
      setPhotoError("Please capture or select photo");
    }
    if (!defectFound) {
      setDefectFoundError("Please select anyone option from given defect found during inspections")
    }
    if (!operationsAffected) {
      setOperationsAffectedError("Please select anyone option from given operations affected")
    }
    if (!category) {
      setCategoryError("Please select anyone option from given categories");
    }
    if (category === "Other" && otherCategory === "") {
      setOtherCategoryError("Please enter category name");
    }
    if (!defectDescription) {
      setDefectDescriptionError("Please enter description of defect")
    }
    if (!date) {
      setDateError("Please select date")
    }
    if (!reference) {
      setReferenceError("Please enter reference")
    }
    else {
      alert("OK");
    }
  }

  /* Renders */

  const _renderFirstSectionFields = () => {
    return (
      <>
        <InputField
          value={siteInspected}
          label='Site Inspected *'
          error={siteInspectedError}
          onChangeText={(e) => {
            setSiteInspected(e)
            setSiteInspectedError("")
          }}
        />

        <InputField
          value={unit}
          label='Unit *'
          error={unitError}
          onChangeText={(e) => {
            setUnit(e)
            setUnitError("")
          }}
        />

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
          items={INSPECTION_TYPES}
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
      </>
    )
  }

  const _renderSecondSectionFields = () => {
    return (
      <>
        <FieldsHeading text="Brief Description of Location Inspected" />
        <InputField
          multiline
          value={descOfLocationInspected}
          error={descOfLocationInspectedError}
          onChangeText={(e) => {
            setDescOfLocationInspected(e)
            setDescOfLocationInspectedError("")
          }}
          label='Description of Location Inspected *'
        />
        <RadioButtons
          items={CLEANING_TYPES}
          handleRadioOptions={handleCleaningTypes}
          selectedOption={cleanType}
        />
        {cleanTypeError !== "" && (
          <Text style={styles.error}>
            {cleanTypeError}
          </Text>
        )}
      </>
    )
  }

  const _renderThirdSectionFields = () => {
    return (
      <>
        <FieldsHeading text="General Observations &amp; Comments" />
        <InputField
          multiline
          value={comments}
          label='Comments'
          onChangeText={(e) => setComments(e)}
        />
        {selectedPhoto !== "" ? (
          <TouchableOpacity
            activeOpacity={.8}
            onPress={handleImagePicker}
            style={styles.selectedPhotoWrapper}
          >
            <Image
              style={styles.selectedPhoto}
              source={{ uri: selectedPhoto }}
            />
          </TouchableOpacity>
        ) :
          (
            <>
              <TouchableOpacity
                activeOpacity={.8}
                onPress={handleImagePicker}
                style={styles.imagePickerWrapper}
              >
                <View style={styles.imageWrapper}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/form/photo-camera.png')}
                  />
                </View>
                <Text style={styles.imagePickerText}>Upload Photo</Text>
              </TouchableOpacity>
              {photoError !== "" && (
                <Text style={styles.error}>
                  {photoError}
                </Text>
              )}
            </>
          )}
      </>
    )
  }

  const _renderFourthSectionFields = () => {
    return (
      <>
        <FieldsHeading text="Defect Record" />
        <Text style={styles.marginLable}>
          Defect found during inspection? *
        </Text>
        <RadioButtons
          items={DEFECT_FOUND_DURING_INSPECTIONS}
          handleRadioOptions={handleDefectFound}
          selectedOption={defectFound}
        />
        {defectFoundError !== "" && (
          <Text style={styles.error}>
            {defectFoundError}
          </Text>
        )}

        <Text style={styles.marginLable}>
          Operations Affected *
        </Text>
        <RadioButtons
          items={OPERATIONS_AFFECTED}
          handleRadioOptions={handleOperationsAffected}
          selectedOption={operationsAffected}
        />
        {operationsAffectedError !== "" && (
          <Text style={styles.error}>
            {operationsAffectedError}
          </Text>
        )}

        <Text style={styles.marginLable}>
          Defect Category *
        </Text>
        <RadioButtons
          items={CATEGORIES}
          handleRadioOptions={handleCategory}
          selectedOption={category}
        />
        {categoryError !== "" && (
          <Text style={styles.error}>
            {categoryError}
          </Text>
        )}

        {category === "Other" && (
          <InputField
            value={otherCategory}
            label='Enter category name *'
            error={otherCategoryError}
            onChangeText={(e) => {
              setOtherCategory(e);
              setCategoryError("");
              setOtherCategoryError("");
            }}
          />
        )}

        <InputField
          multiline
          value={defectDescription}
          label='Defect Description *'
          error={defectDescriptionError}
          onChangeText={(e) => {
            setDefectDescription(e);
            setDefectDescriptionError("");
          }}
        />
      </>
    )
  }

  const _renderFifthSectionFields = () => {
    return (
      <>
        <Text style={styles.marginLable}>
          Seperate Defect Notification From Created
        </Text>
        <TouchableOpacity
          activeOpacity={.5}
          style={styles.datePickerButton}
          onPress={() => setDatePickerModal(true)}
        >
          <Text style={styles.datePickerButtonText}>Select Date</Text>
        </TouchableOpacity>
        {date !== "" && <Text style={styles.date}>{date}</Text>}
        {dateError !== "" && <Text style={styles.error}>{dateError}</Text>}

        <DatePicker
          isVisible={datePickerModal}
          onConfirm={(date) => handleDatePicker(date)}
          onCancel={() => setDatePickerModal(false)}
        />

        <InputField
          value={reference}
          label='Reference *'
          error={referenceError}
          onChangeText={(e) => {
            setReference(e);
            setReferenceError("");
          }}
        />
      </>
    )
  }

  const _renderBottomButton = () => {
    return (
      <View style={styles.bottomButtonWrapper}>
        <Button
          text="Add Details"
          onPress={validateForm}
        />
      </View>
    )
  }

  return (
    isLoading ? (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <View>
            {_renderFirstSectionFields()}
            {_renderSecondSectionFields()}
            {_renderThirdSectionFields()}
            {_renderFourthSectionFields()}
            {_renderFifthSectionFields()}
            {_renderBottomButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
      :
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={GreenColor} />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: '2%',
    paddingBottom: '6%',
    paddingHorizontal: '6%',
    backgroundColor: GreyColor,
  },
  lable: {
    marginVertical: 10,
    fontSize: 16,
    color: GreenColor,
  },
  marginLable: {
    fontSize: 16,
    color: GreenColor,
    marginTop: 20,
    marginBottom: 5
  },
  error: {
    marginVertical: 10,
    fontSize: 13,
    color: RedColor,
  },
  fieldHeadingWrapper: {
    marginTop: 15,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: GreenColor,
  },
  fieldHeadingText: {
    fontSize: 16,
    color: GreenColor,
  },
  imagePickerWrapper: {
    flex: 1,
    borderWidth: 1,
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 25,
    justifyContent: 'center',
    borderColor: GreenColor,
  },
  imageWrapper: {
    padding: 20,
    borderRadius: 100,
    backgroundColor: GreenColor,
  },
  image: {
    width: 30,
    height: 30,
  },
  imagePickerText: {
    marginTop: 8,
    color: '#000',
  },
  bottomButtonWrapper: {
    marginTop: 20
  },
  keyboardAvoidingView: {
    flex: 1
  },
  selectedPhotoWrapper: {
    marginVertical: 10,
  },
  selectedPhoto: {
    width: 120,
    height: 120,
  },
  datePickerButton: {
    marginTop: 15,
  },
  datePickerButtonText: {
    fontSize: 17,
    color: GreenColor,
    marginBottom: 10,
  },
  date: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GreyColor,
  },
})
