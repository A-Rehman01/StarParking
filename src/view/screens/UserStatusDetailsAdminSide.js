import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BackHeader from '../../components/BackHeader';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';
import {adminStatusAcceptAtion} from '../../../Store/actions/parkingActions';
import moment from 'moment';
import {TextInput} from 'react-native-paper';

const UserStatusDetailsAdminSide = ({route, navigation}) => {
  const customer = route.params;
  console.log({customer});
  const dispatch = useDispatch();
  const adminStatusAccept = useSelector(state => state.adminStatusAccept);
  const {loading, error, success} = adminStatusAccept;

  const [slots, setSlots] = useState(String(customer.slots));

  const [carNumber, setCarNumber] = useState(customer.carnumber);

  const [startDate, setStartDate] = useState(
    moment(customer.startdate).format('MMMM Do YYYY, h:mm:ss a'),
  );

  const [endDate, setEndDate] = useState(
    moment(customer.enddate).format('MMMM Do YYYY, h:mm:ss a'),
  );
  const [status, setStatus] = useState(customer.status);
  const [email, setEmail] = useState(customer.email);

  const [isExpired, setIsExpired] = useState(customer.isExpired ? 'Yes' : 'No');
  const showToastWithGravityAndOffset = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  useEffect(() => {
    if (success) {
      showToastWithGravityAndOffset('Update Status SuccessFully');
    }
    if (error) {
      showToastWithGravityAndOffset(error);
    }
  }, [success, error]);
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <BackHeader navigation={navigation} />

      <Text style={{fontSize: 22, fontWeight: 'bold'}}>
        {customer.parkingname}
      </Text>
      {!loading ? (
        <View style={styles.formContainer}>
          <View>
            <Text> Name: {customer.name}</Text>
            <Text> Email: {customer?.customerID?.email}</Text>
          </View>
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
              label="Expired"
              value={isExpired}
              style={styles.inputFieldStyle}
            />
          </View>
          <View style={styles.statusBtnContainer}>
            <TouchableOpacity
              style={styles.statusExceptbtn}
              activeOpacity={0.8}
              onPress={() =>
                dispatch(adminStatusAcceptAtion('active', customer?._id))
              }>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: colors.white,
                  }}>
                  Except
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statusCancelbtn}
              activeOpacity={0.8}
              onPress={() =>
                dispatch(adminStatusAcceptAtion('cancel', customer?._id))
              }>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: colors.white,
                  }}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={{fontSize: 23, marginTop: 50, fontWeight: 'bold'}}>
          Loading...
        </Text>
      )}
    </SafeAreaView>
  );
};

export default UserStatusDetailsAdminSide;
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 10,
  },
  inputFieldStyle: {
    marginTop: 20,
    borderRadius: 10,
  },
  statusBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  statusExceptbtn: {
    backgroundColor: colors.primary,
    height: 60,
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '40%',
  },
  statusCancelbtn: {
    backgroundColor: colors.primary,
    height: 60,
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '40%',
  },
});
