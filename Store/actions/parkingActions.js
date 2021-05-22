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
    // console.log(data.data);
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
      payload: data.success,
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

//myParkings
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

//adminsideparkings
export const adminSideParkingsAtion = () => async dispatch => {
  try {
    dispatch({
      type: ADMIN_DISPLAY_PARKINGS_REQUEST,
    });
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.get(`${REACT_APP_HEROKU}/api/parkings`, config);
    // console.log(data.data);
    dispatch({
      type: ADMIN_DISPLAY_PARKINGS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log({error});
    dispatch({
      type: ADMIN_DISPLAY_PARKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//StatusVerify
export const adminStatusAcceptAtion = (status, id) => async dispatch => {
  console.log({status});
  try {
    dispatch({
      type: ADMIN_EXCEPT_STATUS_REQUEST,
    });
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if (status === 'active') {
      const {data} = await axios.post(
        `${REACT_APP_HEROKU}/api/parkings/accept/${id}`,
        {},
        config,
      );
      dispatch({
        type: ADMIN_EXCEPT_STATUS_SUCCESS,
        payload: data.success,
      });
    }
    if (status === 'cancel') {
      const {data} = await axios.post(
        `${REACT_APP_HEROKU}/api/parkings/cancel/${id}`,
        {},
        config,
      );
      dispatch({
        type: ADMIN_EXCEPT_STATUS_SUCCESS,
        payload: data.success,
      });
    }
  } catch (error) {
    // console.log({error});
    dispatch({
      type: ADMIN_EXCEPT_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//AdminCreateParking
export const adminCreateParkingAtion = Parkingdata => async dispatch => {
  try {
    dispatch({
      type: ADMIN_CREATE_PARKING_REQUEST,
    });
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.post(
      `${REACT_APP_HEROKU}/api/parkings/create`,
      Parkingdata,
      config,
    );
    dispatch({
      type: ADMIN_CREATE_PARKING_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    );
    dispatch({
      type: ADMIN_CREATE_PARKING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
