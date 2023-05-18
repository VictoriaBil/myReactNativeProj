import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

const selectUserProfile = (state) => state.auth;

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { userName, userAvatar, userId } = useSelector(selectUserProfile);

  const getPosts = () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/bgImage.jpg")}
    >
      <ScrollView>
        <View
          style={{
            ...styles.profileWrapper,
            minHeight:
              (Platform.OS == "ios" && "80%") ||
              (Platform.OS == "android" && posts.length < 3 && 800),
          }}
        >
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: userAvatar }}
              style={{ ...styles.avatarWrap, top: 0 }}
            />
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 16, top: 22 }}
            onPress={() => dispatch(authSignOutUser())}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>{userName}</Text>
          {posts.map((item) => {
            return (
              <View key={item.id}>
                <Image
                  source={{ uri: item.photoUrl }}
                  style={styles.photoWrap}
                />
                <Text
                  style={{ fontSize: 16, marginVertical: 8, fontWeight: "500" }}
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 32,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comments", {
                        photoUrl: item.photoUrl,
                        postId: item.id,
                      });
                    }}
                    style={styles.comments}
                  >
                    <Feather name="message-square" size={24} color="#BDBDBD" />
                    <Text
                      style={{ fontSize: 16, color: "#BDBDBD", marginLeft: 6 }}
                    >
                      0
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Map", {
                        latitude: item.latitude,
                        longitude: item.longitude,
                      });
                    }}
                    style={styles.comments}
                  >
                    <EvilIcons name="location" size={28} color="#BDBDBD" />
                    <Text style={{ fontSize: 16, marginLeft: 4 }}>
                      {item.locationDescription}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
  avatarWrap: {
    position: "absolute",
    display: "flex",
    top: -60,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  photoWrap: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  profileWrapper: {
    marginTop: "40%",
    position: "relative",
    alignItems: "stretch",
    paddingHorizontal: "4%",
    paddingTop: "20%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
  },
  comments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userAva: {
    display: "flex",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginRight: 8,
  },
});

export default ProfileScreen;
