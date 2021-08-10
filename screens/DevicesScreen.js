import React, { useEffect, useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import { Text, ActivityIndicator, StyleSheet, Image  } from 'react-native';
import { View } from '../components/Themed';
import { FlatList } from 'react-native-gesture-handler';

export default function DevicesScreen({navigation}){
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetch("http://192.168.1.2:8000/api/devices/?user="+global.uid,{
            method: "GET",
        }).then((response)=>response.json())
        .then((json)=>{
            setDevices(json);
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])
    return (
        <BackGroundNormal>
            <Header>YOUR DEVICE</Header>
            {isLoading? 
            <ActivityIndicator size="large" color="#0000ff"/>
            :
                <View style={{marginTop: 50, justifyContent:'center', width:'100%',}}>
                    <FlatList
                    style={{}}
                    data ={devices}
                    keyExtractor={(item, index)=>index.toString()}
                    renderItem={({item})=>{
                        return (
                            <View style={{ flexDirection: 'row', marginBottom: 3}}>
                                <View style={{justifyContent:'center', marginLeft:3}}>
                                    <Image
                                        style={deviceCardStyle.tinyLogo}
                                        source={require('../assets/images/device.png')}
                                    />
                                    <Text style={{fontSize: 30, color:'red'}}>
                                        {item.type}
                                    </Text>
                                    <Text style={{fontSize: 30, color:"#000000"}} >
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


const deviceCardStyle = StyleSheet.create({

    tinyLogo: {
      marginTop: 10,
      marginBottom: 10,
      width: 50,
      height: 50,
    },
  })