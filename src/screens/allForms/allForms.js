import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from 'react-navigation-hooks';

import store from '../../redux/store/store';
import { OfficialColor, RedColor, GreyColor } from '../../constants/colors';

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

  const deleteForm = (data) => {
    console.log(data);
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
            stopLeftSwipe={width / 2}
            stopRightSwipe={-(width / 2)}
            data={allForms}
            renderItem={(data) => {
              return (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.SelectableBackground()}
                >
                  <View style={styles.rowFront}>
                    <Image
                      style={styles.image}
                      source={require('../../assets/home/all-forms.png')}
                    />
                    <View style={styles.listTextWrapper}>
                      <Text style={styles.listText}>{data.item.siteInspected}</Text>
                      <Text style={styles.listSubText}>{data.item.date}</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
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
                  onPress={() => deleteForm(data.item)}
                  icon={require('../../assets/garbage.png')}
                />
              </View>
            )}
            leftOpenValue={70}
            rightOpenValue={-70}
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
