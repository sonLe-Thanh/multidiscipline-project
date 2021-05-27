import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableOpacity, Keyboard, Text, StyleSheet, ImageBackground, Image } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function HomeMainScreen({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <TouchableOpacity
                style={styles.sensorsButton} 
                onPress = {() => {navigation.navigate("Sensors")}}
            >
                {/* <Text>Sensor</Text> */}
                <Image source={require("../assets/images/favicon.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.doorsButton} 
                onPress = {() => {navigation.navigate("Doors")}}
            >
                {/* <Text>Doors</Text> */}
                <Image source={require("../assets/images/favicon.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.historyButton} 
                onPress = {() => {navigation.navigate("History")}}
            >
                {/* <Text>History</Text> */}
                <Image source={require("../assets/images/favicon.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.devicesButton} 
                onPress = {() => {navigation.navigate("Devices")}}
            >
                {/* <Text>Devices</Text> */}
                <Image source={require("../assets/images/favicon.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.addDevicesButton} 
                onPress = {() => {navigation.navigate("AddDevice")}}
            >
                {/* <Text>Add device</Text> */}
                <Image source={require("../assets/images/favicon.png")}/>
            </TouchableOpacity>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}

const styles = StyleSheet.create({
    sensorsButton:{
        // backgroundColor: 'white',
        marginTop: 20,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: -10,
        top: 10,
    },
    doorsButton:{
        // backgroundColor: 'white',
        marginTop: 20,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
    },
    historyButton:{
        // backgroundColor: 'white',
        marginTop: 20,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -10,
        top: 10,
    },
    devicesButton:{
        // backgroundColor: 'white',
        marginTop: 20,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: -10,
        top: 150,
    },
    addDevicesButton:{
        // backgroundColor: 'white',
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        top: 50
    }
})