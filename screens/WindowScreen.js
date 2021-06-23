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

export default function WindowScreen({navigation}){
    const activeKey = "aio_LIDa314NtVpctuI56N4bNL6zWjrx";
    // const activeKey = "aio_oVFK11TKG8KzLv9s5PtWBeCuku a h";
    const apiHeader = "https://io.adafruit.com/api/v2/";
    // const switchTopic = "CSE_BBC/feeds/bk-iot-magnetic";
    const switchTopic = "LeThanh/feeds/magnetic-switch";
    const [WindowStatus, setWindowStatus] = useState("Fetching");
    const [WindowAction, setWindowAction] = useState("Fetching")
    // var count =1 ;


    async function receivedDataFromFeed(topic, mode) {
        var url = apiHeader+topic+"/data/"+mode;
        return fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": activeKey,
            }
        }).then(response =>response.json())
        .then((json)=>{
            // console.log(json)
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data;
            console.log(receivedData);
            if (receivedData === "1"){
                setWindowStatus("Window closed!");
                setWindowAction("Open the window");
            }
            else {
                setWindowStatus("Window opened!");
                setWindowAction("Close the window");
            }
            // setTimeout(receivedDataFromFeed, 40000,switchTopic,"last");
            // count ++;
            // console.log("Count",count);
        })
        .catch((error)=>{
            console.error(error)
        })
    };

    function changeWindowStatus(topic, action){
        //0 to close the Window, 1 to open the Window
        var url = apiHeader + topic+ "/data";
        console.log(url);
        var sendData;
        if (action === "Close the window"){
            sendData = "1";
        }
        else if (action === "Open the window"){
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
            console.log("Sent data to topic "+topic.value+" with value: "+sendData);
            console.log("Result: ",json)
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data;
            if (receivedData === "1"){
                setWindowStatus("Window closed!");
                setWindowAction("Open the window");
            }
            else {
                setWindowStatus("Window opened!");
                setWindowAction("Close the window");
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    function getData(){
        receivedDataFromFeed(switchTopic, "last");
        // setTimeout(receivedDataFromFeed, 40000,switchTopic,"last");
    }
    getData();
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <ScrollView style={{width:"100%"}}>
                <Header>Small Window</Header>
                <Text style={styles.status} >{WindowStatus}</Text>
                <Button
                    mode="contained"
                    onPress={()=>changeWindowStatus(switchTopic, WindowAction)}
                >
                    {WindowAction}
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