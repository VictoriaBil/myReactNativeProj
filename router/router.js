import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/Auth/RegistrationScreen";
import { LoginScreen } from "../Screens/Auth/LoginScreen";
import { Home } from "../Screens/MainScreens/Home";

import MapScreen from "../Screens/AdditionalScreens/MapScreen";
import CommentsScreen from "../Screens/AdditionalScreens/CommentsScreen";

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
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
    </AuthStack.Navigator>
  );
};
