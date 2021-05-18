import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {logout} from '../../../Store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminParkings = ({navigation}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  const Logout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const isUserLogin = async () => {
      if (!userInfo || !(await AsyncStorage.getItem('userInfo'))) {
        navigation.navigate('SignIn');
      }
      console.log(await AsyncStorage.getItem('userInfo'));
    };
    isUserLogin();
  }, [userInfo, error]);
  if (!userInfo) {
    navigation.navigate('SignIn');
  }
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <View>
        <Text>Header</Text>
      </View>
      <Text>AdminParkings</Text>
      <TouchableOpacity style={{margin: 100}} onPress={() => Logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminParkings;
