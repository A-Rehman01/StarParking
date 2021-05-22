import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import BackHeader from '../../components/BackHeader';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';
import {adminSideParkingsAtion} from '../../../Store/actions/parkingActions';

const ParkingUserAdminSide = ({route, navigation}) => {
  const customerObj = route.params;
  //   console.log(customerObj[0]);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();

  const itemsPerPage = 10;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <BackHeader navigation={navigation} />
      {customerObj.length ? (
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{justifyContent: 'center'}}>
                Name
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Slots
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Carnumber
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Status
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}}>
                Details
              </DataTable.Title>
            </DataTable.Header>
            {customerObj?.slice(from, to).map(obj => (
              <DataTable.Row>
                <DataTable.Cell style={{justifyContent: 'center'}}>
                  {obj?.name}
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                  {obj?.slots}
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                  {obj?.carnumber}
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center'}} numeric>
                  {obj?.status}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{justifyContent: 'center'}}
                  onPress={() =>
                    navigation.navigate('UserStatusDetailsAdminSide', obj)
                  }>
                  Details
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              // numberOfPages={Math.floor(customerObj?.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${customerObj?.length}`}
            />
          </DataTable>
        </View>
      ) : (
        <Text>No user has booked in his Parking Area</Text>
      )}
    </SafeAreaView>
  );
};

export default ParkingUserAdminSide;
const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 30,
    // backgroundColor: 'pink',
  },
});
