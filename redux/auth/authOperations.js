import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ userName, userEmail, userPassword }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      const { uid, displayName, email } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          stateChange: true,
        })
      );
    } catch (error) {
      return error.message;
    }
  };

export const authSignInUser =
  ({ userEmail, userPassword }) =>
  async (dispatch) => {
    await signInWithEmailAndPassword(auth, userEmail, userPassword);

    try {
    } catch (error) {
      return error.message;
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogout());
  } catch (error) {
    return error.message;
  }
};

export const authStateChangeUser = () => (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = user;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          stateChange: true,
        })
      );
    }
  });
};
