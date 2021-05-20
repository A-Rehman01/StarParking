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
import {userSideParkingsAtion} from '../../../Store/actions/parkingActions';
import {DataTable} from 'react-native-paper';

const UserParkings = ({navigation}) => {
  const dispatch = useDispatch();

  const userSideParkings = useSelector(state => state.userSideParkings);
  const {loading, error, parkings} = userSideParkings;
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  const itemsPerPage = 10;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    dispatch(userSideParkingsAtion());
    console.log({parkings});
  }, []);
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header navigation={navigation} />
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>
        {userInfo?.name} Parkings
      </Text>
      {loading && <Text style={{justifyContent: 'center'}}>Loading....</Text>}
      {error && <Text style={{justifyContent: 'center'}}>{error}</Text>}
      {parkings && !loading && (
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Names</DataTable.Title>
              <DataTable.Title numeric>Availability</DataTable.Title>
              <DataTable.Title numeric>Capacity</DataTable.Title>
              <DataTable.Title numeric>Occupied</DataTable.Title>
            </DataTable.Header>
            {parkings.slice(from, to).map(obj => (
              <DataTable.Row>
                <DataTable.Cell>{obj.parkingname}</DataTable.Cell>
                <DataTable.Cell numeric>{obj.availability}</DataTable.Cell>
                <DataTable.Cell numeric>{obj.capacity}</DataTable.Cell>
                <DataTable.Cell numeric>{obj.occupied}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.floor(parkings?.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${parkings?.length}`}
            />
          </DataTable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserParkings;
const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 30,
    // backgroundColor: 'pink',
  },
});
