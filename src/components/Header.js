import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';
import {logout} from '../../Store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';

const Header = ({navigation}) => {
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(logout());
  };
  return (
    <SafeAreaView style={styles.headerCaontainer}>
      <View style={styles.header}>
        <Icon
          name="menu"
          color={colors.primary}
          size={28}
          onPress={() => navigation.openDrawer()}
        />
        <TouchableOpacity onPress={() => Logout()}>
          <View style={styles.header}>
            <Icon name="logout" color={colors.primary} size={18} />
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerCaontainer: {
    // flex: 1,
    marginTop: 30,
    padding: 5,
    marginBottom: 20,
    // backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
