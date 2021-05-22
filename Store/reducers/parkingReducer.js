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
  ADMIN_DISPLAY_PARKINGS_FAIL,
  ADMIN_DISPLAY_PARKINGS_REQUEST,
  ADMIN_DISPLAY_PARKINGS_SUCCESS,
  ADMIN_EXCEPT_STATUS_FAIL,
  ADMIN_EXCEPT_STATUS_REQUEST,
  ADMIN_EXCEPT_STATUS_SUCCESS,
  ADMIN_CREATE_PARKING_FAIL,
  ADMIN_CREATE_PARKING_REQUEST,
  ADMIN_CREATE_PARKING_SUCCESS,
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
        success: payload,
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

export const adminSideParkingsReducer = (
  state = {Adminparkings: []},
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case ADMIN_DISPLAY_PARKINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DISPLAY_PARKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        Adminparkings: payload,
        error: null,
      };
    case ADMIN_DISPLAY_PARKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const adminStatusAcceptReducer = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADMIN_EXCEPT_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_EXCEPT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
        error: null,
      };
    case ADMIN_EXCEPT_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const adminCreateParkingReducer = (state = {}, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADMIN_CREATE_PARKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_CREATE_PARKING_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
        error: null,
      };
    case ADMIN_CREATE_PARKING_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
