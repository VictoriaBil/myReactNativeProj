import React, { useState, useEffect } from "react";
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

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

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
            <Image />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userLogin}>Teddy Bear</Text>
            <Text style={styles.userMail}>exs@mail.com</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.photo }} style={styles.photoWrap} />
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
                    navigation.navigate("Comments");
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
                    navigation.navigate("Map", { item });
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
});

export default PostsScreen;
