import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../axios-instance';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_TRY_LOGIN = 'SET_TRY_LOGIN';
export const FETCH_REFRESH_TOKEN = 'FETCH_REFRESH_TOKEN';
import { Auth } from 'aws-amplify';

export const signup = (username: string, email: string, password: string) => {
  return async (dispatch) => {
    try {
      console.log(`username =>`, username);
      console.log(`email =>`, email);
      console.log(`password =>`, password);
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(`user =>`, user);

      //   saveDateToStorage(response.data.idToken, response.data.refreshToken);

      dispatch({
        type: AUTHENTICATE,
        userId: user.userSub,
        token: 'jodsjbfojsdngfh',
      });
    } catch (error) {
      console.log('error signing up:', error.message);
      switch (error.message) {
        case 'Username should be either an email or a phone number.':
          throw new Error('Merci de renseigner un mail');
        case 'Password did not conform with policy: Password not long enough':
          throw new Error('Le mot de passe nest pas assez long');
        case 'User is not confirmed.':
          throw new Error(error);
        case 'Incorrect username or password.':
          throw new Error(error);
        case 'User does not exist.':
          throw new Error(error);
        default:
          throw new Error(error);
      }
      throw new Error(error);
    }
  };
};
export const signin = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await Auth.signIn({
        username: 'jossic',
        password,
        attributes: {
          email,
        },
      });
      console.log(`user =>`, user);
      // saveDateToStorage(
      // 	response.data.idToken,
      // 	response.data.refreshToken
      // );

      // dispatch({
      // 	type: AUTHENTICATE,
      // 	userId: response.data.localId,
      // 	token: response.data.idToken,
      // });
    } catch (error) {
      console.log('error signing in', error);
      throw new Error(error);
    }
  };
};
export const setDidTry = () => {
  return {
    type: SET_TRY_LOGIN,
  };
};
// export const fetchRefreshToken = (refreshToken) => {
// 	return async (dispatch) => {
// 		await axios
// 			.post(
// 				`https://securetoken.googleapis.com/v1/token?key=${Keys.firebase}`,
// 				{
// 					refreshToken,
// 					grantType: 'refresh_token',
// 				}
// 			)
// 			.then((response) => {
// 				dispatch({
// 					type: FETCH_REFRESH_TOKEN,
// 					token: response.data.id_token,
// 					refreshToken: response.data.refresh_token,
// 					userId: response.data.user_id,
// 				});
// 				saveDateToStorage(
// 					response.data.id_token,
// 					response.data.refresh_token
// 				);
// 			})
// 			.catch((error) => {
// 				console.log(
// 					`catch fetchRefreshToken error =>`,
// 					error.response.data.error
// 				);
// 				// throw new Error(error.response.data.error.message);
// 			});
// 	};
// };

export const logout = async () => {
  try {
    await Auth.signOut();
    AsyncStorage.removeItem('userData');
    return {
      type: LOGOUT,
    };
  } catch (error) {
    console.log('error signing out: ', error);
  }
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
