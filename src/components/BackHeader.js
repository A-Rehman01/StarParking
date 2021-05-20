import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../config/colors';
const BackHeader = ({navigation: {goBack}}) => {
  return (
    <SafeAreaView style={styles.headerCaontainer}>
      <View style={styles.header}>
        <Icon
          name="long-arrow-alt-left"
          color={colors.primary}
          size={28}
          onPress={() => goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default BackHeader;
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
