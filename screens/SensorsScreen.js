import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function SensorsScreen({navigation}){
    const activeKey = "aio_atdS67wAR8mAG3s0MfgeS6ydx7fi";
    const apiHeader = "https://io.adafruit.com/api/v2/";
    const dht11Topic = "CSE_BBC/feeds/bk-iot-temp-humid";

    const [temparature, setTemparature] = useState('--°C');
    const [humidity, setHumidity] = useState("--%");
    const [rainLevel, setRainLevel] = useState("--mm");
    var tmp = 1;

    function receivedDataFromFeed(topic, mode) {
        var url = apiHeader+topic+"/data/"+mode;
        // tmp ++;
        // setTemparature(tmp+"°C");
        fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": activeKey,
            }
        }).then(response =>response.json())
        .then((json)=>{
            var receivedObj = JSON.parse(json.value)
            var receivedData = receivedObj.data.split('-');
            console.log(receivedData);
            setTemparature(receivedData[0]+"°C");
            setHumidity(receivedData[1]+"%");
            // setTimeout(receivedDataFromFeed, 40000, dht11Topic, "last");
        })
        .catch((error)=>{
            console.error(error)
        })
    };
    receivedDataFromFeed(dht11Topic,"last");
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Header>Current sensors data</Header>
            <Text>Current temparature: {temparature}</Text>
            <Text>Current humidity: {humidity}</Text>
            <Text>Current rain level: {rainLevel}</Text>
            <Button
                mode="contained"
                onPress={()=>receivedDataFromFeed(dht11Topic, "last")}
            >
                Refresh
            </Button>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}