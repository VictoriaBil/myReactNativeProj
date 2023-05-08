import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {} from "react-native";
import { useRoute } from "../router/router";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
