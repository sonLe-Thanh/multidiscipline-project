import React from 'react';
// import BackGroundNormal from '../components/BackGroundNormal';
// import Header from '../components/Header';
// import Button from '../components/Button';
// import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackTab from './HomeStackTab';
import NotificationTab from './NotificationTab';
import SettingTab from './SettingTab';
import { Text } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Notification" component={NotificationTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="notifications" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Setting" component={SettingTab}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" color={color} size={size} />
                    )
                }} />
        </Tab.Navigator>
    );
}
