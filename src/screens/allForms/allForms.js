import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNPrint from 'react-native-print';
import AwesomeAlert from '../../components/react-native-awesome-alerts';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from 'react-navigation-hooks';

import store from '../../redux/store/store';
import { OfficialColor, RedColor, GreyColor, BlackColor, WhiteColor } from '../../constants/colors';
import { FIRESTORE, CATEGORIES, INSPECTION_TYPES } from '../../constants/constant';

const { width } = Dimensions.get('window');

const ListButton = props => {
  return (
    <TouchableOpacity
      style={{
        ...styles.listButton,
        ...props.style
      }}
      activeOpacity={.8}
      onPress={props.onPress}
    >
      <Image
        style={styles.listButtonIcon}
        source={props.icon}
      />
    </TouchableOpacity>
  )
}

export default AllForms = () => {
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [allForms, setAllForms] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteObject, setDeleteObject] = useState(null);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    getStateFromStore();
    store.subscribe(getStateFromStore);
  }, [])

  const getStateFromStore = () => {
    const { authReducers } = store.getState();
    setUid(authReducers.uid);
    setAllForms(authReducers.allForms);
    setIsLoading(authReducers.loading);
  }

  const confirmation = (data) => {
    setShowAlert(true);
    setDeleteObject(data);
  }


  const header = (siteInspected, unit, date, time) => {
    const table = "border: 1px solid black; border-collapse: collapse; table-layout:fixed; width:100%;";
    const tdPadding = "padding:5px;";
    const borderTop = "border-top:2px solid black;";
    const borderLeft = "border-left:2px solid black;";
    const borderBottom = "border-bottom:2px solid black;";
    return (
      `<table style="${table}" cellspacing="0">
              <tbody>
                <tr>
                  <td style="${tdPadding} ${borderBottom} text-align:center;">
                      <img src="https://i.ibb.co/yfsXZJ2/logo.png" style="width:120px; height:120px; padding:10px;" />
                  </td>
                  <td style="border:2px solid black; border-top:none; text-align:center; padding:10px">
                      <h1>Daily Inpection Form</h1>
                      <h3>Mafraq, Al-Khatim, Ghantoot, and TSE Plants</h3>
                  </td>
                 <td style="${borderBottom}">
                    <table style="${table} height:200px; border:none;">
                      <tr>
                        <td style="${tdPadding}">Site Inspected</td>
                        <td style="${tdPadding} ${borderLeft}">${siteInspected}</td>
                      </tr>
                      <tr>
                        <td style="${tdPadding} ${borderTop}">Unit</td>
                        <td style="${tdPadding} ${borderLeft} ${borderTop}">${unit}</td>
                      </tr>
                      <tr>
                        <td style="${tdPadding} ${borderTop}">Date</td>
                        <td style="${tdPadding} ${borderLeft} ${borderTop}">${date}</td>
                      </tr>
                      <tr>
                        <td style="${tdPadding} ${borderTop}">Time</td>
                        <td style="${tdPadding} ${borderLeft} ${borderTop}">${time.split(",")[1].trim()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
      `
    )
  }

  const firstSection = (inspectorName, inspectionTypes) => {
    const th = "text-align:left; padding-top:10px;";
    const td = "padding-left:10px; padding-top:10px;";
    const span = "border-bottom:1px solid black; padding: 0px 20px;  line-height: 32px;";
    let ins = INSPECTION_TYPES.map((v) => {
      return (
        inspectionTypes.includes(v) ?
          v === "Other" ?
            `<span style="${span}">✔</span> 
            <b>${v}</b> 
            <span style="${span}">
              ${inspectionTypes[inspectionTypes.length - 1]}
            </span>`
            :
            `<span style="${span}">✔</span>
            <b style="margin-right:10px;"> ${v}</b> `
          :
          `<span style="${span}"></span> 
            <b style="margin-right:10px;"> ${v}</b>`
      )
    });
    return (
      `<div style="margin:20px;">
          <table cellspacing="0">
            <tbody>
              <tr>
                <th style="${th} width:120px;">Inspector Name</th>
                <td style="${td}">${inspectorName}</td>
              </tr>
              <tr>
                <th style="${th} padding-top:20px;">Signature</th>
                <td style="${td} padding-top:20px;"><span style="border-bottom:1px solid black; padding: 0px 100px;"></span></td>
              </tr>
              <tr>
                <th style="${th}" valign="top">Inspector Type</th>
                <td style="${td}" valign="top">${ins.join(' ')}</td>
              </tr>
            </tbody>
          </table>
        </table>
      </div>
      `
    )
  }

  const fieldHeadings = (text) => {
    let div = `
        border:1px solid black; 
        padding: 3px 15px; 
        background-color: #9ea989; 
        font-family: sans-serif; 
        margin:10px;
      `;
    return (
      `<div style="${div}">
        <p style="font-size:20px; font-weight:500;">${text}</p>
       </div>
      `
    )
  }

  const secondSection = (cleanType, locationInspectedDesc) => {
    return (
      `<div style="margin:10px 20px 10px 20px; padding:10px 0px;">
        <div style="border-bottom: 1px solid black; padding-bottom:5px;">
            ${locationInspectedDesc}
        </div>
        <div style="padding-top:10px">
          <b>Clean ?</b>
          ${cleanType == "Clean ?" ?
        `<span style="border-bottom:1px dotted black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px dotted black; padding: 0px 17px;"></span>`}
          
          <b style="margin-left:10">Not Clean ?</b>
           ${cleanType == "Not Clean ?" ?
        `<span style="border-bottom:1px dotted black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px dotted black; padding: 0px 17px;"></span>`}
        </div>
      </div>
      `
    )
  }

  const thirdSection = (comments, photoUrl) => {
    const td = "padding:10px 10px;";
    return (
      `<div style="margin:20px;">
        <table style="border:1px solid black; table-layout:fixed; width:100%;">
          <tbody>
            <tr>
              <td style="${td}">
                <span style="border-bottom: 1px solid #000; line-height: 27px;">
                  ${comments}
                </span>
              </td>
              <td style="${td} border-left: 2px solid black; text-align:center;">
                <img src="${photoUrl}" style="width:100px; height:100px; padding:10px;" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      `
    )
  }

  const fourthSection = (defectFound, operationsAffected, catParam, defectDescription, date, reference) => {
    let cat = CATEGORIES.map((v) => {
      return (
        CATEGORIES.includes(catParam) ?
          catParam == v ?
            `<b style="margin-left:10px">${v}</b>
            <span style="border-bottom:1px solid black; padding: 0px 10px;">✔</span>`
            :
            `<b style="margin-left:10px">${v}</b> 
            <span style="border-bottom:1px solid black; padding: 0px 17px;"></span>`
          :
          `<b style="margin-left:10px">${v}</b>
            ${
          v == "Other" ?
            `<span style="border-bottom:1px solid black; padding: 0px 10px; line-height:25px;">${catParam}</span>`
            :
            '<span style="border-bottom:1px solid black; padding: 0px 17px; line-height:25px;"></span>'
          }
          `
      )
    })
    let border = "border: 1px solid black;";
    let td = "padding:20px; text-align:center;";
    let th = "padding:10px 20px;";
    return (
      `<div style="margin:10px 20px 0px 20px; padding:0px 0px;">
        <div style="padding-top:10px">
          <b>Defect found during inspection ?</b> 
          <b style="margin-left:10">Yes</b> 
            ${defectFound == "Yes" ?
        `<span style="border-bottom:1px solid black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px solid black; padding: 0px 17px;"></span>`}
              
              <b style="margin-left:10">No</b> 
              ${defectFound == "No" ?
        `<span style="border-bottom:1px solid black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px solid black; padding: 0px 17px;"></span>`}
        </div>
        
        <div style="padding-top:10px">
          <b>Operations Affected:</b> 
          
          <b style="margin-left:10">Yes</b> 
          ${operationsAffected == "Yes" ?
        `<span style="border-bottom:1px solid black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px solid black; padding: 0px 17px;"></span>`}
              
          <b style="margin-left:10">No</b> 
            ${operationsAffected == "No" ?
        `<span style="border-bottom:1px solid black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px solid black; padding: 0px 17px;"></span>`}
          
          <b style="margin-left:10">Potential</b> 
          ${operationsAffected == "Potential" ?
        `<span style="border-bottom:1px solid black; padding: 0px 10px;">✔</span>` :
        `<span style="border-bottom:1px solid black; padding: 0px 17px;"></span>`}
              
        </div>

        <div style="padding-top:7px; padding-bottom:10px;">
          <table style="width:100%">
            <tr>
              <td style="width:130px;" valign="top">
                <b>Defect Category:</b> 
              </td>
              <td>
                ${cat.join(' ')}
              </td>
            </tr>
          </table>
        </div>

        <div style="padding-top:0px">
          <b>Defect Description: </b> 
          <span style="margin-left:10px; border-bottom: 1px solid #000; line-height: 27px; padding:0px 10px;">
              ${defectDescription}
          </span>
        </div>

        <div>
          <h4>Seperate Detect Notification From Created: </h4>
        </div>

        <div>
          <b>Date: </b>
          <span style="margin-left:10px; border-bottom: 1px solid #000; line-height: 27px; padding:0px 10px;">
              ${date}
          </span>
          <b style="margin-left:15px;">Reference: </b> 
          <span style="margin-left:10px; border-bottom: 1px solid #000; line-height: 27px; padding:0px 10px;">
              ${reference}
          </span>
        </div>

          <center>
            <table style="${border} margin-top:30px;" cellspacing="0">
              <tr>
                <th style="${border} ${th}"></th>
                <th style="${border} ${th}">NAME &amp; DESIGNATION</th>
                <th style="${border} ${th}">DATE</th>
                <th style="${border} ${th}">SIGNATURE</th>
              </tr>
              <tr>
                <th style="${border} ${th} width:100px">Reviewed By:</th>
                <td style="${border} ${td}">
                  <br />
                  ..........................................<br />
                    <p>O&amp;M Engineer</p>
                </td>
                <td style="${border} ${td} width:100px"></td>
                <td style="${border} ${td} width:150px"></td>
              </tr>
              <tr>
                <th style="${border} ${th} width:100px">Approved By:</th>
                <td style="${border} ${td}">
                  <br />
                  ..........................................<br />
                    <p>Senior O&amp;M Engineer </p>
                </td>
                <td style="${border} ${td} width:100px"></td>
                <td style="${border} ${td} width:150px"></td>
              </tr>
            </table>
          </center>
          <p style="margin-top: 20px; text-align:center; font-size:12px; color:#666;">
            THIS DOCUMENT IS THE  PROPERTY OF ADSSC AND CANNOT BE USED OR GIVEN TO OUTSIDE PARTY WITHOUT THE CONSENT OF MANAGEMENT REPRESENTATION
          </p>
      </div>
      `
    )
  }

  const printHTML = async (data) => {
    const {
      unit,
      date,
      time,
      photoUrl,
      comments,
      category,
      cleanType,
      reference,
      defectFound,
      inspectorName,
      siteInspected,
      inspectionTypes,
      defectDescription,
      operationsAffected,
      locationInspectedDesc,
    } = data;

    console.log(data);
    await RNPrint.print({
      // A4 or Letter
      html: `
        <div style="border:2px solid black; height:98%; padding:10px;">
          <div style="border:2px solid black; height:99.5%;">
            ${header(siteInspected, unit, date, time)}
            ${firstSection(inspectorName, inspectionTypes)}
            ${fieldHeadings("Brief Description of Location Inspected:")}
            ${secondSection(cleanType, locationInspectedDesc)}
            ${fieldHeadings("General Observation and Comments:")}
            ${thirdSection(comments, photoUrl)}
          </div>
        </div>
        <div style="border:2px solid black; height:98%; padding:10px; margin-top:20px">
          <div style="border:2px solid black;  height:99.5%;">
          <div style="margin-top:20px" />
          ${fieldHeadings("Defect Record:")}
          ${fourthSection(defectFound, operationsAffected, category, defectDescription, date, reference)}
          </div>
        </div>
      `,

      // PRC 10
      // html: `
      //   <div style="border:2px solid black; flex:1; padding:10px;">
      //     <div style="border:2px solid black; flex:1;">
      //      ${header(siteInspected, unit, date, time)}
      //        ${firstSection(inspectorName, inspectionTypes)}
      //        ${fieldHeadings("Brief Description of Location Inspected:")}
      //        ${secondSection(cleanType, locationInspectedDesc)}
      //        ${fieldHeadings("General Observation and Comments:")}
      //        ${thirdSection(comments, photoUrl)}
      //        ${fieldHeadings("Defect Record:")}
      //        ${fourthSection(defectFound, operationsAffected, category, defectDescription, date, reference)}
      //     </div>
      //   </div>
      // `,
    })
  }

  const deleteForm = () => {
    const { id } = deleteObject
    setProgress(true)
    FIRESTORE
      .collection('allforms')
      .doc(uid)
      .collection('form')
      .doc(id)
      .delete()
      .then(() => {
        setShowAlert(false);
        setProgress(false);
      })
      .catch(err => {
        console.log(err, " error in delete form")
      });
  }

  return (
    <View style={styles.container}>
      {isLoading ?
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={OfficialColor} />
        </View>
        :
        (allForms !== undefined && allForms !== null) ? allForms.length > 0 ? (
          <>
            <SwipeListView
              stopLeftSwipe={width / 2}
              stopRightSwipe={-(width / 2)}
              data={allForms}
              renderItem={(data) => {
                return (
                  <View style={styles.rowFront}>
                    <Image
                      style={styles.image}
                      source={require('../../assets/all-forms.png')}
                    />
                    <View style={styles.listTextWrapper}>
                      <Text style={styles.listText}>{data.item.siteInspected}</Text>
                      <Text style={styles.listSubText}>{data.item.date}</Text>
                    </View>
                    <View style={styles.printIcon}>
                      <TouchableOpacity onPress={() => printHTML(data.item)}>
                        <Image
                          style={styles.image}
                          source={require('../../assets/printer.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
              renderHiddenItem={(data) => (
                <View style={styles.rowBack}>
                  <ListButton
                    style={styles.edit}
                    onPress={() => navigate('EditForm', { selectedListItem: data.item })}
                    icon={require('../../assets/file.png')}
                  />
                  <ListButton
                    style={styles.delete}
                    onPress={() => confirmation(data.item)}
                    icon={require('../../assets/garbage.png')}
                  />
                </View>
              )}
              leftOpenValue={70}
              rightOpenValue={-70}
            />
            <AwesomeAlert
              show={showAlert}
              showProgress={progress}
              title={!progress && "Confirmation"}
              message={!progress && "Are you sure to delete this form?"}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={!progress && true}
              showConfirmButton={!progress && true}
              cancelText="No, cancel"
              confirmText="Yes, delete it"
              confirmButtonColor={RedColor}
              cancelButtonColor={"#b6b6b6"}
              onCancelPressed={() => setShowAlert(false)}
              onConfirmPressed={deleteForm}
            />
          </>
        )
          :
          <View style={styles.loader}>
            <Text style={styles.notFormText}>No forms created yet</Text>
          </View>
          :
          <View style={styles.loader}>
            <Text style={styles.notFormText}>No forms created yet</Text>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GreyColor,
  },
  rowFront: {
    flex: 1,
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '6%',
    backgroundColor: WhiteColor,
    borderBottomColor: "#c3c3c3",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listButton: {
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
  },
  delete: {
    width: width / 2,
    height: '100%',
    paddingRight: 25,
    alignItems: 'flex-end',
    backgroundColor: RedColor,
  },
  edit: {
    width: width / 2,
    height: '100%',
    paddingLeft: 25,
    backgroundColor: OfficialColor,
  },
  listButtonIcon: {
    width: 20,
    height: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  listText: {
    fontSize: 18,
    color: BlackColor,
  },
  listSubText: {
    fontSize: 12,
    marginTop: 2,
    color: BlackColor,
  },
  listTextWrapper: {
    marginLeft: 10,
  },
  notFormText: {
    fontSize: 20,
    color: BlackColor
  },
  printIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
})
