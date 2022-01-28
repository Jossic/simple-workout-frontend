import {
  END_LOADING,
  START_LOADING,
  AUTHENTICATE,
  SET_TRY_LOGIN,
  FETCH_REFRESH_TOKEN,
  LOGOUT,
} from '../actions/authActions';

export interface Auth {
  auth: {
    userId: string;
    token: string;
    didTryAutoLogin: boolean;
  };
}

const initialState = {
  userId: null,
  token: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loadingNotes: true,
      };
    case END_LOADING:
      return {
        ...state,
        loadingNotes: false,
      };
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
      };
    case SET_TRY_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case FETCH_REFRESH_TOKEN:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
      };
    default:
      return state;
  }
};
