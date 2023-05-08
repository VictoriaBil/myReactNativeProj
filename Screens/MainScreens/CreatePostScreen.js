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
import { useSelector } from "react-redux";
import { db, storage } from "../../firebase/config";
import { collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const initialFormState = {
  name: "",
  locationDescription: "",
  photoUrl: null,
};

const initialFocusState = {
  name: false,
  locationDescription: false,
};

const selectUserProfile = (state) => state.auth;

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [formState, setFormState] = useState(initialFormState);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [latitude, setLatitude] = useState(null);

  const { userId, userName } = useSelector(selectUserProfile);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLatitude(location.coords.latitude);
    })();
  }, []);

  useEffect(() => {
    async () => {};
  }, [photo]);

  const takePicture = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    console.log(uri);
    console.log(location);
    setIsPictureTaken(true);
  };

  const sendPicture = () => {
    uploadPost();
    // uploadPictureToServer();
    navigation.navigate("Posts", { photo });
  };

  const uploadPictureToServer = async () => {
    if (!photo || !location) {
      return;
    }

    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `images/${uniquePostId}`);
    const uploadPhoto = await uploadBytesResumable(storageRef, file);
    const photoRef = await getDownloadURL(uploadPhoto.ref);
    setFormState((prevState) => ({ ...prevState, photoUrl: photoRef }));
    setIsPictureTaken(false);

    return;
  };

  const handleFocus = (inputName) => {
    setIsKeyboardShow(true),
      setOnFocus((prevState) => ({ ...prevState, [inputName]: true }));
  };

  const outFocus = (inputName) => {
    setOnFocus((prevState) => {
      return { ...prevState, [inputName]: false };
    });
    setIsKeyboardShow(false);
  };

  const handleSubmit = async () => {
    const { name, locationDescription, photoUrl } = formState;

    if (!name || !locationDescription || !photoUrl) {
      alert("Please, fill out the form completely");
      return;
    }

    if (!isPictureTaken) {
      alert("Please, take a picture first");
      return;
    }

    try {
      await uploadPost();
      navigation.navigate("Posts");
      setFormState(initialFormState);
    } catch (error) {
      console.log("Error while uploading post: ", error);
      alert("Failed to upload post");
    }

    // uploadPost();
    // navigation.navigate("Posts");
    // setFormState(initialFormState);
  };

  const uploadPost = async () => {
    const photoUrl = await uploadPictureToServer();
    const createPost = db.firestore().collection("posts").add({
      photoUrl,
      name,
      locationDescription,
      latitude,
      longitude,
      userId,
      userName,
      comments: [],
    });
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
                handleSubmit={handleSubmit}
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
