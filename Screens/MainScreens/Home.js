import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "../../Screens/MainScreens/PostsScreen";
import ProfileScreen from "../../Screens/MainScreens/ProfileScreen";
import CreatePostScreen from "../../Screens/MainScreens/CreatePostScreen";

const MainTab = createBottomTabNavigator();

export const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
        tabBarStyle: {
          paddingHorizontal: 25,
          paddingTop: 10,
          paddingBottom: 25,
          height: 70,
        },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
          //   headerRight: ({ color, size }) => (
          //     <TouchableOpacity onPress={() => {}}>
          //       <Ionicons
          //         name="log-out-outline"
          //         size={24}
          //         color={color}
          //         style={{ marginRight: 10 }}
          //       />
          //     </TouchableOpacity>
          //   ),
        }}
        name="Публікації"
        component={PostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
        name="Create"
        component={CreatePostScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};
