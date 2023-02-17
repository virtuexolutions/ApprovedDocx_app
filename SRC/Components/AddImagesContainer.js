import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ImagePickerModal from './ImagePickerModal'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { FlatList } from 'react-native'
import { Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Color from '../Assets/Utilities/Color'
import CustomImage from './CustomImage'
import { windowHeight, windowWidth } from '../Utillity/utils'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native'
import ViewImage from './ViewImage'
import ImageView from 'react-native-image-viewing'
import CustomText from './CustomText'


const AddImagesContainer = ({multiImages , setMultiImages , style}) => {
    const [showMultiImageModal , setShowMultiImageModal] = useState(false);
    const [selectedIndex , setIndex] = useState(0);
    const [visible , setIsVisible] = useState(false)
  return (
    <View style={styles.imagesContainer}>
        {multiImages?.length > 0 &&
    <FlatList
    // horizontal
    data={multiImages}
    showsHorizontalScrollIndicator={false}
    style={{
        // width : windowWidth * 0.95 ,
        // backgroundColor : Color.white,
        minHeight : windowHeight * 0.7,
      backgroundColor : 'red',
    //   flexGrow : 0
    }}
    renderItem={({item , index}) => {
    
      return(
        <View style={[styles.addImageContainer , style]}>
        <Icon
        name={'close'}
        as={FontAwesome}
        color={Color.themeColor}
        size={moderateScale(12,0.3)}
        style={{
          position : 'absolute',
          right : 1,
          top : 1,
          zIndex : 1
        }}
        onPress={()=>{
          let newArray = [...multiImages];
          newArray.splice(index , 1);
           setMultiImages(newArray);
        }}
        />  
          {/* <CustomImage source={{uri: item.uri}}  /> */}
        <CustomImage
        // source={{uri : item?.uri}}
        source={item}
        resizeMode={'stretch'}
        style={{
            width : windowWidth * 0.2 ,
            height : windowHeight * 0.1,
        }}
        onPress={()=>{
            console.log("🚀 ~ file: AddImagesContainer.js:66 ~ AddImagesContainer ~ index", index)
            setIndex(index)
            setIsVisible(true)
        }}
        />
        
      
      </View>
      )
    }}
    />
}

    {/* <TouchableOpacity style={styles.addImageContainer}>
      <Icon
      name={'plus'}
      as={AntDesign}
      color={Color.themeColorLight}
      size={moderateScale(40,0.3)}
      onPress={()=>{
        setShowMultiImageModal(true);
      }}
    
      />
    </TouchableOpacity> */}
    <ImagePickerModal
          show={showMultiImageModal}
          setShow={setShowMultiImageModal}
          setMultiImages={setMultiImages}
          />
          {/* <ViewImage 
          imagesArray={multiImages}
          renderIndex={selectedIndex}
          setIsVisible={setIsVisible}
          visible={visible}
          /> */}
          <ImageView 
          imageIndex={selectedIndex}
          presentationStyle="overFullScreen"
          images={multiImages}
          visible={visible}
          onRequestClose={()=>{
            setIsVisible(false)
          }}
          onImageIndexChange={(index) => setIndex(index)}
          FooterComponent={() => (
            <View style={{height : 100 , width :windowWidth , backgroundColor : 'red'}}>
                <Text style={styles.text}>{`${selectedIndex + 1}/${multiImages.length}`}</Text>
            </View>
        )}
          />
  </View>
  )
}

export default AddImagesContainer

const styles = ScaledSheet.create({
    addImageContainer : {
        width : windowWidth * 0.33 ,
        backgroundColor : Color.white,
        // borderRadius : moderateScale(5,0.3),
        // borderWidth : 2,
        // borderColor : Color.themeColorLight,
        height : windowHeight * 0.15,
        justifyContent : 'center',
        alignItems : 'center',
        marginRight : moderateScale(10,0.3),
        marginTop : moderateScale(5,0.3),
        shadowColor: Color.themeColor,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
        overflow : 'hidden',
      },
      imagesContainer : {
        // paddingHorizontal : moderateScale(20,0.3),
        // marginTop : moderateScale(10,0.3),
        width : windowWidth ,
        alignSelf : 'center',
        backgroundColor : 'white',
        flexDirection : 'row',
        minHeight : windowHeight * 0.7,
        flexWrap : 'wrap',
    
      },
})