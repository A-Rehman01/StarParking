import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {configureFonts, Provider as PaperProvider} from 'react-native-paper';

//Screens
import Welcome from '../view/screens/Welcome';
import SignIn from '../view/screens/SignIn';
import SignUp from '../view/screens/SignUp';

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
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Welome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* <Stack.Screen name="Donors" component={DrawerNavigator} /> */}
    </Stack.Navigator>
  );
};

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="Donate">
//       <Drawer.Screen name="Donors" component={Donors} />
//       <Drawer.Screen name="Donate" component={Donate} />
//     </Drawer.Navigator>
//   );
// };

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
