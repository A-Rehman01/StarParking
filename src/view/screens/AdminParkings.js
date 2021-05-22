import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import {adminSideParkingsAtion} from '../../../Store/actions/parkingActions';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';

const AdminParkings = ({navigation}) => {
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();

  const adminSideParkings = useSelector(state => state.adminSideParkings);
  const {loading, error, Adminparkings} = adminSideParkings;
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  const adminStatusAccept = useSelector(state => state.adminStatusAccept);
  const {success} = adminStatusAccept;
  const adminCreateParking = useSelector(state => state.adminCreateParking);
  const {success: NewCreatedParking} = adminCreateParking;

  const itemsPerPage = 10;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    dispatch(adminSideParkingsAtion());
    // console.log({Adminparkings});
    // console.log(Object.values(Adminparkings));
  }, [success, NewCreatedParking]);

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header navigation={navigation} />
      {loading && <Text style={{justifyContent: 'center'}}>Loading....</Text>}
      {error && <Text style={{justifyContent: 'center'}}>{error}</Text>}

      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexDirection: 'row',
        }}>
        <Icon
          name="refresh"
          color={colors.primary}
          size={22}
          onPress={() => dispatch(adminSideParkingsAtion())}
        />
        <Text>Refresh</Text>
      </View>
      {Adminparkings && !loading && (
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{justifyContent: 'center'}}>
                Names
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Availability
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Capacity
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Occupied
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}}>
                Users
              </DataTable.Title>
            </DataTable.Header>
            {Object.values(Adminparkings)
              ?.slice(from, to)
              .map(obj => (
                <DataTable.Row>
                  <DataTable.Cell style={{justifyContent: 'center'}}>
                    {obj?.parkingname}
                  </DataTable.Cell>
                  <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                    {obj?.availability}
                  </DataTable.Cell>
                  <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                    {obj?.capacity}
                  </DataTable.Cell>
                  <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                    {obj?.occupied}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{justifyContent: 'center'}}
                    onPress={() =>
                      navigation.navigate(
                        'ParkingUserAdminSide',
                        obj?.customers,
                      )
                    }>
                    Details
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.floor(
                Object.values(Adminparkings)?.length / itemsPerPage,
              )}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${
                Object.values(Adminparkings)?.length
              }`}
            />
          </DataTable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdminParkings;
const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 30,
    // backgroundColor: 'pink',
  },
});
