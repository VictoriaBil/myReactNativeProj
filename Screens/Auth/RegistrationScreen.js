import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";

const initialFormState = {
  login: "",
  email: "",
  password: "",
};

const initialFocusState = {
  login: false,
  email: false,
  password: false,
};

export const RegistrationScreen = ({ navigation }) => {
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
        source={require("../../assets/bgImage.jpg")}
        style={styles.bgImage}
      >
        <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
          <View
            onPress={keyboardHide}
            style={{
              ...styles.container,
              paddingBottom: isKeyboardShow ? 32 : 78,
            }}
          >
            <View style={styles.imgWrap}>
              <Image />
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.inputLogin}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                name="login"
                onFocus={() => handleFocus("login")}
                onEndEditing={() => outFocus("login")}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    login: value,
                  }))
                }
              />
              <TextInput
                style={styles.input}
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
            </View>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.input}
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
                onPress={() => setIsPasswordHidden((prevState) => !prevState)}
              >
                <Text style={styles.showBtnText}>
                  {isPasswordHidden ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
            </View>
            {!isKeyboardShow && (
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Зареєструватись</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingTop: 92,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  imgWrap: {
    position: "absolute",
    display: "flex",
    top: -60,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },

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
  inputLogin: {
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    height: 50,
    width: "100%",
    borderColor: "#e8e8e8",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
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
