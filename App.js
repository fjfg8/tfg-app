import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import React from "react";

import * as SecureStore from 'expo-secure-store';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Login from "./views/Login";
import Home from "./views/Home";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails"

import { createBottomTabNavigator } from 'react-navigation-tabs';

const LoginStack = createStackNavigator({
  Login: { screen: Login },
});

const MainStack = createStackNavigator({
  Home: { screen: Home},
  ProductDetails: {screen: ProductDetails}
  //Products: {screen: Products}
});
MainStack.navigationOptions = {
  tabBarLabel: 'Inicio',
};

const ProductsStack = createStackNavigator({
  Products: {screen: Products},
  ProductDetails: {screen: ProductDetails}
})
ProductsStack.navigationOptions = {
  tabBarLabel: 'Productos',
};

const MainTabs = createBottomTabNavigator({
  Home: MainStack,
  Products: ProductsStack
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`;
      } 
      else if (routeName === 'Products') {
        iconName = `ios-options`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#369fe0',
    inactiveTintColor: 'gray',
  },
  
});

const MainDrawer = createDrawerNavigator({
  
  Home: MainTabs,
  
});



const App = createSwitchNavigator(
  {
      Login: LoginStack,
      Main: MainTabs,
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
