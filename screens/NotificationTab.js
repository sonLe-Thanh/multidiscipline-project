import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function NotificationTab({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Header>NOTIFICATION SCREEN HERE</Header>
            <Button mode="contained" 
                onPress={() => {
                    Alert.alert("Logging out", "Are you sure you want to log out?", [
                        { text: "No",},
                        { text: "Yes", onPress: () => navigation.reset({index: 0,routes: [{name: 'LoginScreen'}],}) }
                    ])
                }}
            > 
                Log out
            </Button>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}