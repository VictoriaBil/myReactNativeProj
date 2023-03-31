import React from "react";
import { useRoute } from "./router/router";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const routing = useRoute({});
  return <NavigationContainer>{routing}</NavigationContainer>;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
