import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../config/colors';
import {useSelector} from 'react-redux';

const Welcome = ({navigation}) => {
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assests/welcomeImage.jpg')}>
        <View style={styles.welcomeContainer}>
          <TouchableOpacity
            style={styles.welcomebtn}
            activeOpacity={0.8}
            onPress={() => {
              if (userInfo?.name) {
                !userInfo?.isAdmin
                  ? navigation.navigate('UserParkings')
                  : navigation.navigate('AdminParkings');
              } else {
                navigation.navigate('SignIn');
              }
            }}>
            <View>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Get Started!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    bottom: 20,
  },
  welcomebtn: {
    backgroundColor: colors.white,
    color: colors.black,
    height: 70,
    padding: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
