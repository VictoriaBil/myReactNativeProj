import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";

import Main from "./components/Main";

import { store } from "./redux/store";

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <Main />
      </Provider>
    </RootSiblingParent>
  );
}
