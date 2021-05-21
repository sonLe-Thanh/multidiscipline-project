import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function HomeTab({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Header>HOME SCREEN HERE</Header>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}