import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Button,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import colors from '../../config/colors';
import {userCreateParkingsAtion} from '../../../Store/actions/parkingActions';

const UserBookParkings = ({navigation}) => {
  const dispatch = useDispatch();
  const userSideParkings = useSelector(state => state.userSideParkings);
  const {loading, error, parkings} = userSideParkings;

  const userCreateParkings = useSelector(state => state.userCreateParkings);
  const {
    loading: createParkingLoading,
    error: createParkingerror,
    success,
  } = userCreateParkings;

  const parkingsname = parkings.map(obj => {
    let _c = {
      name: obj.parkingname,
      id: obj.id,
    };
    return _c;
  });
  const [selectParkingName, setSelectparkingName] = useState('');
  const [slots, setSlots] = useState('');
  const [carnumber, setCarnumber] = useState('');
  const [startdatevalue, setstartDatevalue] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [enddatevalue, setendDatevalue] = useState(new Date());
  const [endmode, setendMode] = useState('date');
  const [endshow, setendShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startdatevalue;
    setShow(Platform.OS === 'ios');
    setstartDatevalue(currentDate);
  };
  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || enddatevalue;
    setendShow(Platform.OS === 'ios');
    setendDatevalue(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const startDate = () => {
    showMode('date');
  };

  const startTime = () => {
    showMode('time');
  };

  const showendMode = currentMode => {
    setendShow(true);
    setendMode(currentMode);
  };
  const endDate = () => {
    showendMode('date');
  };

  const endTime = () => {
    showendMode('time');
  };

  const showToastWithGravityAndOffset = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const submithandler = () => {
    if (!selectParkingName || !carnumber || !slots) {
      showToastWithGravityAndOffset('Select Data Carefully');
      return;
    }
    let data = {
      parkingID: selectParkingName,
      startdate: startdatevalue,
      enddate: enddatevalue,
      carnumber: carnumber,
      slots: slots,
    };
    console.log({data});
    dispatch(userCreateParkingsAtion(data));
  };

  useEffect(() => {
    if (success) {
      setSelectparkingName('');
      setSlots('');
      setCarnumber('');
      showToastWithGravityAndOffset('success Fully Created');
    }
    if (createParkingerror) {
      showToastWithGravityAndOffset(createParkingerror);
    }
  }, [success, createParkingerror]);
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header navigation={navigation} />
      <View style={styles.FormContainer}>
        <View>
          <Picker
            selectedValue={selectParkingName}
            onValueChange={(itemValue, itemIndex) =>
              setSelectparkingName(itemValue)
            }>
            <Picker.Item
              enabled={false}
              label="select parkings"
              value="select parkings"
            />
            {parkingsname.map(obj => (
              <Picker.Item label={obj.name} value={obj.id} />
            ))}
          </Picker>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Button onPress={startDate} title="Select Start Date" />
          </View>
          <View>
            <Button onPress={startTime} title="Select Start Date" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startdatevalue}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
          <View>
            <Button onPress={endDate} title="Select End Date" />
          </View>
          <View>
            <Button onPress={endTime} title="Select End Date" />
          </View>
          {endshow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={enddatevalue}
              mode={endmode}
              is24Hour={false}
              display="default"
              onChange={onChangeEndDate}
              minimumDate={startdatevalue}
            />
          )}
        </View>
        <View>
          <TextInput
            label="Slots"
            value={slots}
            onChangeText={e => setSlots(e)}
            style={styles.inputFieldStyle}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            label="Car Number"
            value={carnumber}
            onChangeText={e => setCarnumber(e)}
            style={styles.inputFieldStyle}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButtom}
          activeOpacity={0.8}
          onPress={submithandler}>
          <View>
            <Text
              style={{fontSize: 22, fontWeight: 'bold', color: colors.white}}>
              SignIn
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserBookParkings;

const styles = StyleSheet.create({
  FormContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  inputFieldStyle: {
    marginTop: 20,
    borderRadius: 10,
  },
  submitButtom: {
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
