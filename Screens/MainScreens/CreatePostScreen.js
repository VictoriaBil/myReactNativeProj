import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header } from "../../components/Header/Header";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const takePicture = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
    setPhoto(photo.uri);
  };

  const sendPicture = () => {
    navigation.navigate("Posts", { photo });
  };

  return (
    <View style={styles.container}>
      <Header title="Створити публікацію" />

      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} />
          </View>
        )}
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={() => takePicture()}
        >
          <Feather name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.cameraBtn} onPress={() => sendPicture()}>
        <Feather name="camera" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    display: "flex",
    paddingBottom: 8,
  },
  camera: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 32,
    marginRight: 16,
    marginLeft: 16,
  },
  cameraBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    opacity: 0.3,
    borderRadius: 30,
  },
});

export default CreatePostScreen;
