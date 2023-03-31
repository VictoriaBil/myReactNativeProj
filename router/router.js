import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    <MainTab.Navigator>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Create"
        component={CreatePostScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Post"
        component={PostScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};
