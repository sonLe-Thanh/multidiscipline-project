import React from 'react';
// import BackGroundNormal from '../components/BackGroundNormal';
// import Header from '../components/Header';
// import Button from '../components/Button';
// import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab';
import NotificationTab from './NotificationTab';
import SettingTab from './SettingTab';

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