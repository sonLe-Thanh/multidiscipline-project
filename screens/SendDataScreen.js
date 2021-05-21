import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import {Text} from 'react-native-paper';
import TextInput from '../components/TextInput';
import {Alert} from 'react-native';

export default function SendDataScreen({navigation}){
    const activeKey = "aio_hYiG274T6gMuayHnJAV1cOwMJUkt";
    const apiHeader = "https://io.adafruit.com/api/v2/";

    const [sendTopic1, setSendTopic1] = useState({value: ''});
    const [sendData1, setSendData1] = useState({value: ''});
    const [sendTopic2, setSendTopic2] = useState({value: ''});
    const [sendData2, setSendData2] = useState({value: ''});
    

    const sendDataToFeed = (topic, aioKey, sendData) =>{
        url = apiHeader+topic.value+"/data";
        console.log(url);
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "X-AIO-Key": aioKey,
            },
            body: JSON.stringify({
                value: sendData.value,
            })
        }).then((response)=>response.json())
        .then((json)=>{
            console.log("Sent data to topic "+topic.value+" with value: "+sendData.value);
            console.log("Result: ",json)
            Alert.alert("Sent successfully", "You have sent value "+sendData.value+"to topic "+topic.value,[{text:"Ok", style:"cancel"}]);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
        
        <BackGroundNormal>
            <Header>Send data to feeds</Header>
            
            <TextInput
                label="Topic name 1"
                returnKeyType="done"
                value={sendTopic1.value}
                onChangeText = {(text)=> setSendTopic1({value:text})}
            />

            <TextInput
                label="Send Data"
                returnKeyType="done"
                value={sendData1.value}
                onChangeText = {(text)=> setSendData1({value:text})}
            />

            <Button
                mode="contained"
                onPress={()=>sendDataToFeed(sendTopic1, activeKey, sendData1)}
            >
                Send data to inputed feed
            </Button>

            <TextInput
                label="Topic name 2"
                returnKeyType="done"
                value={sendTopic2.value}
                onChangeText = {(text)=> setSendTopic2({value:text})}
            />

            <TextInput
                label="Send Data"
                returnKeyType="done"
                value={sendData2.value}
                onChangeText = {(text)=> setSendData2({value:text})}
            />

            <Button
                mode="contained"
                onPress={()=>sendDataToFeed(sendTopic2, activeKey, sendData2)}
            >
                Send data to inputed feed
            </Button>

            <Button
                mode="contained"
                onPress={()=>{navigation.replace('ReceiveDataScreen')}}
            >
                Receive data screen
            </Button>

            <Button mode="contained" 
                onPress={()=>{navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                })}}
            > 
                Log out
            </Button>

        </BackGroundNormal>
    );    
}