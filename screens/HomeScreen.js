import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import {Text} from 'react-native-paper';
import TextInput from '../components/TextInput';
import {ScrollView} from 'react-native';

export default function HomeScreen({navigation}){
    const userName = "LeThanh";
    const activeKey = "aio_ezkZ38iNn3kLo3gPe4adB0lweAIE";
    const apiHeader = "https://io.adafruit.com/api/v2/";

    var connectText = 'Connect to Adafruit server';
    //const [uri, setUri] = useState({value:'', error: ''});
    const [receiveTopic, setReceiveTopic] = useState({value: '', error:''});
    const [sendTopic, setSendTopic] = useState({value: ''});
    const [sendData, setSendData] = useState({value: ''});
    
    const connectToAdafruit = (username, key) =>{
        url = apiHeader+username+"/feeds?x-aio-key="+key;
        //console.log(url);
        return fetch(url, {
            //method: 'POST'
        }).then((response) => response.json())
        .then((json) => {
          console.log("Info: ", json);
          connectText = 'Conneted to Adafruit server';
        })
        .catch((error) => {
          console.error(error);
          connectText = 'Error Conneting to Adafruit server';
        });
    }

    const getDataFromFeed = (topic, aioKey, mode) =>{
        url = apiHeader+topic.value+"/data/"+mode;
        //console.log(url);
        return fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": aioKey,
            }
        }).then((response)=> response.json())
        .then((json)=>{
            console.log("Lasted info on topic "+topic.value+":",json);
            console.log(json.value);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

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
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
        
        <BackGroundNormal>
            {/* <Header>HOME SCREEN HERE</Header> */}

            <Button mode="contained"
                onPress={() => connectToAdafruit(userName, activeKey)}            
            >
                {connectText}
            </Button>

            <TextInput
                label="Receive Topic Name 1" 
                returnKeyType="done"
                value={receiveTopic.value}
                onChangeText = {(text)=> setReceiveTopic({value: text, error: ""})}
                error={!!receiveTopic.error}
                errorText={receiveTopic.error}
            />

            <Button
                mode="contained"
                onPress={()=>getDataFromFeed(receiveTopic, activeKey, "last")}
            >
                Get latest data from topic
            </Button>
            

            <TextInput
                label="SendTopicName"
                returnKeyType="done"
                value={sendTopic.value}
                onChangeText = {(text)=> setSendTopic({value:text})}
            />

            <TextInput
                label="SendData"
                returnKeyType="done"
                value={sendData.value}
                onChangeText = {(text)=> setSendData({value:text})}
            />

            <Button
                mode="contained"
                onPress={()=>sendDataToFeed(sendTopic, activeKey, sendData)}
            >
                Send data to inputed feed
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