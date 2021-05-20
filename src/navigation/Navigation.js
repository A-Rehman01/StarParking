import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {configureFonts, Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';

//Screens
import Welcome from '../view/screens/Welcome';
import SignIn from '../view/screens/SignIn';
import SignUp from '../view/screens/SignUp';
import UserParkings from '../view/screens/UserParkings';
import UserBookParkings from '../view/screens/UserBookParkings';
import UserMyParkings from '../view/screens/UserMyParkings';
import userMyParkingsDetails from '../view/screens/userMyParkingsDetails';
import AdminParkings from '../view/screens/AdminParkings';
import AdminCreateParkings from '../view/screens/AdminCreateParkings';

//Fonts
import {fontConfig} from '../config/font';

//Theme
import colors from '../config/colors';

const navigationTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
  animation: {
    scale: 1.0,
  },
};

const Stack = createStackNavigator();
const StackNavigator = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;
  // console.log('=====In Navigation', userInfo);
  useEffect(() => {
    const getUserInfoFromLocalStorage = async () => {
      try {
        const InfoInLocalStorageFromNavigator = (await AsyncStorage.getItem(
          'userInfo',
        ))
          ? JSON.parse(await AsyncStorage.getItem('userInfo'))
          : null;

        console.log({InfoInLocalStorageFromNavigator});
      } catch (error) {
        // console.log('==========>', {error});
        setUserInfoFromLocalStorage(null);
        return null;
      }
    };
    getUserInfoFromLocalStorage();
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welome" component={Welcome} />

      {userInfo?.name ? (
        <>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen
            name="userMyParkingsDetails"
            component={userMyParkingsDetails}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;
  return (
    <>
      {userInfo?.name && userInfo?.isAdmin ? (
        <Drawer.Navigator initialRouteName="AdminParkings">
          <Drawer.Screen name="AdminParkings" component={AdminParkings} />
          <Drawer.Screen
            name="AdminCreateParkings"
            component={AdminCreateParkings}
          />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator initialRouteName="UserParkings">
          <Drawer.Screen name="UserParkings" component={UserParkings} />
          <Drawer.Screen name="UserBookParkings" component={UserBookParkings} />
          <Drawer.Screen name="UserMyParkings" component={UserMyParkings} />
        </Drawer.Navigator>
      )}
    </>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <PaperProvider theme={navigationTheme}>
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Navigation;
