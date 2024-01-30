import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Header = ({ text, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
        <FontAwesome6 name="arrow-left-long" size={25} color="#2F3D7E" />
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View><Text>{" "}</Text></View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    height: hp('5%'),
    borderBottomWidth: .7,
    borderBottomColor: 'lightgrey'
  },
  text: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#2F3D7E'
  },
})