import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export default function HomeMainScreen({navigation}){
    return (
        <BackGroundNormal>
            <TouchableOpacity
                style={styles.sensorsButton} 
                onPress = {() => {navigation.navigate("Sensors")}}
            >
                <Image source={require("../assets/images/SensorBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.doorsButton} 
                onPress = {() => {navigation.navigate("Doors")}}
            >
                <Image source={require("../assets/images/DoorsBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.historyButton} 
                onPress = {() => {navigation.navigate("History")}}
            >
                <Image source={require("../assets/images/HistoryBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.devicesButton} 
                onPress = {() => {navigation.navigate("Devices")}}
            >
                <Image source={require("../assets/images/DevicesBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.addDevicesButton} 
                onPress = {() => {navigation.navigate("AddDevice")}}
            >
                <Image source={require("../assets/images/addDeviceBtn.png")}/>
            </TouchableOpacity>

            <Text></Text>
        </BackGroundNormal>
    );    
}

const styles = StyleSheet.create({
    sensorsButton:{
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: -10,
        top: 10,
    },
    doorsButton:{
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
    },
    historyButton:{
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -10,
        top: 10,
    },
    devicesButton:{
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: -10,
        top: 150,
    },
    addDevicesButton:{
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 150
    }
})