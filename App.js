import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import React from "react";

import * as SecureStore from 'expo-secure-store';
//import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Login from "./views/Login";
import Home from "./views/Home";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails"
import Cart from "./views/Cart"
import Register from "./views/Register"
import Orders from "./views/Orders"
import ProductOrders from "./views/ProductOrders"

import { createBottomTabNavigator } from 'react-navigation-tabs';
import ScannerScreen from "./views/ScannerScreen";

const LoginStack = createStackNavigator({
  Login: { screen: Login },
  Register: {screen: Register}
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

const CartStack = createStackNavigator({
  Cart: {screen: Cart},
  ProductDetails: {screen: ProductDetails}
})
CartStack.navigationOptions = {
  tabBarLabel: 'Carrito',
};

const OrdersStack = createStackNavigator({
  Orders: {screen: Orders},
  ProductOrders: {screen: ProductOrders},
  ProductDetails: {screen: ProductDetails}
})
OrdersStack.navigationOptions = {
  tabBarLabel: 'Orders',
};

const ScannerStack = createStackNavigator({
  Scanner: {screen: ScannerScreen},
  ProductDetails: {screen: ProductDetails}
})
ScannerStack.navigationOptions = {
  tabBarLabel: 'Escaner',
};

const MainTabs = createBottomTabNavigator({
  Home: MainStack,
  Products: ProductsStack,
  Scan: ScannerStack,
  Orders: OrdersStack,
  Cart: CartStack
  
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      //let IconComponent = Ionicons;
      let IconComponent = FontAwesome5;
      let iconName;
      if (routeName === 'Home') {
        iconName = `home`;
      } 
      else if (routeName === 'Products') {
        iconName = `shopping-bag`;
      }
      else if (routeName === 'Cart') {
        iconName = `shopping-cart`
      }
      else if (routeName === 'Scan') {
        iconName = `barcode`
      }
      else if (routeName === 'Orders') {
        iconName = 'truck'
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



const App = createSwitchNavigator(
  {
      Login: LoginStack,
      Main: MainTabs,
  },
  {
      initialRouteName: 'Login',
      
      defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#369fe0',
            borderWidth: 0,
            borderBottomWidth: 2,
            borderBottomColor: 'black'
        },headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white'
        },
      }
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
