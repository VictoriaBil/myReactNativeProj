import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components/Header/Header";

const CommentsScreen = () => {
  return (
    <>
      <Header title="Коментарі" />
      <View style={styles.container}>
        <Text>CommentsScreen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
