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

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackTab} />
            <Tab.Screen name="Notification" component={NotificationTab} />
            <Tab.Screen name="Setting" component={SettingTab} />
        </Tab.Navigator>
    );
}
