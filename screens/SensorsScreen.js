import React, { useEffect, useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator, View  } from 'react-native';
import * as Progress from 'react-native-progress';


export default function SensorsScreen({navigation}){
    const apiHeader = "https://io.adafruit.com/api/v2/";
//    const [temparature, setTemparature] = useState('--°C');
//    const [humidity, setHumidity] = useState("--%");
//    const [rainLevel, setRainLevel] = useState("--mm");
    const temparature = '38°C'
    const humidity = '50%'
    const rainLevel = '200mm'
    const [listInputDevice, setListInputDevice] = useState([]);
    const [isLoadingDevices, setIsLoadingDevices] = useState(false);

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
        fetch("http://35.197.134.82:8000/api/devices/?user="+global.uid+"&type=I",{
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

//    useEffect(()=>{
//        getInputDevice();
//    },[])
    
    return (
        <BackGroundNormal>
            <Header>Current sensors data</Header>
            {isLoadingDevices?
            <ActivityIndicator size="large" color="#0000ff"/>
            :
            <View style={{flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',}}>
                <Text style={styles.text}>
                    Temparature:
                </Text>

                <View style={styles.circles}>
                      <Progress.Circle
                      color={'orange'}
                      progress={0.39}
                      size={200}
                      borderWidth={2}
                      thickness={10}
                      showsText={true}
                      formatText={(progress) => `${progress*100}` + '°C'}
                        style={styles.progress}
        //                    progress={this.state.progress}
        //                    indeterminate={this.state.indeterminate}
                      />
                </View>

                <Text style={styles.text}>
                    Humidity:
                </Text>

                <View style={styles.circles}>
                      <Progress.Circle
                      progress={0.5}
                      size={200}
                      borderWidth={2}
                      thickness={10}
                      showsText={true}
                      formatText={(progress) => `${progress*100}` + '%'}
                        style={styles.progress}
        //                    progress={this.state.progress}
        //                    indeterminate={this.state.indeterminate}
                      />
                </View>

                <Text style={styles.text}>
                    Rain level : 200mm
                </Text>
            </View>
            }
            <Button
                mode="contained"
//                onPress={()=>getInputDevice()}
            >
                Refresh
            </Button>
        </BackGroundNormal>
    );

}

const styles = StyleSheet.create({
    text: {
        top: 20,
       fontSize: 30,
       fontWeight: "700",
       fontFamily: "Roboto"
    },
    circles: {
        top: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
});