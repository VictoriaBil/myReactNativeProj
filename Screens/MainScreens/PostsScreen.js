import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Header } from "../../components/Header/Header";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params.photo]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Header title="Публікації" />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 300, height: 200 }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostsScreen;
