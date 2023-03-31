import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components/Header/Header";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Публікації" />
      <Text>PostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostsScreen;
