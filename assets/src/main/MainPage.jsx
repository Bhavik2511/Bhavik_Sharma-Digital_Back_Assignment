import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UploadImage from '../../components/UploadImage'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainPage = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState('')
  const [imageTitle, setImageTitle] = useState('')
  const [imageDescription, setImageDescription] = useState('')
  const [imageData, setImageData] = useState([])

  const storeImageDataAsync = async (data) => {
    try {
      // Fetch existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem('imageData');

      // Parse the existing data (or initialize as an empty array)
      const existingArray = existingData ? JSON.parse(existingData) : [];

      // Add the new data to the array
      existingArray.push(data);

      // Store the updated array back in AsyncStorage
      await AsyncStorage.setItem('imageData', JSON.stringify(existingArray));
    } catch (error) {
      console.error('Error storing image data in AsyncStorage:', error);
    }
  };



  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result?.assets[0].uri)
    }
    console.log(selectedImage)
  }
  const handleUpload = () => {
    // Create a new image data object
    if (selectImage && imageTitle && imageData) {
      const newImageData = {
        uri: selectedImage,
        title: imageTitle,
        description: imageDescription,
      };

      // Update the state with the new image data
      setImageData([...imageData, newImageData]);

      // Store imageData in AsyncStorage
      storeImageDataAsync(newImageData);

      setSelectedImage('');
      setImageTitle('');
      setImageDescription('');


      navigation.navigate('gallery')
    } else {
      alert('Please Fill all the fields')
    }

  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ paddingTop: hp('10%') }}></View>
      {/* <UploadImage selectImage={selectImage}/> */}
      <TouchableOpacity onPress={selectImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
        ) : (
          <UploadImage selectImage={selectImage} />
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <TextInput
          placeholder="Add title to  your Image"
          style={styles.input}
          onChangeText={(text) => setImageTitle(text)}
          value={imageTitle}
        />
        <View style={{ paddingTop: wp('4%') }}></View>
        <TextInput
          placeholder="Add Description to  your Image"
          style={styles.descriptionInput}
          multiline={true}
          numberOfLines={5}
          maxLength={250}
          onChangeText={(text) => setImageDescription(text)}
          value={imageDescription}
        />
        <View style={{ paddingTop: wp('4%') }}></View>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={{ fontSize: 20, color: '#FAEAEB', letterSpacing: 1 }} >Upload</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default MainPage

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    paddingTop: 30,
    height: hp('100%')
  },
  form: {
    paddingTop: wp('4%'),
  },
  input: {
    backgroundColor: '#FAEAEB',
    borderRadius: wp('2%'),
    width: wp('90%'),
    height: hp('7%'),
    padding: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  descriptionInput: {
    backgroundColor: '#FAEAEB',
    borderRadius: wp('2%'),
    width: wp('90%'),
    height: hp('20%'),
    padding: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: '#2F3D7E',
    borderRadius: wp('2%'),
  },
})
