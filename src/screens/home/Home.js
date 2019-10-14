import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { useNavigation } from 'react-navigation-hooks';
import Box from '../../components/Box';

import { shadow, GreyColor, OfficialColor } from '../../constants/colors';
import { FIREBASE_AUTH } from '../../constants/constant';

export default Home = () => {
  const { navigate } = useNavigation();

  const logout = () => FIREBASE_AUTH.signOut().then(() => navigate('Login'))

  return (
    <View style={styles.container}>
      <Box
        text="NEW FORM"
        imageStyle={styles.mainImage}
        onPress={() => navigate('NewForm')}
        style={styles.firstContainer}
        image={require('../../assets/home/new-form.png')}
      />
      <View style={styles.secondContainer}>
        <Box
          text="ALL FORMS"
          imageStyle={styles.image}
          onPress={() => navigate('AllForms')}
          style={styles.firstSubContainer}
          image={require('../../assets/home/all-forms.png')}
        />
        <Box
          text="LOG OUT"
          imageStyle={styles.image}
          onPress={logout}
          style={styles.secondSubContainer}
          image={require('../../assets/home/logout.png')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: '6%',
    backgroundColor: GreyColor,
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    ...shadow,
    backgroundColor: OfficialColor,
    marginBottom: 15
  },
  secondContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: OfficialColor,
    height: '100%',
    borderRadius: 7,
    ...shadow,
  },
  secondSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: OfficialColor,
    borderRadius: 7,
    height: '100%',
    ...shadow,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  mainImage: {
    height: 100,
    width: 100,
    marginBottom: 15
  },
});