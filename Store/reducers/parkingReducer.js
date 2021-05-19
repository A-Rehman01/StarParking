import {
  USER_DISPLAY_PARKINGS_FAIL,
  USER_DISPLAY_PARKINGS_REQUEST,
  USER_DISPLAY_PARKINGS_SUCCESS,
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
