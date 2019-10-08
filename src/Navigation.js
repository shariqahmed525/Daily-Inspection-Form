import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screens/login/Login';
import NewForm from './screens/newForm/NewForm';

const Stack = createStackNavigator({
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
        }
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
  initialRouteName: "MainScreen"
})

const AppContainer = createAppContainer(MainStack);

export default AppContainer;