import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { seEffect, useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Card = ({ navigation, data }) => {
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => {
        navigation.navigate("details", {
          uri: data.uri,
          title: data.title,
          description: data.description,
        });
      }}
    >
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: data.uri }}
      />
      <View style={{ width: wp("60%"), marginLeft: wp("2%") }}>
        <Text style={styles.title}>{data.title}</Text>
        <Text numberOfLines={4} style={styles.description}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Gallery = ({ navigation }) => {
  const [savedImageData, setSavedImageData] = useState([]);
  useEffect(() => {
    // Fetch stored imageData from AsyncStorage
    const fetchImageDataAsync = async () => {
      try {
        // Retrieve imageData from AsyncStorage
        const storedImageData = await AsyncStorage.getItem("imageData");
        console.log(storedImageData);

        // Parse the retrieved data (or initialize as an empty array)
        const imageDataArray = storedImageData
          ? JSON.parse(storedImageData)
          : [];

        // Update the state with the retrieved data
        setSavedImageData(imageDataArray);
      } catch (error) {
        console.error("Error fetching image data from AsyncStorage:", error);
      }
    };

    fetchImageDataAsync();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header text={"Gallery"} navigation={navigation} />
      {savedImageData.length > 0 ? (
        <View style={{ marginBottom: hp("10%") }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={savedImageData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card data={item} navigation={navigation} />
            )}
          />
        </View>
      ) : (
        <Text
          style={{
            alignSelf: "center",
            top: hp("45%"),
            fontSize: 30,
            color: "#2F3D7E",
            fontWeight: "700",
          }}
        >
          No saved images yet.
        </Text>
      )}
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 30,
  },
  cardWrapper: {
    flexDirection: "row",
    width: wp("92%"),
    height: hp("17%"),
    backgroundColor: "#FAEAEB",
    borderRadius: 15,
    alignSelf: "center",
    elevation: 3,
    shadowOpacity: 0.8,
    shadowRadius: 7,
    marginTop: hp("2%"),
  },
  image: {
    width: wp("34%"),
    height: hp("17%"),
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    color: "#2F3D7E",
    alignSelf: "flex-start",
    marginBottom: hp(".7%"),
    fontWeight: "bold",
    marginTop: hp("1%"),
  },
  description: {
    fontSize: 15,
    textAlign: "left",
    lineHeight: 20,
    color: "#646464",
    marginRight: wp("5%"),
  },
});
