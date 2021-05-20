import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeTab} />
            <Tab.Screen name="Notification" component={NotificationTab} />
            <Tab.Screen name="Setting" component={SettingTab} />
        </Tab.Navigator>
    );
}

function HomeTab({navigation}){
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
            <BackGroundNormal>
                <Header>HOME SCREEN HERE</Header>
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
        </TouchableWithoutFeedback>
    );    
}


function NotificationTab({navigation}){
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
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
        </TouchableWithoutFeedback>
    );    
}

function SettingTab({navigation}){
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
            <BackGroundNormal>
                <Header>SETTING SCREEN HERE</Header>
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
        </TouchableWithoutFeedback>
    );    
}