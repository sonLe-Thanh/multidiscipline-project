import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./HomeScreen.js";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
  

function SettingsScreen({navigation}){
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
                
                <Tab.Navigator>
                    <Tab.Screen name="HomeScreen" component={HomeScreen} />
                    <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
                </Tab.Navigator>

            </BackGroundNormal>
        </TouchableWithoutFeedback>
    );    
}