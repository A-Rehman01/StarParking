import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {userLoginReducers, userRegisterReducers} from './reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
});

// await AsyncStorage.getItem('@storage_Key');

// const getUserInfoFromLocalStorage = async () => {
//   try {
//     const info = (await AsyncStorage.getItem('userInfo'))
//       ? JSON.parse(await AsyncStorage.getItem('userInfo'))
//       : null;
//     console.log({info});
//   } catch (error) {
//     return null;
//   }
// };
// const Info = getUserInfoFromLocalStorage();
// // console.log('=======>', getUserInfoFromLocalStorage());
// console.log('=======>', {Info});

const initialState = {
  //   userLogin: {userInfo: userInfoFromLocalStorage},
};
const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default Store;
