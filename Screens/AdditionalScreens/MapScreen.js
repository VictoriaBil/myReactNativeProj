import React from "react";
import Header from "../../components/Header/Header";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Карта" />
      <MapView style={{ flex: 1 }}></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
