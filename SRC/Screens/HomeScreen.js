import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import AddImagesContainer from '../Components/AddImagesContainer';
import ImagePickerModal from '../Components/ImagePickerModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedItem] = useState(0);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [multiImages, setMultiImages] = useState([
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
      id : 'a',
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
      id : 'b',
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
      id : 'c',
    },
   
  ]);
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.themeColorLight}
        barStyle={'dark-content'}
      />
      <Header
        leftIcon={'bars'}
        leftType={FontAwesome}
        leftPress={() => {
          navigation.toggleDrawer();
        }}
        headerColor={Color.white}
      />
      <View style={styles.upperContainer}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.3),
            color: Color.black,
            width: windowWidth * 0.92,
          }}>
          Categories
        </CustomText>
        <View style={styles.squareContainer}>
          {['photo', 'file-text', 'file-signature'].map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.square,
                  {
                    backgroundColor:
                      index == selectedIndex
                        ? Color.themeColor
                        : Color.themeColorLight,
                  },
                ]}
                onPress={() => {
                  setSelectedItem(index);
                }}>
                <Icon
                  name={item}
                  as={item == 'file-signature' ? FontAwesome5 : FontAwesome}
                  color={Color.white}
                  size={moderateScale(35, 0.3)}
                  style={{
                    width: windowWidth * 0.24,
                    textAlign: 'center',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.92,
            justifyContent: 'space-between',
            marginTop: moderateScale(30, 0.3),
          }}>
          <CustomText
            style={{
              width: windowWidth * 0.6,
              color: Color.black,
              fontSize: moderateScale(15, 0.3),
              // backgroundColor : 'red'
            }}>
            Recent added Files
          </CustomText>
          <CustomButton
            text={'Add'}
            textColor={Color.white}
            width={windowWidth * 0.2}
            height={windowHeight * 0.035}
            // marginTop={moderateScale(10, 0.3)}
            onPress={() => {setShowMultiImageModal(true)}}
            bgColor={Color.themeColorLight}
            borderWidth={0}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(12, 0.3)}
          />
        </View>
      </View>
      <AddImagesContainer
        multiImages={multiImages}
        setMultiImages={setMultiImages}
        numberOfRows={3}
      />
       <ImagePickerModal
        show={showMultiImageModal}
        setShow={setShowMultiImageModal}
        setMultiImages={setMultiImages}
      />
    </>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  upperContainer: {
    backgroundColor: Color.white,
    paddingVertical: moderateScale(20, 0.6),
    width: windowWidth,
    alignItems: 'center',
  },
  squareContainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.92,
    paddingVertical: moderateScale(10, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
  },
  square: {
    width: windowWidth * 0.24,
    height: windowHeight * 0.12,
    borderRadius: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
