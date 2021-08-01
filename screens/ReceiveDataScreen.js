import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import {View, Alert} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import {Text} from 'react-native-paper';
import TextInput from '../components/TextInput';
import {ScrollView} from 'react-native';



export default function ReceiveDataScreen({navigation}){
    // state ={
    //     receiveData1 = receiveData2 = 'No data received',
    //     receiveJson1 = receiveJson2 = 
    // }
    const activeKey = "aio_YqQF29yXm1YVckRjWSB8zrwF229R";
    const apiHeader = "https://io.adafruit.com/api/v2/";

    const [receiveTopic1, setReceiveTopic1] = useState({value: '', error:''});
    const [receiveTopic2, setReceiveTopic2] = useState({value: '', error:''});
    const [receiveData1, setReceivedData1] = useState('No data received!');
    const [receiveData2, setReceivedData2] = useState('No data received!');
    const [receiveJson1, setReceivedJson1] = useState('');
    const [receiveJson2, setReceivedJson2] = useState('');
    const [mode1, setMode1] = useState('last');
    const [mode2, setMode2] = useState('last')

    const getDataFromFeed = async (topic, aioKey, mode, index) =>{
        url = apiHeader+topic.value+"/data/"+mode;
        console.log(url);
        return fetch(url, {
            method: "GET",
            headers: {
                "X-AIO-Key": aioKey,
            }
        }).then((response)=> response.json())
        .then((json)=>{
            console.log("Lasted info on topic "+topic.value+":",json);
            console.log(json.value);
            if (index === 1){
                setReceivedData1('Received value:'+json.value);
                setReceivedJson1("JSON:" +JSON.stringify(json, null, 2));
            }
            else if (index === 2){
                setReceivedData2('Received value:'+json.value);
                setReceivedJson2("JSON:" +JSON.stringify(json, null, 2));
            }
            return json;
        })
        .catch((error)=>{
            console.error(error);
        })
    };

    return (
        
        <BackGroundNormal>
            <ScrollView style={{width: '100%'}}>
                <Header>Receive data</Header>

                <TextInput
                    label="Receive Topic Name 1" 
                    returnKeyType="done"
                    value={receiveTopic1.value}
                    onChangeText = {(text)=> setReceiveTopic1({value: text, error: ""})}
                    error={!!receiveTopic1.error}
                    errorText={receiveTopic1.error}
                />

                <TextInput
                    label="Mode" 
                    returnKeyType="done"
                    value={mode1}
                    onChangeText = {(text)=> setMode1(text)}
                />
                

                <Button
                    mode="contained"
                    onPress={()=>getDataFromFeed(receiveTopic1, activeKey, mode1, 1)}
                >
                    Get data
                </Button>

                <TextInput
                    editable = {false}
                    value = {receiveData1 + "\n" +receiveJson1}
                    multiline = {true}
                    numberOfLines={2}
                />

                <TextInput
                    label="Receive Topic Name 2" 
                    returnKeyType="done"
                    value={receiveTopic2.value}
                    onChangeText = {(text)=> setReceiveTopic2({value: text, error: ""})}
                    error={!!receiveTopic2.error}
                    errorText={receiveTopic2.error}
                />

                <TextInput
                    label="Mode" 
                    returnKeyType="done"
                    value={mode2}
                    onChangeText = {(text)=> setMode2(text)}
                />

                <Button
                    mode="contained"
                    onPress={()=>getDataFromFeed(receiveTopic2, activeKey, mode2, 2)}
                >
                    Get data
                </Button>
                    
                <TextInput
                    value = {receiveData2+"\n" +receiveJson2}
                    multiline = {true}
                    numberOfLines={2}
                    editable = {false}
                />


                <Button
                    mode="contained"
                    onPress={()=>{navigation.replace('SendDataScreen')}}
                >
                    Send data screen
                </Button>

                <Button mode="contained" 
                    onPress={()=>{navigation.reset({
                        index: 0,
                        routes: [{name: 'LoginScreen'}],
                    })}}
                > 
                    Log out
                </Button>
            </ScrollView>
            
        </BackGroundNormal>
    );    
}
