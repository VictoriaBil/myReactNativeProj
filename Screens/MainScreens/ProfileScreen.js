import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/bgImage.jpg")}
    >
      <View style={styles.profileWrapper}>
        <View style={styles.photoWrap}>
          <Image />
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 16, top: 22 }}
          onPress={() => dispatch(authSignOutUser())}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.title}>Teddy Bear</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  photoWrap: {
    position: "absolute",
    display: "flex",
    top: -60,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  profileWrapper: {
    position: "relative",
    alignItems: "stretch",
    paddingHorizontal: "4%",
    paddingTop: "20%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: "80%",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
  },
});

export default ProfileScreen;
