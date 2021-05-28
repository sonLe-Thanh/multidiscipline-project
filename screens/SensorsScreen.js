import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function SensorsScreen({navigation}){
    const activeKey = "aio_pukx68auKHJQ4lcYiWUy8pTKd5F0";
    const apiHeader = "https://io.adafruit.com/api/v2/";

    const [temparature, setTemparature] = useState('--°C');
    const [humidity, setHumidity] = useState("--%");
    const [rainLevel, setRainLevel] = useState("--mm");

    function receivedDataFromFeed(topic, mode) {
        var url = apiHeader+topic+"/data/"+mode;
        fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": activeKey,
            }
        }).then(response =>response.json())
        .then((json)=>{
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data.split('-');
            setTemparature(receivedData[0]+"°C");
            setHumidity(receivedData[1]+"%");
            // setTimeout(receivedDataFromFeed, 40000);
        })
        .catch((error)=>{
            console.error(error)
        })
    };
    receivedDataFromFeed("CSE_BBC/feeds/bk-iot-temp-humid","last");
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Header>Current sensors data</Header>
            <Text>Current temparature: {temparature}</Text>
            <Text>Current humidity: {humidity}</Text>
            <Text>Current rain level: {rainLevel}</Text>
            <Text>All data is taken from sensors</Text>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}