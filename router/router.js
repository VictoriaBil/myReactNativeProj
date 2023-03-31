import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { RegistrationScreen } from "../Screens/Auth/RegistrationScreen";
import { LoginScreen } from "../Screens/Auth/LoginScreen";

import PostScreen from "../Screens/MainScreens/PostsScreen";
import ProfileScreen from "../Screens/MainScreens/ProfileScreen";
import CreatePostScreen from "../Screens/MainScreens/CreatePostScreen";

const MainTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
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
        name="Post"
        component={PostScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};
