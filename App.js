import React from "react";
import { useRoute } from "./router/router";
// import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const routing = useRoute({});

  return (
    // <RootSiblingParent>
    <NavigationContainer>{routing}</NavigationContainer>
    // </RootSiblingParent>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
