import React, { useState } from 'react';
import { StyleSheet } from 'react-native'
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Alert, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native';

export default function DoorScreen({navigation}){
    // const activeKey = "aio_LIDa314NtVpctuI56N4bNL6zWj r x";
    const activeKey = "aio_oVFK11TKG8KzLv9s5PtWBeCuku a h";
    const apiHeader = "https://io.adafruit.com/api/v2/";
    const switchTopic = "CSE_BBC/feeds/bk-iot-magnetic";
    // const switchTopic = "LeThanh/feeds/magnetic-switch";
    const [doorStatus, setDoorStatus] = useState("Fetching");
    const [doorAction, setDoorAction] = useState("Fetching")

    function receivedDataFromFeed(topic, mode) {
        var url = apiHeader+topic+"/data/"+mode;
        fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": activeKey,
            }
        }).then(response =>response.json())
        .then((json)=>{
            console.log(json)
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data;
            console.log(receivedData);
            if (receivedData === "1"){
                setDoorStatus("Door closed!");
                setDoorAction("Open the door");
            }
            else {
                setDoorStatus("Door opened!");
                setDoorAction("Close the door");
            }
            // setTimeout(receivedDataFromFeed, 40000);
        })
        .catch((error)=>{
            console.error(error)
        })
    };

    function changeDoorStatus(topic, action){
        //0 to close the door, 1 to open the door
        var url = apiHeader + topic+ "/data";
        console.log(url);
        var sendData;
        if (action === "Close the door"){
            sendData = "1";
        }
        else if (action === "Open the door"){
            sendData = "0";
        }
        console.log(sendData);
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "X-AIO-Key": activeKey,
            },
            body: JSON.stringify({
                value: JSON.stringify({
                    id:"8",
                    name:"MAGNETIC",
                    data: sendData,
                    unit:"",
                }),
            })
        }).then((response)=>response.json())
        .then((json)=>{
            console.log("Sent data to topic "+topic.value+" with value: "+sendData.value);
            console.log("Result: ",json)
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
    receivedDataFromFeed(switchTopic, "last");
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <ScrollView style={{width:"100%"}}>
                <Header>Front door</Header>
                <Text style={styles.status} >{doorStatus}</Text>
                <Button
                    mode="contained"
                    onPress={()=>changeDoorStatus(switchTopic, doorAction)}
                >
                    {doorAction}
                </Button>
            </ScrollView>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}

const styles = StyleSheet.create({
    status:{
        fontSize: 20,
        color: "#ff6666",
        fontWeight: 'bold',
        paddingVertical: 12,
        textAlign: 'center',
    },
})