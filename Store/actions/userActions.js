import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_HEROKU} from '../../config';

//Login
export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(
      `${REACT_APP_HEROKU}/api/users/login`,
      {email, password},
      config,
    );
    // console.log({data});
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log({error});
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Logout
export const logout = () => async dispatch => {
  //   localStorage.removeItem('userInfo');
  await AsyncStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });
};

//Register
export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(
      `${REACT_APP}/api/users`,
      {name, email, password},
      config,
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
