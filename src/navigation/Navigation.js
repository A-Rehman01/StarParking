import React from 'react';
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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welome" component={Welcome} />

      {userInfo?.name && !userInfo?.isAdmin && (
        <Stack.Screen name="UserParkings" component={DrawerNavigator} />
      )}

      {userInfo?.name && userInfo?.isAdmin && (
        <Stack.Screen name="AdminParkings" component={AdminDrawerNavigator} />
      )}

      {!userInfo?.name && (
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
  return (
    <Drawer.Navigator initialRouteName="UserParkings">
      <Drawer.Screen name="UserParkings" component={UserParkings} />
      <Drawer.Screen name="UserBookParkings" component={UserBookParkings} />
    </Drawer.Navigator>
  );
};

const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="AdminParkings">
      <Drawer.Screen name="AdminParkings" component={AdminParkings} />
      <Drawer.Screen
        name="AdminCreateParkings"
        component={AdminCreateParkings}
      />
    </Drawer.Navigator>
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
