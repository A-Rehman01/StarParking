import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from '../../config/colors';
import {TextInput} from 'react-native-paper';
import {login} from '../../../Store/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  const [Emial, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const SignInhandler = () => {
    if (!Emial || !Password) {
      Alert.alert('Enter Correct Data');
      return;
    }
    // console.log({Emial, Password});
    dispatch(login(Emial, Password));
  };
  useEffect(() => {
    const isUserLogin = async () => {
      const userInfoFromLocalStorage = (await AsyncStorage.getItem('userInfo'))
        ? JSON.parse(await AsyncStorage.getItem('userInfo'))
        : null;

      if (!userInfo?.isAdmin || !userInfoFromLocalStorage?.isAdmin) {
        navigation.navigate('UserParkings');
        // console.log('======Nah', {userInfo});
      }
      if (userInfo?.isAdmin || userInfoFromLocalStorage?.isAdmin) {
        navigation.navigate('AdminParkings');
        // console.log('======hee', {userInfo});
      }
    };
    isUserLogin();
  }, [userInfo, error]);

  if (!userInfo?.isAdmin) {
    navigation.navigate('UserParkings');
  }
  if (userInfo?.isAdmin) {
    navigation.navigate('AdminParkings');
  }
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: colors.white}}>
      <StatusBar translucent={false} backgroundColor={colors.primary} />
      <View style={styles.logoConteiner}>
        <Image source={require('../../assests/logo.jpg')}></Image>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          value={Emial}
          onChangeText={e => setEmail(e)}
          style={styles.inputFieldStyle}
        />
        <TextInput
          label="Password"
          value={Password}
          onChangeText={e => setPassword(e)}
          style={styles.inputFieldStyle}
        />
        <View style={{marginTop: 10}}>
          {error && <Text style={{color: 'red'}}>{error}</Text>}
          <Text>
            Not an Account ?{' '}
            <Text
              style={{color: colors.primary}}
              onPress={() => navigation.navigate('SignUp')}>
              Sign up
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.SignInBtn}
          activeOpacity={0.8}
          onPress={SignInhandler}>
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

export default SignIn;

const styles = StyleSheet.create({
  logoConteiner: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 80,
    flex: 0.6,
  },
  inputFieldStyle: {
    marginTop: 20,
    borderRadius: 10,
  },
  SignInBtn: {
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
