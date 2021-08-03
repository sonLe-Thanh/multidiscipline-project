import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Alert, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, Image } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectDropdown from 'react-native-select-dropdown'

import {BackendAddress} from '../constants/BackendAddress'

export default function AddDeviceScreen({navigation}){
    const [topic, setTopic] = useState({value: ''});
    const [aio_key, setAioKey] = useState({value: ''});
    const [type, setType] = useState({value: ''});
    const typeList = ["DHT11", "Rain sensor", "Magnetic switch"];
    const apiHeader = "https://io.adafruit.com/api/v2/";

    const onAddDevicePress = () =>{
        fetch(`${BackendAddress}/api/devices/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                topic_name: topic.value,
                aio_key: aio_key.value,
                type: type.value,
                user: global.uid
            })
        })
        .then((resp) => resp.json())
        .then(() => {
            fetch(apiHeader+topic.value+"/data",{
                method: "POST",
                headers:{
                    "X-AIO-Key": aio_key.value,
                }
            }).then((response)=>response.json())
            .then(()=>{
                Alert.alert(
                    "Completed",
                    "The device was added to your list",
                    [
                        {text: 'OK', onPress: () => {}}
                    ],
                    {cancelable: false}
                );
            })
            .catch(error => { 
                Alert.alert(
                    "Failed",
                    "There was some errors during the process\nPlease try again!",
                    [
                        {text: 'OK', onPress: () => {}}
                    ],
                    {cancelable: false}
                );
                console.log("error", error) 
            });
            // navigation.navigate('HomeScreen');
        })
        .catch(error => { 
            Alert.alert(
                "Failed",
                "There was some errors during the process\nPlease try again!",
                [
                    {text: 'OK', onPress: () => {}}
                ],
                {cancelable: false}
            );
            console.log("error", error) 
        });
    }

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <Header>Add Device</Header>
            
            <TextInput
                label="Topic name"
                returnKeyType="next"
                value= {topic.value}
                onChangeText={(text) => setTopic({ value: text})}
            />

            <TextInput
                label="AIO Key"
                returnKeyType="next"
                value= {aio_key.value}
                onChangeText={(text) => setAioKey({ value: text})}
            />
            <SelectDropdown
                defaultButtonText = "Device type"
                data={typeList}
                onSelect={(selectedItem, index) => {
                    setType({value: selectedItem});
                }}
            />

            <Button mode="contained" onPress={onAddDevicePress}> 
                Add this device
            </Button>



        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}
