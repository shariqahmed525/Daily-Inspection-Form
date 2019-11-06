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
import AwesomeAlert from '../../components/react-native-awesome-alerts';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from 'react-navigation-hooks';

import Print from '../print/Print';
import store from '../../redux/store/store';
import { FIRESTORE } from '../../constants/constant';
import { OfficialColor, RedColor, GreyColor, BlackColor, WhiteColor } from '../../constants/colors';

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

  const [uid, setUid] = useState("");
  const [allForms, setAllForms] = useState([]);
  const [formName, setFormName] = useState("");
  const [progress, setProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteObject, setDeleteObject] = useState(null);

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
    setFormName(data.siteInspected);
    setShowAlert(true);
    setDeleteObject(data);
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
              bounces={false}
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
                      <TouchableOpacity onPress={() => {
                        store.dispatch({ type: "START_LOADING" })
                        Print(data.item);
                      }}>
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
              message={!progress && `Are you sure to delete ${formName} form?`}
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
