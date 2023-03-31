import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.logOutBtn} onPress={() => {}}>
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    paddingTop: "13%",
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    paddingBottom: "2%",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  logOutBtn: {
    position: "absolute",
    right: 10,
    bottom: "25%",
  },
});
