import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native'
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Alert, TouchableWithoutFeedback, Keyboard, Text, View  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native';

// const DoorsStack = createMaterialTopTabNavigator();

export default function DoorsTab({navigation}){
    
    const apiHeader = "https://io.adafruit.com/api/v2/";
    const [doorStatus, setDoorStatus] = useState("Fetching");
    const [doorAction, setDoorAction] = useState("Fetching");
    const [isLoadingDevices, setIsLoadingDevices] = useState(true);
    const [listOutputDevice, setListOutputDevice] = useState([]);

    const receivedDataFromFeed = (_aiokey, _topic, _mode) => {
        var url = apiHeader+_topic+"/data/"+_mode;
        // console.log(url)
        // console.log(_aiokey)
        fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": _aiokey,
            }
        }).then(response =>response.json())
        .then((json)=>{
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data;
            // console.log(receivedData)
            if (receivedData === 1){
                setDoorStatus("Door closed!");
                setDoorAction("Open the door");
            }
            else {
                setDoorStatus("Door opened!");
                setDoorAction("Close the door");
            }
        })
        .catch((error)=>{
            console.error(error)
        })
    };

    const getOutputDevice = () =>{
        fetch("http://192.168.1.9:8000/api/devices/?user="+global.uid+"&type=O",{
            method: "GET"
        })
        .then((response)=>response.json())
        .then((json)=>{
            // console.log(json)
            setListOutputDevice(json)
            // console.log(listOutputDevice)
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            // console.log(listOutputDevice)
            for (var i =0; i<listOutputDevice.length;i++){
                receivedDataFromFeed(listOutputDevice[i].aio_key, listOutputDevice[i].topic_name, "last")
            }
            setIsLoadingDevices(false);
        })
    }

    function changeDoorStatus(_aiokey, topic, action){
        //0 to close the door, 1 to open the door
        var url = apiHeader + topic+ "/data";
        // console.log(url);
        var sendData;
        if (action === "Close the door"){
            sendData = "1";
        }
        else if (action === "Open the door"){
            sendData = "0";
        }
        // console.log(sendData);
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "X-AIO-Key": _aiokey,
            },
            body: JSON.stringify({
                value: JSON.stringify({
                    id:"11",
                    name:"RELAY",
                    data: sendData,
                    unit:"",
                }),
            })
        }).then((response)=>response.json())
        .then((json)=>{
            // console.log("Sent data to topic "+topic.value+" with value: "+sendData.value);
            // console.log("Result: ",json)
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data;
            if (receivedData === "1"){
                setDoorStatus("Door closed!");
                setDoorAction("Open the door");
            }
            else {
                setDoorStatus("Door opened!");
                setDoorAction("Close the door");
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    useEffect(()=>{
        getOutputDevice();
    },[])
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal style={{marginTop:50}}>
                <Header>DOOR AND WINDOW</Header>
                {listOutputDevice.map((value, index)=>{
                    return (
                        <View key={index}>
                            
                            <Text style={styles.status} >{doorStatus}</Text>
                            <Button
                                mode="contained"
                                onPress={()=>changeDoorStatus(value.aio_key, value.topic_name, doorAction)}
                            >
                            {doorAction}
                            </Button>
                        </View>
                        
                    );
                })}
                <Button
                mode="contained"
                onPress={()=>getOutputDevice()}
                >
                    Refresh
                </Button>
            
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}

const styles = StyleSheet.create({
    status:{
        fontSize: 30,
        color: "#1612e3",
        fontWeight: 'bold',
        paddingVertical: 12,
        textAlign: 'center',
    },
})