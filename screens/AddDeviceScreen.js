import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, Image } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function AddDeviceScreen({navigation}){
    const [topic, setTopic] = useState({value: 'try', error: ''});
    const [aio, setAio] = useState({value: 'try', error: ''});
    const [type, setType] = useState({value: 'try', error: ''});

    const onAddDevicePress = () =>{
        fetch("http://192.168.56.1:80/api/devices/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                topic_name: topic.value,
                aio_key: aio.value,
                type: type.value
            })
        })
        .then((resp) => resp.json())
        .then(() => {
            navigation.navigate('HomeScreen');
        })
        .catch(error => { console.log("error", error) });
    }

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Text>Add device</Text>

            <TouchableOpacity
                onPress = {() => onAddDevicePress()}
            >
                {/* <Text>Add device</Text> */}
                <Image source={require("../assets/images/favicon.png")}/>
            </TouchableOpacity>

        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}