import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './core/theme';
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ReceiveDataScreen,
  SendDataScreen,
  ShowScreen,
  ListDevicesScreen,
} from './screens';
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen.js";
// import ChangePasswordScreen from "./screens/ChangePasswordScreen.js";
 
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false, }}
        >
          <Stack.Screen name="LoginScreen" component ={LoginScreen}/>
          <Stack.Screen name="RegisterScreen" component ={RegisterScreen}/>
          <Stack.Screen name="HomeScreen" component ={HomeScreen}/>
          <Stack.Screen name="ShowScreen" component ={ShowScreen}/>
          <Stack.Screen name="ReceiveDataScreen" component={ReceiveDataScreen}/>
          <Stack.Screen name="SendDataScreen" component={SendDataScreen}/>
          <Stack.Screen name="ForgotPasswordScreen" component ={ForgotPasswordScreen}/>
          {/* <Stack.Screen name="ChangePasswordScreen" component ={ChangePasswordScreen}/> */}
          <Stack.Screen name="ListDevicesScreen" component={ListDevicesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
