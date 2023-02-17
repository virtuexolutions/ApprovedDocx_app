import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {FlatList} from 'react-native';
import CustomImage from './CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import CustomText from './CustomText';

const ViewImage = ({imagesArray, setIsVisible, visible, renderIndex}) => {
//   console.log(
//     '🚀 ~ file: ViewImage.js:17 ~ ViewImage ~ renderIndex',
//     renderIndex,
//   );
  const [flatListRef, setFlatListRef] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
//   console.log(
//     '🚀 ~ file: ViewImage.js:18 ~ ViewImage ~ selectedIndex',
//     selectedIndex,
//   );

  const onViewableItemsChanged = ({viewableItems}) => {
    // console.log(
    //   '🚀 ~ file: Walkthrough.js:62 ~ Walkthrough ~ viewableItems',
    //   viewableItems[0],
    // );
    setSelectedIndex(viewableItems[0]?.index);
    // Do stuff
  };
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

//   useEffect(() => {
//     console.log(flatListRef);
//     if (flatListRef != null) {
//         flatListRef.scrollToIndex({index: 1});
//     }
//   }, [flatListRef]);

  return (
    <Modal
      isVisible={visible}
      // backdropOpacity={1}
      onSwipeCancel={() => {
        setIsVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Icon
              name={'chevron-thin-left'}
              as={Entypo}
              size={moderateScale(20, 0.3)}
              color={Color.white}
              onPress={() => {
                setIsVisible(false);
              }}
            />
            <CustomText style={{color: Color.white}}>{`${selectedIndex + 1} / ${
              imagesArray?.length
            }`}</CustomText>
          </View>

          <Icon
            name={'dots-three-vertical'}
            as={Entypo}
            size={moderateScale(20, 0.3)}
            color={Color.white}
            onPress={() => {
              //   setIsVisible(false)
            
            }}
          />
        </View>
        <FlatList
         ref={ref => {
            setFlatListRef(ref);
          }}
          data={imagesArray}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          style={{
            height: windowHeight,
            // backgroundColor : Color.red
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          renderItem={({item, index}) => {
            return (
              <CustomImage
                source={item}
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.5,
                  backgroundColor: 'green',
                }}
              />
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.black,
  },
  containerHeader: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    alignItems: 'center',
    // marginTop : moderateScale(20,0.3),
    paddingTop: moderateScale(20, 0.3),
  },
});
