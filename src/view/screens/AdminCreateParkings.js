import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';

const AdminCreateParkings = ({navigation}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header navigation={navigation} />
      <Text>AdminCreateParkings</Text>
    </SafeAreaView>
  );
};

export default AdminCreateParkings;
