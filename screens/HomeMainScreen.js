import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export default function HomeMainScreen({navigation}){
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <TouchableOpacity
                style={styles.sensorsButton} 
                onPress = {() => {navigation.navigate("Sensors")}}
            >
                {/* <Text>Sensor</Text> */}
                <Image source={require("../assets/images/SensorBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.doorsButton} 
                onPress = {() => {navigation.navigate("Doors")}}
            >
                {/* <Text>Doors</Text> */}
                <Image source={require("../assets/images/DoorsBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.historyButton} 
                onPress = {() => {navigation.navigate("History")}}
            >
                {/* <Text>History</Text> */}
                <Image source={require("../assets/images/HistoryBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.devicesButton} 
                onPress = {() => {navigation.navigate("Devices")}}
            >
                {/* <Text>Devices</Text> */}
                <Image source={require("../assets/images/DevicesBtn.png")}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.addDevicesButton} 
                onPress = {() => {navigation.navigate("AddDevice")}}
            >
                {/* <Text>Add device</Text> */}
                <Image source={require("../assets/images/AddDeviceBtn.png")}/>
            </TouchableOpacity>

            <Text></Text>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}

const styles = StyleSheet.create({
    sensorsButton:{
        // backgroundColor: 'white',
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
        // backgroundColor: 'white',
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
    },
    historyButton:{
        // backgroundColor: 'white',
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
        // backgroundColor: 'white',
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
        // backgroundColor: 'white',
        marginTop: 100,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 150
    }
})