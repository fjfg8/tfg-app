import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Login from "./views/Login";
import Home from "./views/Home";

const App = createStackNavigator(
  {
      Login: { screen: Login },
      Home: { screen: Home},
  },
  {
      initialRouteName: 'Login'
      /*,
      defaultNavigationOptions: {
          headerTintColor: '#FFF',
          headerStyle: {
              backgroundColor: '#FF6161',
              borderWidth: 0,
              borderBottomWidth: 3,
              borderBottomColor: 'blue'
          }
      }*/
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
