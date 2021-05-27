import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DoorScreen from "./DoorScreen.js";
import WindowScreen from "./WindowScreen.js";

const DoorsStack = createMaterialTopTabNavigator();

export default function DoorsTab({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <DoorsStack.Navigator style={{marginTop:20}}>
            <DoorsStack.Screen name="Door" component={DoorScreen} options={{headerShown: false}}/>
            <DoorsStack.Screen name="Window" component={WindowScreen} options={{headerShown: false}}/>
        </DoorsStack.Navigator>
        // </TouchableWithoutFeedback>
    );
}