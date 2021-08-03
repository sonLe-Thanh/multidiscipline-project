import React, { useEffect, useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator, StyleSheet, ScrollView  } from 'react-native';
import {Card} from 'react-native-elements'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from '../components/Themed';
import { FlatList } from 'react-native-gesture-handler';

export default function DevicesScreen({navigation}){
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetch("http://192.168.1.9:8000/api/devices/?user="+global.uid,{
            method: "GET",
        }).then((response)=>response.json())
        .then((json)=>{
            setDevices(json);
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            console.log(devices)
            console.log(global.uid)
            setIsLoading(false)
        })
    },[])
    console.log(global.uid);
    return (
        <BackGroundNormal>
            <Header>YOUR DEVICE</Header>
            {isLoading? 
            <ActivityIndicator size="large" color="#0000ff"/>
            :
                <View style={{flex: 1, marginTop: 50, justifyContent:'center', width:'100%'}}>
                    
                    <FlatList
                    style={{flex: 1}}
                    data ={devices}
                    keyExtractor={(item, index)=>index}
                    renderItem={({item})=>{
                        return (
                            <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
                                <View style={{flex: 1, justifyContent:'center', marginLeft:3}}>
                                    <Text style={{fontSize: 18, color: 'green', marginBottom: 15}}>
                                        {item.id}
                                    </Text>
                                    <Text style={{fontSize: 16, color:'red'}}>
                                        {item.type}
                                    </Text>
                                    <Text>
                                        {item.topic_name}
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={()=>{
                        return (
                            <View
                                style={{height:1, width:'100%',backgroundColor:'black'}}
                            >
                            </View>
                        )
                    }}
                />
                </View>
            }
        </BackGroundNormal>
    );    
}

const styles = StyleSheet.create({
    container:{
        marginTop: 15,
        flex: 1,
        padding: 10,
    }
});