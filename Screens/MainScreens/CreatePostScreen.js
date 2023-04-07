import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { Camera } from "expo-camera";
import { Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const initialFormState = {
  name: "",
  locationDescription: "",
};

const initialFocusState = {
  name: false,
  locationDescription: false,
};

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [formState, setFormState] = useState(initialFormState);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    async () => {};
  }, [photo]);

  const takePicture = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    console.log(uri);
    const location = await Location.getCurrentPositionAsync();
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const sendPicture = () => {
    navigation.navigate("Posts", { photo });
  };

  const handleFocus = (inputName) => {
    setIsKeyboardShow(true),
      setOnFocus((prevState) => ({ ...prevState, [inputName]: true }));
  };

  const outFocus = (inputName) => {
    setOnFocus((prevState) => ({ ...prevState, [inputName]: false }));
    setIsKeyboardShow(false);
  };

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
        <View style={styles.wrap}>
          <Header title="Створити публікацію" />
          <ScrollView>
            <View style={styles.screenContainer}>
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

              {!photo && <Text style={styles.photoText}>Завантажити фото</Text>}
              {photo && <Text style={styles.photoText}>Редагувати фото</Text>}

              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={styles.createInput}
                  placeholder="Назва..."
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => handleFocus("name")}
                  onEndEditing={() => outFocus("name")}
                  value={formState.name}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                />
                <View style={styles.createLocationWrap}>
                  <TextInput
                    style={{
                      ...styles.createInput,
                      paddingLeft: 28,
                    }}
                    placeholder="Місцевість..."
                    placeholderTextColor={"#BDBDBD"}
                    onFocus={() => handleFocus("locationDescription")}
                    onEndEditing={() => outFocus("locationDescription")}
                    value={formState.locationDescription}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        locationDescription: value,
                      }))
                    }
                  />
                  <EvilIcons
                    style={styles.createInputIcon}
                    name="location"
                    size={25}
                    color="#BDBDBD"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={() => sendPicture()}
              >
                <Text style={styles.btnText}>Опублікувати</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.trashWrap}>
            {!isKeyboardShow && (
              <TouchableOpacity
                style={styles.trashBtn}
                onPress={() => {
                  setPhoto(null);
                }}
              >
                <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#FFF",
    height: "100%",
    display: "flex",
    paddingBottom: 8,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
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
  photoText: {
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 32,
  },
  createInput: {
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 15,
    marginBottom: 16,
    borderBottomColor: "#BDBDBD",
  },
  createLocationWrap: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  createInputIcon: {
    position: "absolute",
    height: 25,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 32,
  },
  btnText: {
    padding: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  trashWrap: {
    position: "absolute",
    bottom: 34,
    alignSelf: "center",
    marginBottom: -20,
  },
  trashBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostScreen;
