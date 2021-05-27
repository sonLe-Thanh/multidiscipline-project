import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {receivedDataFromFeed} from '../util/ioServerConnection';

export default function SensorsScreen({navigation}){
    var dataFromSensor = receivedDataFromFeed("CSE_BBC/feeds/bk-iot-temp-humid","last");

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Header>Current sensors data</Header>
            <Text>{dataFromSensor}</Text>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}