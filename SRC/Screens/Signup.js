import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import ShakingText from '../Components/ShakingText';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {PropTypes} from 'prop-types';
import navigationService from '../navigationService';
import { ScrollView } from 'react-native';
import { Icon } from 'native-base';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState({});
  const [password, setPassword] = useState('');
  const [confirmedPass, setConfirmedPass] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.themeColorLight}
        barStyle={'light-content'}
      />
      {/* <Header leftIcon={'arrowleft'} rightIcon={'dots-vertical'} /> */}

      <ScrollView style={styles.cont}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom : moderateScale(20,0.3)
      }}
      >
        <CustomText
          isBold
          style={{
            marginTop: windowHeight * 0.1,
            textAlign: 'center',
            fontSize: moderateScale(33, 0.3),
          }}>
          Sign Up!
        </CustomText>
        {/* <ShakingText 
        ref={(ref)=>{setTextRef(ref)}}
        >
          Welcome
        </ShakingText> */}
        <CustomText
          style={{
            fontSize: moderateScale(11, 0.3),
            textAlign: 'center',
            color: Color.themeBlack,
          }}
          // onPress={()=>{
          //   textRef.shake()
          // }}
        >
          Create Your new account
        </CustomText>
        <View style={{
          marginTop : moderateScale(40,0.3)
        }} >
            {Object.keys(image).length > 0 ? (
              <CustomImage source={{uri: image?.uri}} style={styles.image} />
            ) : (
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/user3.jpg')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={styles.edit}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
          </View>
        <TextInputWithTitle
          iconName="user-o"
          iconType={FontAwesome}
          titleText={'First Name'}
          secureText={false}
          placeholder={'First Name'}
          setText={setFirstName}
          value={firstName}
          ViewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
          marginTop={windowHeight * 0.06}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <TextInputWithTitle
          iconName="user-o"
          iconType={FontAwesome}
          titleText={'Last Name'}
          secureText={false}
          placeholder={'Last Name'}
          setText={setLastName}
          value={lastName}
          viewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
          marginTop={windowHeight * 0.03}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <TextInputWithTitle
          iconName="envelope-o"
          iconType={FontAwesome}
          titleText={'Email address'}
          secureText={false}
          placeholder={'Email address'}
          setText={setEmail}
          value={email}
          viewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
          marginTop={windowHeight * 0.03}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <TextInputWithTitle
          iconName="phone"
          iconType={AntDesign}
          titleText={'Contact'}
          secureText={false}
          placeholder={'Contact'}
          setText={setContact}
          value={contact}
          viewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
          marginTop={windowHeight * 0.03}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <TextInputWithTitle
          iconName="key-outline"
          iconType={Ionicons}
          titleText={'Password'}
          secureText={true}
          placeholder={'Password'}
          setText={setPassword}
          value={password}
          viewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
         marginTop={windowHeight * 0.03}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <TextInputWithTitle
          iconName="key-outline"
          iconType={Ionicons}
          titleText={'Confrim Password'}
          secureText={true}
          placeholder={'Confrim Password'}
          setText={setConfirmedPass}
          value={confirmedPass}
          viewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
         marginTop={windowHeight * 0.03}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <CustomButton
          // textTransform={"capitalize"}
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Register'
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(40, 0.3)}
          // onPress={passwordReset}
          bgColor={Color.themeColorLight}
          borderColor={Color.white}
          borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
          // textTransform={'uppercase'}
        />
         <CustomText
          style={{
            width: windowWidth * 0.7,
            textAlign: 'center',
            fontSize: moderateScale(11, 0.3),
            marginTop: moderateScale(25, 0.3),
          }}>
          already have an account ?
        </CustomText>
        <CustomText
          onPress={() => {
            navigationService.navigate('LoginScreen');
          }}
          isBold
          style={{
            width: windowWidth * 0.7,
            textAlign: 'center',
            fontSize: moderateScale(14, 0.3),
            marginTop: moderateScale(5, 0.3),
            color: Color.themeColorLight,
          }}>
          Sign In
        </CustomText>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cont: {
  
    backgroundColor: Color.white,
  },

  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    // marginLeft: moderateScale(2.5, 0.3),
    // marginTop: moderateScale(2.5, 0.3),
  },
  edit: {
    backgroundColor: Color.blue,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }})

  export default Signup;