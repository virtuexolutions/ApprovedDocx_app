import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {setIsVerified, setUserLogin, setUserToken} from '../Store/slices/auth';
import {Platform} from 'react-native';
import {setUserData} from '../Store/slices/common';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomHeader from '../Components/CustomHeader';
import navigationService from '../navigationService';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = props => {
  const phoneNumber = props?.route?.params?.phoneNumber;
  console.log(phoneNumber);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const passwordReset = async () => {
  //   const params = {
  //     password: password,
  //     confirm_password: confirmPassword,
  //     email: phoneNumber,
  //   };
  //   for (let key in params) {
  //     if (params[key] === '') {
  //       return (Platform.OS = 'android'
  //         ? ToastAndroid.show('Required field is empty', ToastAndroid.SHORT)
  //         : Alert.alert('Required field is empty'));
  //     }
  //   }

  //   // Password Length
  //   if (password.length < 8) {
  //     return Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Password should atleast 8 character long',
  //           ToastAndroid.SHORT,
  //         )
  //       : Alert.alert('Password should atleast 8 character long');
  //   }
  //   if (password != confirmPassword) {
  //     return (Platform.OS = 'android'
  //       ? ToastAndroid.show('passwords MissMatched !', ToastAndroid.SHORT)
  //       : Alert.alert('passwords MissMatched !'));
  //   }

  //   const url = 'password/reset';
  //   setIsLoading(true);
  //   const response = await Post(url, params, apiHeader());
  //   setIsLoading(false);
  //   if (response !== undefined) {
  //     Platform.OS == 'android'
  //       ? ToastAndroid.show(`Password Reset successfully`, ToastAndroid.SHORT)
  //       : alert(`Password Reset successfully`);
  //     navigationService.navigate('LoginScreen');
  //   }
  // };
  // dispatch(setUserToken('123456'));

  return (
    <>
      <CustomStatusBar backgroundColor={Color.themeColorLight} barStyle={'dark-content'} />
      <Header leftIcon={'arrowleft'} leftPress={()=>{navigation.goBack()}}  headerColor={Color.white} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            // justifyContent: 'center',
            width: '100%',
            minHeight: windowHeight,
            backgroundColor : 'white'
          }}>
            <CustomText
          isBold
          style={{
            marginTop: windowHeight * 0.1,
            textAlign: 'center',
            fontSize: moderateScale(33, 0.3),
          }}>
          Reset Password
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
         Enter your new password
        </CustomText>
            <TextInputWithTitle
              titleText={'password'}
              secureText={true}
              placeholder={'password'}
              setText={setPassword}
              value={password}
              ViewHeight={0.07}
              viewWidth={0.7}
              inputWidth={0.65}
              borderBottomWidth={2}
              borderColor={Color.secondaryColor}
              backgroundColor={'transparent'}
              marginTop={windowHeight * 0.1}
              color={Color.themeColorLight}
              placeholderColor={Color.themeLightGray}
            />
            <TextInputWithTitle
              titleText={'Re-type password'}
              secureText={true}
              placeholder={'Re-type password'}
              setText={setConfirmPassword}
              value={confirmPassword}
              ViewHeight={0.07}
              viewWidth={0.7}
              inputWidth={0.65}
              borderBottomWidth={2}
              borderColor={Color.secondaryColor}
              backgroundColor={'transparent'}
              marginTop={windowHeight * 0.06}
              color={Color.themeColorLight}
              placeholderColor={Color.themeLightGray}
            />
          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Save changes'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            // onPress={passwordReset}
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
    color: Color.themeColor,
    fontSize: moderateScale(25, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    width: '70%',
    marginTop: moderateScale(20, 0.3),
    // lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.themePink,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    // alignSelf : 'center'
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(50, 0.3),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  // backgroundColor: Color.black,
    // borderRadius: moderateScale(10, 0.3),
  },
  focusCell: {
    borderBottomColor: Color.themeDarkGray,
    borderBottomWidth: 2,
  },
})
export default ResetPassword;