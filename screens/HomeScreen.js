import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Text } from 'react-native-paper';
import TextInput from '../components/TextInput';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal'

export default function HomeScreen({ navigation }) {
    const userName = "LeThanh";
    const activeKey = "aio_hYiG274T6gMuayHnJAV1cOwMJUkt";
    const apiHeader = "https://io.adafruit.com/api/v2/";

    const [connectText, setConnectText] = useState('Connect to Adafruit server');

    const connectToAdafruit = (username, key) => {
        url = apiHeader + username + "/feeds?x-aio-key=" + key;
        //console.log(url);
        return fetch(url, {
            //method: 'POST'
        }).then((response) => response.json())
            .then((json) => {
                console.log("Info: ", json);
                setConnectText('Successful!');
            })
            .catch((error) => {
                console.error(error);
                setConnectText('Error Conneting to Adafruit server');
            });
    }


    return (

        <BackGroundNormal>
            {/* <Header>HOME SCREEN HERE</Header> */}

            <Button mode="contained"
                onPress={() => connectToAdafruit(userName, activeKey)}
            >
                {connectText}
            </Button>

            <Button
                mode="contained"
                onPress={() => { navigation.replace('ReceiveDataScreen') }}
            >
                Receive data screen
            </Button>

            <Button
                mode="contained"
                onPress={() => { navigation.replace('SendDataScreen') }}
            >
                Send data screen
            </Button>

            <Button
                mode="contained"
                onPress={() => { navigation.replace('ListDevicesScreen') }}
            >
                Device list
            </Button>

            <Button mode="contained"
                onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    })
                }}
            >
                Log out
            </Button>

        </BackGroundNormal>
    );
}
