import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';

import Color from './Assets/Utilities/Color';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {View} from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import Signup from './Screens/Signup';
import Walkthrough from './Screens/Walkthrough';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import HomeScreen from './Screens/HomeScreen';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  console.log(
    '🚀 ~ file: appNavigation.js:27 ~ AppNavigator ~ walkThrough',
    walkThrough,
  );
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'Walkthrough'
        : token != null
        ? 'DrawerNav'
        : 'LoginScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="Walkthrough" component={Walkthrough} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="DrawerNav" component={DrawerNavigation} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const DrawerNavigation = () => {
  const RootDrawer = createDrawerNavigator();
  const firstScreen = 'HomeScreen';

  return (
    <RootDrawer.Navigator
      initialRouteName={firstScreen}
      screenOptions={{
        headerShown: false,
        
      }}>
      <RootDrawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerActiveBackgroundColor: Color.secondaryColor,
          drawerActiveTintColor : Color.themeColor
        }}
      />
    </RootDrawer.Navigator>
  );
};

// export const TabNavigation = () => {
//   const Tabs = createBottomTabNavigator();
//   return (
//     <Tabs.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarIcon: ({focused}) => {
//           let iconName;
//           let color = Color.themeColor;
//           let size = moderateScale(20, 0.3);
//           let type = Ionicons;

//           if (route.name === 'HomeScreen') {
//             iconName = focused ? 'home' : 'home-outline';
//             color = focused ? Color.themeColor : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'SecondTab') {
//             iconName = focused ? 'stats-chart' : 'stats-chart-outline';
//             color = focused ? Color.themeColor : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'NotificationScreen') {
//             type = FontAwesome;
//             iconName = focused ? 'bell' : 'bell-o';

//             color = focused ? Color.themeColor : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'CreateNew') {
//             type = AntDesign;
//             iconName = focused ? 'Plus' : 'Plus';

//             color = focused ? Color.themeColor : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else {
//             iconName = focused ? 'settings-outline' : 'settings-sharp';
//             color = focused ? Color.themeColor : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           }
//           return route.name == 'CreateNew' ? (
//             <View
//               style={{
//                 borderWidth: 5,
//                 borderColor: Color.lightGrey,
//      
export default AppNavigator ;