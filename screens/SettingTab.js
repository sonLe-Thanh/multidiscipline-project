import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SettingScreen from "./SettingScreen.js";
import ChangePasswordScreen from './ChangePasswordScreen';
import ChangePhoneNameScreen from './ChangePhoneNameScreen';


const SettingStack = createStackNavigator();

export default function SettingTab({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <SettingStack.Navigator>
            <SettingStack.Screen name="Setting" component={SettingScreen} options={{headerShown: false}}/>             
            <SettingStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{headerShown: false}}/>
            <SettingStack.Screen name="ChangePhoneName" component={ChangePhoneNameScreen} options={{headerShown: false}}/>
        </SettingStack.Navigator>
        // </TouchableWithoutFeedback>
    );    
}