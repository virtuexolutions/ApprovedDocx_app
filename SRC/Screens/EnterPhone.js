import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
import CustomHeader from '../Components/CustomHeader';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';

const EnterPhone = props => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const sendOTP = async () => {
  //   const url = 'password/email';
  //   if (['', null, undefined].includes(phone)) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
  //       : alert('Phone number is required');
  //   }
  //   setIsLoading(true);
  //   const response = await Post(url, {email: phone}, apiHeader());
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('response data =>', response?.data);
  //     Platform.OS == 'android'
  //       ? ToastAndroid.show(`OTP sent to ${phone}`, ToastAndroid.SHORT)
  //       : alert(`OTP sent to ${phone}`);
  //     fromForgot
  //       ? navigationService.navigate('VerifyNumber', {
  //           fromForgot: fromForgot,
  //           phoneNumber: `${phone}`,
  //         })
  //       : navigationService.navigate('VerifyNumber', {
  //           phoneNumber: `${phone}`,
  //         });
  //   }
  // };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.themeColorLight}
        barStyle={'dark-content'}
      />
      <Header leftIcon={'arrowleft'} leftPress={()=>{navigation.goBack()}}  headerColor={'white'} />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
          minHeight: windowHeight,
        }}>
        <Image
          source={require('../Assets/Images/email.png')}
          resizeMode={'contain'}
          style={{
            alignSelf: 'center',
            // backgroundColor : 'red',
            height: windowHeight * 0.3,
            marginTop: moderateScale(30, 0.3),
            marginBottom: moderateScale(30, 0.3),
          }}
        />

        {/* <CardContainer style={{paddingVertical: moderateScale(30, 0.3)}}> */}
        <CustomText style={styles.txt2}>Your Email</CustomText>
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
         Enter your email to reset password
        </CustomText>
        {/* <View style={styles.phoneView}> */}
        <TextInputWithTitle
          iconName="user-o"
          iconType={FontAwesome}
          titleText={'Enter Your email address'}
          secureText={false}
          placeholder={'Enter Your email address'}
          setText={setPhone}
          value={phone}
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

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Submit'
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(40, 0.3)}
          onPress={()=>{
            navigationService.navigate('VerifyNumber' , {phone : phone})
          }}
          bgColor={Color.themeColorLight}
          borderColor={Color.white}
          borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themePink,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
});

export default EnterPhone;
