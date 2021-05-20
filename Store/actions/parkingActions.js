import {REACT_APP_HEROKU} from '../../config';
import axios from 'axios';
import {
  USER_DISPLAY_PARKINGS_FAIL,
  USER_DISPLAY_PARKINGS_REQUEST,
  USER_DISPLAY_PARKINGS_SUCCESS,
  USER_CREATE_PARKINGS_FAIL,
  USER_CREATE_PARKINGS_REQUEST,
  USER_CREATE_PARKINGS_SUCCESS,
  USER_MY_PARKINGS_FAIL,
  USER_MY_PARKINGS_SUCCESS,
  USER_MY_PARKINGS_REQUEST,
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

//createuserParkings
export const userCreateParkingsAtion = parkingdata => async dispatch => {
  try {
    dispatch({
      type: USER_CREATE_PARKINGS_REQUEST,
    });
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.post(
      `${REACT_APP_HEROKU}/api/parkings`,
      parkingdata,
      config,
    );
    // console.log(data);
    dispatch({
      type: USER_CREATE_PARKINGS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: USER_CREATE_PARKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//createuserParkings
export const userMyParkingsAtion = parkingdata => async dispatch => {
  try {
    dispatch({
      type: USER_MY_PARKINGS_REQUEST,
    });
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.get(
      `${REACT_APP_HEROKU}/api/parkings/myparking`,
      config,
    );
    // console.log(data);
    dispatch({
      type: USER_MY_PARKINGS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: USER_MY_PARKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
