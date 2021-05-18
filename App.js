import React, {useState, useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import Store from './Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {USER_LOGIN_SUCCESS} from './Store/types';

const App = () => {
  const [userInfoFromLocalStorage, setUserInfoFromLocalStorage] =
    useState(null);
  useEffect(() => {
    const getUserInfoFromLocalStorage = async () => {
      try {
        setUserInfoFromLocalStorage(
          (await AsyncStorage.getItem('userInfo'))
            ? JSON.parse(await AsyncStorage.getItem('userInfo'))
            : null,
        );
        console.log({userInfoFromLocalStorage});
      } catch (error) {
        // console.log('==========>', {error});
        setUserInfoFromLocalStorage(null);
        return null;
      }
    };
    getUserInfoFromLocalStorage();

    if (userInfoFromLocalStorage) {
      Alert.alert('userInfoAvailable');
      Store.dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userInfoFromLocalStorage,
      });
    }
  }, []);

  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
