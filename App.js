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

export default App = () => {

  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={false} backgroundColor={"#f5f5f5"} barStyle={"dark-content"} />
          <AppContainer />
        </SafeAreaView>
      </View>
    </Provider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
});


