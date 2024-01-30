import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontAwesome6 } from "@expo/vector-icons";

const Details = ({ navigation, route }) => {
  const { uri, title, description } = route.params;
  return (
    <View
      style={{
        marginBottom: wp("30%"),
        backgroundColor: "#FFFFFF",
        paddingTop: 30,
        height: hp("100%"),
      }}
    >
      <View style={styles.infoWrapper}>
        <Image style={styles.image} source={{ uri: uri }} />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <FontAwesome6
            name="arrow-left-long"
            size={25}
            color="#2F3D7E"
            style={{ padding: 5 }}
          />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 25,
              fontWeight: "700",
              letterSpacing: 0.8,
              color: "#2F3D7E",
              padding: 5,
            }}
          >
            {title}
          </Text>
          <View>
            <Text
              numberOfLines={5}
              style={{
                fontSize: 16,
                fontWeight: "500",
                letterSpacing: 0.5,
                padding: 5,
              }}
            >
              {description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  infoWrapper: {
    alignItems: "center",
    backgroundColor: "#FAEAEB",
  },
  image: {
    width: wp("100%"),
    height: hp("97%"),
    position: "relative",
  },
  textWrapper: {
    position: "absolute",
    justifyContent: "flex-start",
    backgroundColor: "#FAEAEB",
    opacity: 0.7,
    borderRadius: wp("2%"),
    bottom: 10,
    width: wp("95%"),
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "#FAEAEB",
    borderRadius: 20,
    opacity: 0.7,
  },
});
