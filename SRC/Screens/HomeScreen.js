import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const HomeScreen = () => {
    const navigation = useNavigation()
  return (
    <>
    <CustomStatusBar backgroundColor={Color.themeColorLight} barStyle={'dark-content'} />
    <Header leftIcon={'bars'} leftType={FontAwesome} leftPress={()=>{navigation.toggleDrawer()}}  headerColor={Color.white} />
    </>
  )
}

export default HomeScreen

const styles = ScaledSheet.create({})