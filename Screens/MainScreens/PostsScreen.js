import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { Header } from "../../components/Header/Header";
import { db } from "../../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";

const selectUserProfile = (state) => state.auth;

const PostsScreen = ({ route, item, navigation, navigateFrom }) => {
  const [posts, setPosts] = useState([]);

  const { userName, userEmail, userAvatar } = useSelector(selectUserProfile);

  const getPosts = () => {
    onSnapshot(collection(db, "posts"), (collection) => {
      setPosts(collection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <>
      <Header title="Публікації" />
      <View style={styles.container}>
        <View style={styles.userData}>
          <View style={styles.userPhoto}>
            <Image source={{ uri: userAvatar }} style={styles.userAva} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userLogin}>{userName}</Text>
            <Text style={styles.userMail}>{userEmail}</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.photoUrl }} style={styles.photoWrap} />
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
                      navigateFrom: navigateFrom,
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
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: "4%",
    paddingVertical: "7%",
    backgroundColor: "#FFF",
  },
  userData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userPhoto: {
    display: "flex",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginRight: 8,
  },
  userLogin: {
    fontSize: 13,
    fontWeight: "700",
  },
  userMail: {
    fontSize: 11,
    color: "#BDBDBD",
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

export default PostsScreen;
