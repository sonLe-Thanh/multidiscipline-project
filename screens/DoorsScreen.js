import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function DoorsScreen({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Text>Door</Text>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}