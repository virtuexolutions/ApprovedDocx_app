import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Color from '../Assets/Utilities/Color'

const Header = ({leftIcon , leftPress , rightIcon , rightPress , headerColor , leftType}) => {
  return (
    <View style={[styles.container,headerColor && {backgroundColor : headerColor}]}>
        {
            leftIcon &&
        
     <Icon 
     name={leftIcon}
     as={leftType ? leftType : AntDesign}
     size={moderateScale(20,0.3)}
     color={Color.themeColor}
     onPress={()=>{
        leftPress()
     }}
     />
    }
    {
        rightIcon &&
    
      <Icon 
     name={rightIcon}
     as={MaterialCommunityIcons}
     size={moderateScale(20,0.3)}
     color={Color.themeColor}
     onPress={()=>{
        rightPress()
     }}
     />}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container : {
        width : windowWidth ,
        flexDirection : 'row' ,
        justifyContent : 'space-between',
        paddingHorizontal : moderateScale(20,0.3)
      , paddingTop : moderateScale(10,0.3),
      }})