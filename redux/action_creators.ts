import { setCookie, deleteCookie } from "cookies-next";

// import { getAllCompaniesFromAPI } from "../сouriers/company_сouriers";
// import {
//   // getCurrentUserFromAPI,
//   signInUserWithAPI,
// } from "../сouriers/user_сouriers";
import * as types from "./redux_types";

export const toggleSidebar = () => ({ type: types.TOGGLE_SIDEBAR });

export const setUser = (user: any) => ({ type: types.SET_USER, payload: user });

export const someAction = ({ email, password, goodCallback, badCallback }) => {
  return async (dispatch: any) => {
    // const current_user = await signInUserWithAPI({ email, password });
    // console.log("current_user", current_user);
    // if (!current_user?.session_token) {
    //   badCallback();
    // } else {
    //   // cookieCutter.set("phantom_keystone_session", current_user.session_token);
    //   setCookie("phantom_keystone_session", current_user.session_token);
    //   await dispatch(setUser(current_user));
    //   goodCallback();
    // }
  };
};
