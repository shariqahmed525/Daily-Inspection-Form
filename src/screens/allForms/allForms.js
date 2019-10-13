import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';

import store from '../../redux/store/store'
import { OfficialColor, RedColor, GreenColor, GreyColor } from '../../constants/colors';

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

  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [allForms, setAllForms] = useState([]);

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

  return (
    <View style={styles.container}>
      {isLoading ?
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={OfficialColor} />
        </View>
        :
        (allForms !== undefined && allForms !== null) ? allForms.length > 0 ? (
          <SwipeListView
            disableRightSwipe
            data={allForms}
            renderItem={(data, rowMap) => {
              return (
                <View style={styles.rowFront}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/home/all-forms.png')}
                  />
                  <View style={styles.listTextWrapper}>
                    <Text style={styles.listText}>{data.item.siteInspected}</Text>
                    <Text style={styles.listSubText}>29 September 2019</Text>
                  </View>
                </View>
              )
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <ListButton
                  style={styles.edit}
                  // onPress={() => alert('Edit')}
                  icon={require('../../assets/file.png')}
                />
                <ListButton
                  style={styles.delete}
                  // onPress={() => alert('Delete')}
                  icon={require('../../assets/garbage.png')}
                />
              </View>
            )}
            rightOpenValue={-140}
          />
        )
          :
          <View style={styles.loader}>
            <Text>No forms created yet</Text>
          </View>
          :
          <View style={styles.loader}>
            <Text>No forms created yet</Text>
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
    backgroundColor: '#fff',
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
    justifyContent: 'flex-end',
  },
  listButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
  },
  delete: {
    width: 70,
    height: '100%',
    backgroundColor: RedColor,
  },
  edit: {
    width: 70,
    height: '100%',
    backgroundColor: GreenColor,
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
    color: '#000',
  },
  listSubText: {
    fontSize: 12,
    marginTop: 2,
    color: '#000',
  },
  listTextWrapper: {
    marginLeft: 10,
  }
})
