import {
  USER_DISPLAY_PARKINGS_FAIL,
  USER_DISPLAY_PARKINGS_REQUEST,
  USER_DISPLAY_PARKINGS_SUCCESS,
  USER_CREATE_PARKINGS_FAIL,
  USER_CREATE_PARKINGS_REQUEST,
  USER_CREATE_PARKINGS_SUCCESS,
  USER_MY_PARKINGS_FAIL,
  USER_MY_PARKINGS_REQUEST,
  USER_MY_PARKINGS_SUCCESS,
} from '../types';

export const userSideParkingsReducer = (state = {parkings: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_DISPLAY_PARKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DISPLAY_PARKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        parkings: payload,
        error: null,
      };
    case USER_DISPLAY_PARKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userCreateParkingsReducer = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_CREATE_PARKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_CREATE_PARKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case USER_CREATE_PARKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userMyParkingsReducer = (state = {parkings: []}, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_MY_PARKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_MY_PARKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        parkings: payload,
        error: null,
      };
    case USER_MY_PARKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
