import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Forms from './screens/forms/forms';
import NewForm from './screens/newForm/NewForm';
import EditForm from './screens/editForm/EditForm';

import { OfficialColor } from './constants/colors';

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
          backgroundColor: OfficialColor,
        },
      }
    }
  },
  Forms: {
    screen: Forms,
    navigationOptions: () => {
      return {
        headerTitle: "All Forms",
        headerTitleStyle: {
          textAlign: 'center',
        },
        headerTitleContainerStyle: {
          justifyContent: 'center',
        },
        headerStyle: {
          backgroundColor: OfficialColor,
        },
        headerRight: <></>
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
          backgroundColor: OfficialColor,
        },
        headerRight: <></>
      }
    }
  },
  EditForm: {
    screen: EditForm,
    navigationOptions: () => {
      return {
        headerTitle: "Edit Form",
        headerTitleStyle: {
          textAlign: 'center',
        },
        headerTitleContainerStyle: {
          justifyContent: 'center',
        },
        headerStyle: {
          backgroundColor: OfficialColor,
        },
        headerRight: <></>
      }
    }
  },
}, {
  initialRouteName: "Home"
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