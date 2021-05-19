import {REACT_APP_HEROKU} from '../../config';
import axios from 'axios';
import {
  USER_DISPLAY_PARKINGS_FAIL,
  USER_DISPLAY_PARKINGS_REQUEST,
  USER_DISPLAY_PARKINGS_SUCCESS,
} from '../types';

//getallusersideParkings
export const userSideParkingsAtion = () => async dispatch => {
  try {
    dispatch({
      type: USER_DISPLAY_PARKINGS_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.get(
      `${REACT_APP_HEROKU}/api/parkings/userside`,
      config,
    );
    console.log(data.data);
    dispatch({
      type: USER_DISPLAY_PARKINGS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log({error});
    dispatch({
      type: USER_DISPLAY_PARKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
