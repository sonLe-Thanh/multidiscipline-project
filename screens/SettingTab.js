import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from "./SettingScreen.js";
import ChangePasswordScreen from './ChangePasswordScreen';
import ChangePhoneNameScreen from './ChangePhoneNameScreen';


const SettingStack = createStackNavigator();

export default function SettingTab({navigation}){
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="Setting" component={SettingScreen} options={{headerShown: false}}/>             
            <SettingStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{headerShown: false}}/>
            <SettingStack.Screen name="ChangePhoneName" component={ChangePhoneNameScreen} options={{headerShown: false}}/>
        </SettingStack.Navigator>
    );    
}