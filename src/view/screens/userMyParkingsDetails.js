import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../config/colors';
import {TextInput} from 'react-native-paper';
import BackHeader from '../../components/BackHeader';
import moment from 'moment';
const userMyParkingsDetails = ({route, navigation}) => {
  const obj = route.params;
  console.log(obj);
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;
  const [slots, setSlots] = useState(String(obj.slots));

  const [carNumber, setCarNumber] = useState(obj.carnumber);

  const [startDate, setStartDate] = useState(
    moment(obj.startdate).format('MMMM Do YYYY, h:mm:ss a'),
  );

  const [endDate, setEndDate] = useState(
    moment(obj.enddate).format('MMMM Do YYYY, h:mm:ss a'),
  );

  const [status, setStatus] = useState(obj.status);

  const [isExpired, setIsExpired] = useState(obj.isExpired ? 'true' : 'false');

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <BackHeader navigation={navigation} />

      <View style={styles.formContainer}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>
          {obj.parkingname}
        </Text>
        <View>
          <TextInput
            label="Start Date"
            value={startDate}
            style={styles.inputFieldStyle}
          />
          <TextInput
            label="End Date"
            value={endDate}
            style={styles.inputFieldStyle}
          />
        </View>
        <View>
          <TextInput
            label="Car Number"
            value={carNumber}
            style={styles.inputFieldStyle}
          />

          <TextInput
            label="Slots"
            value={slots}
            style={styles.inputFieldStyle}
          />
        </View>
        <View>
          <TextInput
            label="Status"
            value={status}
            style={styles.inputFieldStyle}
          />
          <TextInput
            label="isExpired"
            value={isExpired}
            style={styles.inputFieldStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default userMyParkingsDetails;
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 10,
  },
  inputFieldStyle: {
    marginTop: 20,
    borderRadius: 10,
  },
});
