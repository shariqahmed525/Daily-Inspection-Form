import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaView } from "react-navigation";

import store from './src/redux/store/store';
import AppContainer from './src/Navigation';
import { OfficialColor, GreyColor } from './src/constants/colors';

export default App = () => {

  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'never', }}>
          <StatusBar hidden={false} backgroundColor={OfficialColor} barStyle={"dark-content"} />
          <AppContainer />
        </SafeAreaView>
      </View>
    </Provider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GreyColor
  },
});


