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
import {userMyParkingsAtion} from '../../../Store//actions/parkingActions';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';

const UserMyParkings = ({navigation}) => {
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;
  const userCreateParkings = useSelector(state => state.userCreateParkings);
  const {success} = userCreateParkings;
  const userMyParkings = useSelector(state => state.userMyParkings);
  const {
    loading: loadinguserMyParkings,
    error: erroruserMyParkings,
    parkings,
  } = userMyParkings;

  const itemsPerPage = 5;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    dispatch(userMyParkingsAtion());
    console.log({parkings});
  }, [success]);
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <Header navigation={navigation} />
      {loadinguserMyParkings && (
        <Text style={{justifyContent: 'center'}}>Loading....</Text>
      )}
      {erroruserMyParkings && (
        <Text style={{justifyContent: 'center'}}>{erroruserMyParkings}</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          {userInfo?.name} Parkings
        </Text>
        <View>
          <Icon
            name="refresh"
            color={colors.primary}
            size={22}
            onPress={() => dispatch(userMyParkingsAtion())}
          />
        </View>
      </View>
      {parkings && !loading && (
        <View style={styles.TableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{justifyContent: 'center'}}>
                Names
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}} numeric>
                Carnumber
              </DataTable.Title>
              <DataTable.Title style={{justifyContent: 'center'}}>
                Status
              </DataTable.Title>

              <DataTable.Title style={{justifyContent: 'center'}}>
                Details
              </DataTable.Title>
            </DataTable.Header>
            {parkings.slice(from, to).map(obj => (
              <DataTable.Row>
                <DataTable.Cell style={{justifyContent: 'center'}}>
                  {obj.parkingname}
                </DataTable.Cell>
                <DataTable.Cell numeric style={{justifyContent: 'center'}}>
                  {obj.carnumber}
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'center'}}>
                  {obj.status}
                </DataTable.Cell>

                <DataTable.Title
                  style={{justifyContent: 'center'}}
                  onPress={() =>
                    navigation.navigate('userMyParkingsDetails', obj)
                  }>
                  Details
                </DataTable.Title>
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

export default UserMyParkings;
const styles = StyleSheet.create({
  TableContainer: {
    flex: 1,
    marginTop: 30,
    // backgroundColor: 'red',
  },
});
