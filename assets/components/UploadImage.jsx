import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import { MaterialIcons } from '@expo/vector-icons';

const UploadImage = ({selectImage}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={selectImage}>
      <MaterialIcons name="add-circle-outline" size={50} color="grey" />
      <Text style={styles.text}>Add Files</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UploadImage

const styles = StyleSheet.create({
  container:{
    borderWidth: 1,
    borderRadius: wp('2%'),
    borderStyle:'dashed',
    width: wp('90%'),
    height: hp('20%'),
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FAEAEB'
  },
  text:{
    fontSize: 25,
    marginLeft: 10,
    color: 'grey',
  },
})