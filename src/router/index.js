import React from 'react'
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Home from '../page/home';
import SealStart from '../page/seal/SealStart.js';
import Seal from '../page/seal/Seal';
import Logout from '../page/login/Logout';
import History from '../page/history';
import Login from '../page/login/Login';
import Map from '../page/map';
import BillList from '../page/Bill/BillList';
import Bill from '../page/Bill';
import BillScan from '../page/Bill/Scan';
import SplashScreen from '../page/SplashScreen';
import HistoryCreate from '../page/history/HistoryCreate';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        /> */}
        {/* <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate(Logout)}
        /> */}
    </DrawerContentScrollView>
  );
}

function MainApp() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Daftar Segel" component={Seal} options={{ headerShown: false }} />
      <Drawer.Screen name="History Segel" component={History} options={{ headerShown: false }} />
      <Drawer.Screen name="Mapping Pelanggan" component={Map} options={{ headerShown: false }} />
      <Drawer.Screen name="Tagihan Pelanggan" component={Bill} options={{ headerShown: false }} />
      <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );

}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={gestureHandlerRootHOC(SplashScreen)} options={{ headerShown: false }} />
      <Stack.Screen name="Mapping Pelanggan" component={gestureHandlerRootHOC(Map)} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={gestureHandlerRootHOC(Home)} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={gestureHandlerRootHOC(Login)} options={{ headerShown: false }} />
      <Stack.Screen name="Tagihan Pelanggan" component={gestureHandlerRootHOC(Bill)} options={{ headerShown: false }} />
      <Stack.Screen name="BillList" component={gestureHandlerRootHOC(BillList)} options={{ headerShown: false }} />
      <Stack.Screen name="BillScan" component={gestureHandlerRootHOC(BillScan)} options={{ headerShown: false }} />

      <Stack.Screen name="Daftar Segel" component={gestureHandlerRootHOC(Seal)} options={{ headerShown: false }} />
      <Stack.Screen name="History Segel" component={gestureHandlerRootHOC(History)} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryCreate" component={gestureHandlerRootHOC(HistoryCreate)} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={gestureHandlerRootHOC(MainApp)} options={{ headerShown: false }} />
    </Stack.Navigator>
  )

}
export default Router