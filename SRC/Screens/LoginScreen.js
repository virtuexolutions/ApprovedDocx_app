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
import { setUserToken } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const [fingerAuthentication, setFingerAuthentication] = useState(false);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [state, setState] = useState(null);

  const authCurrent = () => {
    FingerprintScanner.authenticate({
      title: 'Log in with Biometrics',
      subTitle: 'Place finger to log in the application',
    })
      .then(data => {
        console.log(data);
        alert('Authentication successfully', data);
        // props.onAuthenticate();
      })
      .catch(error => {
        setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });
        description.shake();
      });
  };
  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy(),
    })
      .then(() => {
        props.handlePopupDismissedLegacy();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });
        description.shake();
      });
  };
  const handleAuthenticationAttemptedLegacy = error => {
    setState({errorMessageLegacy: error.message});
    description.shake();
  };

  const renderLegacy = () => {
    // const { errorMessageLegacy, biometricLegacy } = state;
    // const {handlePopupDismissedLegacy } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer]}>
          <Image
            style={styles.logo}
            source={require('../Assets/Images/finger_print.png')}
          />

          <Text style={styles.heading}>Biometric{'\n'}Authentication</Text>
          {/* <ShakingText 
        ref={(ref)=>{setTextRef(ref)}}
        >
          Welcome
        </ShakingText> */}
          <ShakingText
            ref={ref => {
              setDescription(ref);
            }}
            style={styles.description(!!state?.errorMessageLegacy)}>
            {state?.errorMessageLegacy ||
              `Scan your ${state?.biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props?.handlePopupDismissedLegacy}>
            <Text style={styles.buttonText}>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // useEffect(() => {
  //   if (requiresLegacyAuthentication()) {
  //     console.log('auth');
  //     authLegacy();
  //   } else {
  //     console.log('current');

  //     authCurrent();
  //   }
  //   return()=>{
  //     FingerprintScanner.release();
  //   }
  // }, [])

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.themeColorLight}
        barStyle={'light-content'}
      />
      {/* <Header leftIcon={'arrowleft'} rightIcon={'dots-vertical'} /> */}

      <View style={styles.cont}>
        <CustomText
          isBold
          style={{
            marginTop: windowHeight * 0.1,
            textAlign: 'center',
            fontSize: moderateScale(33, 0.3),
          }}>
          Welcome!
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
          Log in to your Approvedocx
        </CustomText>
        <TextInputWithTitle
          iconName="user-o"
          iconType={FontAwesome}
          titleText={'User Name'}
          secureText={false}
          placeholder={'User Name'}
          setText={setUserName}
          value={userName}
          viewHeight={0.07}
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
          iconName="key-outline"
          iconType={Ionicons}
          titleText={'Password'}
          secureText={true}
          placeholder={'Password'}
          setText={setUserName}
          value={userName}
          viewHeight={0.07}
          viewWidth={0.7}
          inputWidth={0.65}
          borderBottomWidth={2}
          borderColor={Color.secondaryColor}
          backgroundColor={'transparent'}
          marginTop={moderateScale(40, 0.3)}
          color={Color.themeColorLight}
          placeholderColor={Color.themeLightGray}
          // borderRadius={moderateScale(10, 0.3)}
        />
        <CustomText
          onPress={() => {
            navigationService.navigate('EnterPhone');
          }}
          style={{
            width: windowWidth * 0.7,
            textAlign: 'right',
            fontSize: moderateScale(11, 0.3),
            marginTop: moderateScale(5, 0.3),
          }}>
          Forgot password
        </CustomText>
        <CustomButton
          // textTransform={"capitalize"}
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'LOG IN'
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.7}
          height={windowHeight * 0.06}
          marginTop={moderateScale(40, 0.3)}
          onPress={()=>{
            dispatch(setUserToken({token : 'xydfadfsdfaefae faef aefaef'}))
          }}
          bgColor={Color.themeColorLight}
          borderColor={Color.white}
          borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
          textTransform={'uppercase'}
        />
        <CustomText
          style={{
            width: windowWidth * 0.7,
            textAlign: 'center',
            fontSize: moderateScale(11, 0.3),
            marginTop: moderateScale(25, 0.3),
          }}>
          Dont have an account ?
        </CustomText>
        <CustomText
          isBold
          onPress={() => {
            navigationService.navigate('Signup');
          }}
          style={{
            width: windowWidth * 0.7,
            textAlign: 'center',
            fontSize: moderateScale(14, 0.3),
            marginTop: moderateScale(5, 0.3),
            color: Color.themeColorLight,
          }}>
          Sign up
        </CustomText>
        <View style={styles.square}>
          <CustomImage
            onPress={() => {
              if (requiresLegacyAuthentication()) {
                console.log('auth');
                authLegacy();
              } else {
                console.log('current');

                authCurrent();
              }
            }}
            source={require('../Assets/Images/finger.png')}
            // resizeMode={'stretch'}
            style={
              {
                // borderWidth : 1 ,
                // borderColor : 'red'
                // width : 40,
                // height : 50
              }
            }
          />
        </View>
        <CustomText
          style={{
            width: windowWidth * 0.4,
            textAlign: 'center',
            fontSize: moderateScale(10, 0.3),
            marginTop: moderateScale(10, 0.3),
          }}>
          login in with your device fingerprint scanner
        </CustomText>
       
      </View>
    </>
  );
};

LoginScreen.propTypes = {
  // onAuthenticate: PropTypes.func.isRequired,
  handlePopupDismissedLegacy: PropTypes.func,
};
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  square: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.11,
    borderRadius: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColorLight,
    marginTop: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: windowWidth * 0.8,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 164, 222, 0.9)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    marginVertical: 45,
  },
  heading: {
    textAlign: 'center',
    color: '#00a4de',
    fontSize: 21,
  },
  description: error => ({
    textAlign: 'center',
    color: error ? '#ea3d13' : '#a5a5a5'})
  })

  export default LoginScreen;