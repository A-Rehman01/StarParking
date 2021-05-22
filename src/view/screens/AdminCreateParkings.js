import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import colors from '../../config/colors';
import {TextInput} from 'react-native-paper';
import {adminCreateParkingAtion} from '../../../Store/actions/parkingActions';

const AdminCreateParkings = ({navigation}) => {
  const dispatch = useDispatch();
  const [parkingname, setParkingname] = useState('');
  const [capacity, setCapacity] = useState('');
  const adminCreateParking = useSelector(state => state.adminCreateParking);
  const {loading, error, success} = adminCreateParking;

  const showToastWithGravityAndOffset = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const submitHandler = () => {
    if (!parkingname || !capacity) {
      showToastWithGravityAndOffset('Insert Data CareFully');
      return;
    }
    // console.log({parkingname, capacity});
    let data = {parkingname, capacity};
    dispatch(adminCreateParkingAtion(data));
  };
  useEffect(() => {
    if (success) {
      showToastWithGravityAndOffset('Parking Area Created Successfully');
      setCapacity('');
      setParkingname('');
    }
    if (error) {
      showToastWithGravityAndOffset(error);
    }
  }, [success, error]);
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header navigation={navigation} />
      <View style={styles.logoConteiner}>
        <Image source={require('../../assests/logo.jpg')}></Image>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Parkng Name"
          value={parkingname}
          onChangeText={e => setParkingname(e)}
          style={styles.inputFieldStyle}
        />
        <TextInput
          label="No of Slots"
          value={capacity}
          onChangeText={e => setCapacity(e)}
          style={styles.inputFieldStyle}
        />
        <TouchableOpacity
          style={styles.SubmitBtn}
          activeOpacity={0.8}
          onPress={submitHandler}>
          <View>
            <Text
              style={{fontSize: 22, fontWeight: 'bold', color: colors.white}}>
              Create
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminCreateParkings;

const styles = StyleSheet.create({
  logoConteiner: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 80,
    flex: 0.6,
  },
  inputFieldStyle: {
    marginTop: 20,
    borderRadius: 10,
  },
  SubmitBtn: {
    backgroundColor: colors.primary,
    color: colors.white,
    height: 70,
    padding: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
  },
});
