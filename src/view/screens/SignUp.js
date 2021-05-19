import React, {useState} from 'react';
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
import {register} from '../../../Store/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  const [Emial, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');

  const SignUphandler = () => {
    if (!Emial || !Password || !Name) {
      Alert.alert('Enter Correct Data');
      return;
    }
    console.log({Name, Emial, Password});
  };
  useEffect(() => {
    const isUserLogin = async () => {
      const userInfoFromLocalStorage = (await AsyncStorage.getItem('userInfo'))
        ? JSON.parse(await AsyncStorage.getItem('userInfo'))
        : null;

      if (userInfo?.name || userInfoFromLocalStorage?.name) {
        navigation.navigate('DrawerNavigator');
        // console.log('======hee', {userInfo});
      }
    };
    isUserLogin();
  }, [userInfo, error]);

  if (userInfo?.isAdmin) {
    navigation.navigate('DrawerNavigator');
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
          label="Name"
          value={Name}
          onChangeText={e => setName(e)}
          style={styles.inputFieldStyle}
        />
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
          <Text>
            Already an Account ?{' '}
            <Text
              style={{color: colors.primary}}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.SignUpBtn}
          activeOpacity={0.8}
          onPress={SignUphandler}>
          <View>
            <Text
              style={{fontSize: 22, fontWeight: 'bold', color: colors.white}}>
              SignUp
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
  SignUpBtn: {
    backgroundColor: colors.primary,
    color: colors.white,
    height: 70,
    padding: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
});
