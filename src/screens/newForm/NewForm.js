import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'
import { useNavigation } from 'react-navigation-hooks';
import _ from 'lodash';
import uuid from 'uuid';
import moment from 'moment';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import DatePicker from "react-native-modal-datetime-picker";

import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import InputField from '../../components/InputField';
import RadioButtons from '../../components/RadioButtons';
import FieldsHeading from '../../components/FieldsHeading';

import {
  FIRESTORE,
  CATEGORIES,
  CLEANING_TYPES,
  FIREBASE_STORAGE,
  INSPECTION_TYPES,
  OPERATIONS_AFFECTED,
  DEFECT_FOUND_DURING_INSPECTIONS,
} from '../../constants/constant';
import {
  RedColor,
  GreyColor,
  GreenColor,
  OfficialColor,
  BlackColor,
  WhiteColor,
} from '../../constants/colors';
import store from '../../redux/store/store';

export default NewForm = () => {
  const { navigate } = useNavigation();

  let scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [uid, setUid] = useState("")

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
    setIsLoading(true);
    const { authReducers } = store.getState();
    setUid(authReducers.uid);
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
      let fileSize = Math.round(response.fileSize / 1024 / 1024);
      if (response.didCancel) {
      } else if (response.error) {
        setPhotoError(response.error)
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setPhotoError("");
        setSelectedPhoto("");
      } else {
        if (fileSize <= 40) {
          const source = response.uri;
          setPhotoError("");
          setSelectedPhoto(source);
        }
        else {
          setPhotoError("Photo size should be less than 40 mb");
        }
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
    let makeDate = `${moment(date).format('D')} ${moment(date).format('MMMM')} ${moment(date).format('Y')}`;
    setDate(makeDate);
  }

  const scrollUp = y => scrollRef.scrollTo({ x: 0, y: y, animated: true })

  const validateForm = () => {
    if (!siteInspected) {
      setSiteInspectedError("Please enter site inspected");
      scrollUp(0);
      return;
    }
    if (!unit) {
      setUnitError("Please enter unit");
      scrollUp(0);
      return;
    }
    if (!inspectorName) {
      setInspectorNameError("Please enter inspector name");
      scrollUp(0);
      return;
    }
    if (checkedInspection.length < 1) {
      setCheckedInspectionError("Please select atleast one type from given inspection types")
      scrollUp(170);
      return;
    }
    if (checkedInspection.includes("Other") && checkedInspectionOther == "") {
      setCheckedInspectionOtherError("Please enter inspection whatever you want");
      scrollUp(170);
      return;
    }
    if (!descOfLocationInspected) {
      setDescOfLocationInspectedError("Please enter description of location inspected");
      scrollUp(370);
      return;
    }
    if (!cleanType) {
      setCleanTypeError("Please select anyone option from given cleaning types")
      scrollUp(470);
      return;
    }
    if (!selectedPhoto) {
      setPhotoError("Please capture or select photo");
      scrollUp(670);
      return;
    }
    if (!defectFound) {
      setDefectFoundError("Please select anyone option from given defect found during inspections")
      scrollUp(670);
      return;
    }
    if (!operationsAffected) {
      setOperationsAffectedError("Please select anyone option from given operations affected")
      scrollUp(870);
      return;
    }
    if (!category) {
      setCategoryError("Please select anyone option from given categories");
      scrollUp(1070);
      return;
    }
    if (category === "Other" && otherCategory === "") {
      setOtherCategoryError("Please enter category name");
      scrollUp(1170);
      return;
    }
    if (!defectDescription) {
      setDefectDescriptionError("Please enter description of defect")
      return;
    }
    if (!date) {
      setDateError("Please select date")
      return;
    }
    if (!reference) {
      setReferenceError("Please enter reference")
      return;
    }
    else {
      setLoader(true);
      uploadPhoto();
    }
  }

  const submitDetails = async (photoUrl, photoName) => {
    console.log(siteInspected, " siteInspected");
    console.log(unit, " unit");
    console.log(inspectorName, " inspectorName");
    console.log(checkedInspection, " Inspection Types");
    console.log(checkedInspectionOther, " Inspection Types Other");
    console.log(descOfLocationInspected, " descOfLocationInspected");
    console.log(cleanType, " cleanType");
    console.log(comments, " comments");
    console.log(photoUrl, " photoUrl");
    console.log(photoName, " photoName");
    console.log(defectFound, " defectFound");
    console.log(operationsAffected, " operationsAffected");
    console.log(category, " category");
    console.log(otherCategory, " otherCategory");
    console.log(defectDescription, " defectDescription");
    console.log(date, " date");
    console.log(reference, " reference");

    const filterInspectionTypes = checkedInspection.includes("Other") ?
      [...checkedInspection, checkedInspectionOther] :
      checkedInspection;

    const filterCategory = category === "Other" ? otherCategory : category;

    try {
      await FIRESTORE.collection('allforms').doc(uid).collection('form').add({
        unit,
        date,
        comments,
        photoUrl,
        photoName,
        cleanType,
        reference,
        defectFound,
        inspectorName,
        siteInspected,
        defectDescription,
        operationsAffected,
        category: filterCategory,
        time: moment().format("hh:mm"),
        inspectionTypes: filterInspectionTypes,
        locationInspectedDesc: descOfLocationInspected,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setLoader(false);
      navigate('Forms');

      /* clean all fields */

      setUnit("");
      setDate("");
      setCategory("");
      setComments("");
      setCleanType("");
      setReference("");
      setDefectFound("");
      setSelectedPhoto("");
      setOtherCategory("");
      setInspectorName("");
      setSiteInspected("");
      setCheckedInspection([]);
      setDefectDescription("");
      setOperationsAffected("");
      setCheckedInspectionOther("");
      setCheckedInspectionOther("");
      setDescOfLocationInspected("");
    }
    catch (err) {
      setLoader(false);
      console.log(err, " error in submit new form details")
    }
  }

  const uploadPhoto = async () => {
    setLoader(true)
    const ext = selectedPhoto.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    const destinationPath = `form/images/${filename}`;
    try {
      await FIREBASE_STORAGE
        .ref(destinationPath)
        .putFile(selectedPhoto);
      FIREBASE_STORAGE
        .ref(destinationPath)
        .getDownloadURL()
        .then(url => {
          submitDetails(url, filename);
        })
    }
    catch (err) {
      console.log("error in image upload");
    }
  }

  /* Renders */

  const _renderFirstSectionFields = () => {
    return (
      <View style={{ ...styles.paddingHorizontal, marginTop: 10 }}>
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
      </View>
    )
  }

  const _renderSecondSectionFields = () => {
    return (
      <>
        <FieldsHeading text="Brief Description of Location Inspected" />
        <View style={styles.paddingHorizontal}>
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
        </View>
      </>
    )
  }

  const _renderThirdSectionFields = () => {
    return (
      <>
        <FieldsHeading text="General Observations &amp; Comments" />
        <View style={styles.paddingHorizontal}>
          <InputField
            multiline
            value={comments}
            label='Comments'
            onChangeText={(e) => setComments(e)}
          />
          {selectedPhoto !== "" ? (
            <>
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
              {photoError !== "" && (
                <Text style={styles.error}>
                  {photoError}
                </Text>
              )}
            </>
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
                      source={require('../../assets/photo-camera.png')}
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
        </View>
      </>
    )
  }

  const _renderFourthSectionFields = () => {
    return (
      <>
        <FieldsHeading text="Defect Record" />
        <View style={styles.paddingHorizontal}>
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
        </View>
      </>
    )
  }

  const _renderFifthSectionFields = () => {
    return (
      <View style={styles.paddingHorizontal}>
        <Text style={styles.marginLable}>
          Seperate Defect Notification From Created
        </Text>

        <TouchableOpacity
          activeOpacity={.8}
          style={styles.datePickerButton}
          onPress={() => setDatePickerModal(true)}
        >
          <Text style={styles.datePickerButtonText}>
            {date ? "Change Date" : "Select Date"}
          </Text>
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
      </View>
    )
  }

  const _renderBottomButton = () => {
    return (
      <View
        style={{
          ...styles.paddingHorizontal,
          ...styles.bottomButtonWrapper,
        }}
      >
        <Button
          disabled={loader}
          onPress={validateForm}
          text={loader ? "Submitting..." : "Submit Details"}
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
          bounces={false}
          ref={ref => scrollRef = ref}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
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
        <ActivityIndicator size="large" color={OfficialColor} />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: '2%',
    paddingBottom: '6%',
    backgroundColor: GreyColor,
  },
  paddingHorizontal: {
    paddingHorizontal: '6%',
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
    color: BlackColor,
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
    marginBottom: 10,
    borderColor: GreenColor,
    backgroundColor: GreenColor,
    borderRadius: 3,
    borderWidth: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 120,
  },
  datePickerButtonText: {
    fontSize: 17,
    color: WhiteColor,
    // marginBottom: 10,
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
