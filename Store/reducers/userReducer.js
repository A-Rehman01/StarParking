import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../types';

export const userLoginReducers = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};
