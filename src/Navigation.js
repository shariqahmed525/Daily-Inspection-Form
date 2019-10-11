import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screens/login/Login';
import Home from './screens/home/Home';
import NewForm from './screens/newForm/NewForm';

const Stack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => {
      return {
        headerTitle: "Daily Inspection Form",
        headerTitleStyle: {
          textAlign: 'center',
        },
        headerTitleContainerStyle: {
          justifyContent: 'center',
        },
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
      }
    }
  },
  NewForm: {
    screen: NewForm,
    navigationOptions: () => {
      return {
        headerTitle: "New Form",
        headerTitleStyle: {
          textAlign: 'center',
        },
        headerTitleContainerStyle: {
          justifyContent: 'center',
        },
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerRight: <></>
      }
    }
  },
});

const MainStack = createSwitchNavigator({
  MainScreen: {
    screen: Stack,
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
}, {
  initialRouteName: "Login"
})

const AppContainer = createAppContainer(MainStack);

export default AppContainer;