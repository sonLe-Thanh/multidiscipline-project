import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoorsTab from "./DoorsTab.js";
import HomeMainScreen from "./HomeMainScreen.js";
import SensorsScreen from "./SensorsScreen.js";
import HistoryScreen from "./HistoryScreen.js";
import DevicesScreen from "./DevicesScreen.js";
import AddDeviceScreen from "./AddDeviceScreen.js";

const HomeStack = createStackNavigator();

export default function HomeStackTab({navigation}){
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeMainScreen} options={{headerShown: false}}/>             
            <HomeStack.Screen name="Doors" component={DoorsTab} options={{headerShown: false}}/>
            <HomeStack.Screen name="Sensors" component={SensorsScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="History" component={HistoryScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="Devices" component={DevicesScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="AddDevice" component={AddDeviceScreen} options={{headerShown: false}}/>
        </HomeStack.Navigator>
    );    
}