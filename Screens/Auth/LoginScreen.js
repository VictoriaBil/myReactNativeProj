import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";

const initialFormState = {
  email: "",
  password: "",
};

const initialFocusState = {
  email: false,
  password: false,
};

export const LoginScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  const handleFocus = (inputName) => {
    setIsKeyboardShow(true),
      setOnFocus((prevState) => ({ ...prevState, [inputName]: true }));
  };

  const outFocus = (inputName) => {
    setOnFocus((prevState) => ({ ...prevState, [inputName]: false }));
    setIsKeyboardShow(false);
  };

  const handleSubmit = () => {
    console.log(formState);
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/bgImage.jpg")}
      >
        <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              onPress={keyboardHide}
              style={{
                ...styles.logWrapper,
                paddingBottom: isKeyboardShow ? 32 : 144,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: onFocus.email ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  onFocus={() => handleFocus("email")}
                  onEndEditing={() => outFocus("email")}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
                <View style={styles.passwordWrap}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: onFocus.password ? "#FF6C00" : "#E8E8E8",
                    }}
                    secureTextEntry={isPasswordHidden}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    onFocus={() => handleFocus("password")}
                    onEndEditing={() => outFocus("password")}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.showBtn}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.showBtnText}>
                      {isPasswordHidden ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {!isKeyboardShow && (
                <View>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.btnText}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.linkText}>
                      Немає акаунта? Зареєструватись
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    height: 50,
    width: "100%",
    borderColor: "#e8e8e8",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
  },
  inputWrap: {
    gap: 16,
  },
  passwordWrap: {
    position: "relative",
    marginTop: 16,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  logWrapper: {
    position: "relative",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  showBtn: {
    position: "absolute",
    display: "flex",
    right: 16,
    bottom: 0,
    height: "100%",
    fontSize: 16,
    color: "#fff",
    justifyContent: "center",
  },
  showBtnText: {
    fontSize: 16,
    color: "#1B4371",
  },
  btn: {
    marginTop: 43,
    backgroundColor: "#FF6C00",
    borderRadius: 32,
  },
  btnText: {
    padding: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  linkText: {
    padding: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
