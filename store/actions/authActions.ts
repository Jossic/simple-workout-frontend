import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { Dispatch } from 'redux';

import env from '../../env';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_TRY_LOGIN = 'SET_TRY_LOGIN';
export const FETCH_REFRESH_TOKEN = 'FETCH_REFRESH_TOKEN';

export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.firebase}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        saveDateToStorage(response.data.idToken, response.data.refreshToken);

        dispatch({
          type: AUTHENTICATE,
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        console.log(`catch signup error =>`, error.response.data.error);
        throw new Error(error.response.data.error.message);
      });
  };
};

export const signupGoogle = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.firebase}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        saveDateToStorage(response.data.idToken, response.data.refreshToken);

        dispatch({
          type: AUTHENTICATE,
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        console.log(`catch signup error =>`, error.response.data.error);
        throw new Error(error.response.data.error.message);
      });
  };
};

export const signin = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.firebase}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        saveDateToStorage(response.data.idToken, response.data.refreshToken);
        console.log(`signin =>`);
        dispatch({
          type: AUTHENTICATE,
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        console.log(`catch signin error =>`, error.response.data.error);
        throw new Error(error.response.data.error.message);
      });
  };
};

export const signinGoogle = () => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${env.firebase}`,
        {
          requestUri: 'http://127.0.0.1:19000/',
          postBody:
            'id_token=919370685993-ntup1fltq6ar28largad5jpvcd1f4bni.apps.googleusercontent.com&providerId=google.com',
          returnSecureToken: true,
          returnIdpCredential: true,
        }
      )
      .then((response) => {
        saveDateToStorage(response.data.idToken, response.data.refreshToken);
        console.log(`signin =>`);
        dispatch({
          type: AUTHENTICATE,
          userId: response.data.localId,
          token: response.data.idToken,
        });
      })
      .catch((error) => {
        console.log(`catch signin error =>`, error.response.data.error);
        throw new Error(error.response.data.error.message);
      });
  };
};

export const setDidTry = () => {
  return {
    type: SET_TRY_LOGIN,
  };
};
export const fetchRefreshToken = (refreshToken) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(`https://securetoken.googleapis.com/v1/token?key=${env.firebase}`, {
        refreshToken,
        grantType: 'refresh_token',
      })
      .then((response) => {
        dispatch({
          type: FETCH_REFRESH_TOKEN,
          token: response.data.id_token,
          refreshToken: response.data.refresh_token,
          userId: response.data.user_id,
        });
        saveDateToStorage(response.data.id_token, response.data.refresh_token);
      })
      .catch((error) => {
        console.log(
          `catch fetchRefreshToken error =>`,
          error.response.data.error
        );
        // throw new Error(error.response.data.error.message);
      });
  };
};

export const logout = async () => {
  AsyncStorage.removeItem('userData');
  return async (dispatch: Dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

const saveDateToStorage = (token, refreshToken) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      refreshToken,
    })
  );
};
