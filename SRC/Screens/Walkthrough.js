import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {ImageBackground} from 'react-native';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { setWalkThrough } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const Walkthrough = () => {
  const dispatch = useDispatch();
  const [flatListRef, setFlatListRef] = useState();
  const [index1 , setIndex] = useState(0)
  console.log("🚀 ~ file: Walkthrough.js:14 ~ Walkthrough ~ index", index1)
  const walkThroughArray = [
    {
      beforeHightLightText: 'Create, manage and ',
      highlightedText: 'e-sign docs',
      afterHightLightText: ' with ease',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt sapien eget tortor elementum mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vestibulum turpis ut eleifend ornare. Vestibulum eu varius turpis. Vestibulum malesuada eros sit amet arcu sodales tincidunt id sed dui. Donec mi turpis, cursus et libero non, porttitor ultrices elit. Morbi lorem ante, maximus sed metus eu, ullamcorper imperdiet velit.',
      btnLeftText: 'Skip',
      leftPress: () => {
      dispatch(setWalkThrough(true))
      },
      btnRightText: 'Next',
      RightPress: () => {
        flatListRef.scrollToIndex({index: 1});
      },
    },
    {
      beforeHightLightText: 'We have extensive Experience in  ',
      highlightedText: 'Marketing',
      afterHightLightText: ' ',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt sapien eget tortor elementum mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vestibulum turpis ut eleifend ornare. Vestibulum eu varius turpis. Vestibulum malesuada eros sit amet arcu sodales tincidunt id sed dui. Donec mi turpis, cursus et libero non, porttitor ultrices elit. Morbi lorem ante, maximus sed metus eu, ullamcorper imperdiet velit.',
      btnLeftText: 'Prev',
      leftPress: () => {
        flatListRef.scrollToIndex({index: 0});
      },
      btnRightText: 'Next',
      RightPress: () => {
        flatListRef.scrollToIndex({index: 2});
      },
    },
    {
      beforeHightLightText: 'Hear what our ',
      highlightedText: 'amazing',
      afterHightLightText: ' customers say',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt sapien eget tortor elementum mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vestibulum turpis ut eleifend ornare. Vestibulum eu varius turpis. Vestibulum malesuada eros sit amet arcu sodales tincidunt id sed dui. Donec mi turpis, cursus et libero non, porttitor ultrices elit. Morbi lorem ante, maximus sed metus eu, ullamcorper imperdiet velit.',
      btnLeftText: 'Prev',
      leftPress: () => {
        flatListRef.scrollToIndex({index: 1});
      },
      btnRightText: 'Done',
      RightPress: () => {
        dispatch(setWalkThrough(true))
      },
    },
  ];
  const onViewableItemsChanged = ({
    viewableItems,
  }) => {
    console.log("🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems", viewableItems[0]?.index)
    setIndex(viewableItems[0]?.index);
    // Do stuff
  };
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.themeBgColor}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <CustomImage
          source={require('../Assets/Images/bgc.png')}
          resizeMode={'stretch'}
          style={{
            // alignSelf : 'flex-start',
            width: windowWidth,
            height: windowHeight * 0.6,
            marginBottom: moderateScale(10, 0.3),
            // , backgroundColor : 'red'
          }}
        />
        <ImageBackground
          source={require('../Assets/Images/cardContainer.png')}
          // resizeMode={'stretch'}
          style={[{
            position: 'absolute',
            width: windowWidth * 0.9,
            height: windowHeight * 0.8,
           top: windowHeight * 0.08,
          
          },styles.elevation]}
          >
          <FlatList
            ref={ref => {
              setFlatListRef(ref);
            }}
            showsHorizontalScrollIndicator={false}
         
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            data={walkThroughArray}
            pagingEnabled={true}
            horizontal
            style={{
              height: '100%',
            }}
          
            renderItem={({item, index}) => {
             
              return (
                <View style={[styles.container1]}>
                  <CustomText
                    isBold
                    style={{
                      width: windowWidth * 0.6,
                      textAlign: 'center',
                      fontSize: moderateScale(18, 0.3),
                      marginTop : windowHeight * 0.1
                    }}>
                    {item?.beforeHightLightText}
                    {
                      <CustomText
                        isBold
                        style={{
                          color: Color.themeColor,
                          textDecorationLine: 'line-through',
                        }}>
                        {item?.highlightedText}
                      </CustomText>
                    }
                    {
                      <CustomText isBold>
                        {item?.afterHightLightText}
                      </CustomText>
                    }
                  </CustomText>
                  <CustomText
                    style={{
                      width: windowWidth * 0.7,
                      textAlign: 'center',
                      fontSize: moderateScale(11, 0.3),
                      marginTop : windowHeight * 0.05,
                      color : '#333333',
                      lineHeight : moderateScale(20,0.3),
                      // backgroundColor : 'red',
                      // height : windowHeight * 0.4
                    }}
                  >{item?.text}</CustomText>
                  <View style={styles.absolute}>
                    <CustomText onPress={()=>{
                      item?.leftPress()
                    }} style={styles.btnText}>{item?.btnLeftText}</CustomText>
                    <CustomText  onPress={()=>{
                      item?.RightPress()
                    }} style={[styles.btnText,{color : Color.white}]} >{item?.btnRightText}</CustomText>

                  </View>
                </View>
              );
            }}
          />
        </ImageBackground>
        <View style={{flexDirection : 'row' , alignItems : 'center' , position : 'absolute' , bottom : moderateScale(20,0.3) }}>

        {walkThroughArray.map((x , index)=>{
          return(
            <View style={{
              width : index1 == index ? moderateScale(12,0.3) : moderateScale(10,0.3),
              height : index1 == index ? moderateScale(12,0.3) : moderateScale(10,0.3),
              borderRadius : index1 == index ? moderateScale(6,0.3) : moderateScale(5,0.3),
              backgroundColor : index1 == index ? Color.themeColor : Color.themeLightGray,
              marginRight : moderateScale(4,0.3),

              
            }}></View>
            )
          })}
          </View>
      </View>
    </>
  );
};

export default Walkthrough;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    // justifyContent :  'center',
    alignItems: 'center',
  },
  container1: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    // zIndex : 1
  },
  absolute: { 
    position : 'absolute',
    bottom : moderateScale(40,0.3),
    width : '100%',
    paddingHorizontal : moderateScale(20,0.3),
    flexDirection : 'row',
    justifyContent : 'space-between',
    // backgroundColor : 'red'

  },
  btnText : {
    fontSize : moderateScale(20,.3),
  },
  elevation : { 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    
    elevation: 10,
  },
});
