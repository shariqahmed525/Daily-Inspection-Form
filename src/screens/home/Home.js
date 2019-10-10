import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Box from '../../components/Box';
import { useNavigation } from 'react-navigation-hooks';
import { shadow, GreyColor } from '../../constants/colors';

export default Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Box
        text="NEW FORM"
        imageStyle={styles.mainImage}
        onPress={() => navigate('NewForm')}
        style={styles.firstContainer}
        image={require('../../assets/home/add-file.png')}
      />
      <View style={styles.secondContainer}>
        <Box
          text="ALL FORMS"
          imageStyle={styles.image}
          onPress={() => navigate('')}
          style={styles.firstSubContainer}
          image={require('../../assets/home/file.png')}
        />
        <Box
          text="LOG OUT"
          imageStyle={styles.image}
          onPress={() => navigate('Login')}
          style={styles.secondSubContainer}
          image={require('../../assets/home/exit.png')}
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
    backgroundColor: "#fff",
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
    backgroundColor: '#fff',
    height: '100%',
    borderRadius: 7,
    ...shadow,
  },
  secondSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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