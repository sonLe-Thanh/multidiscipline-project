import React, { useEffect, useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator, View  } from 'react-native';


export default function SensorsScreen({navigation}){
    const apiHeader = "https://io.adafruit.com/api/v2/";
    const [temparature, setTemparature] = useState('--°C');
    const [humidity, setHumidity] = useState("--%");
    const [rainLevel, setRainLevel] = useState("--mm");

    const [listInputDevice, setListInputDevice] = useState([]);
    const [isLoadingDevices, setIsLoadingDevices] = useState(true);

    const receivedDataFromFeed = (_aiokey, _topic, _mode) => {
        var url = apiHeader+_topic+"/data/"+_mode;
        console.log(url)
        console.log(_aiokey)
        fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": _aiokey,
            }
        }).then(response =>response.json())
        .then((json)=>{
            console.log(json)
            var receivedObj = JSON.parse(json.value)
            if (receivedObj.name === "TEMP-HUMID") {
                var receivedData = receivedObj.data.split('-');
                setTemparature(receivedData[0]+"°C");
                setHumidity(receivedData[1]+"%");
            }
            else if (receivedObj.name === "RAIN") {
                setRainLevel(receivedObj.data+"mm")
            }
        })
        .catch((error)=>{
            console.error(error)
        })
    };

    const getInputDevice = () =>{
        fetch("http://192.168.1.9:8000/api/devices/?user="+global.uid+"&type=I",{
            method: "GET"
        })
        .then((response)=>response.json())
        .then((json)=>{
            setListInputDevice(json)
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            console.log(listInputDevice)
            for (var i =0; i<listInputDevice.length;i++){
                receivedDataFromFeed(listInputDevice[i].aio_key, listInputDevice[i].topic_name, "last")
            }
            setIsLoadingDevices(false);
        })
    }

    useEffect(()=>{
        getInputDevice();
    },[])
    
    return (
        <BackGroundNormal>
            <Header>Current sensors data</Header>
            {isLoadingDevices?
            <ActivityIndicator size="large" color="#0000ff"/>
            :
            <View>
                <Text>
                    Current temparature: {temparature}
                </Text>
                <Text>
                    Current humidity : {humidity}
                </Text>
                <Text>
                    Current rain level : {rainLevel}
                </Text>
            </View>
            }
            <Button
                mode="contained"
                onPress={()=>getInputDevice()}
            >
                Refresh
            </Button>
        </BackGroundNormal>
    );    
}