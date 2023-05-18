import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

export const Header = ({ title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {title === "Публікації" && (
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => dispatch(authSignOutUser())}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      )}
      {title !== "Публікації" && (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("Posts")}
        >
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
      )}
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
  backBtn: { position: "absolute", left: 10, bottom: "25%" },
});
