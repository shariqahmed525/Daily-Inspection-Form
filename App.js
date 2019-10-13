import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/store/store';
import AppContainer from './src/Navigation';
import { OfficialColor } from './src/constants/colors';

export default App = () => {

  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
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
    backgroundColor: OfficialColor
  },
});


