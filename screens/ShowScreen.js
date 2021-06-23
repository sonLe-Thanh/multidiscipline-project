import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import {View, Alert} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import {Text} from 'react-native-paper';
import TextInput from '../components/TextInput';
import {ScrollView} from 'react-native';

import ProgressCircle from 'react-native-progress-circle';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { Dimensions } from "react-native";


export default function ShowScreen({navigation}){
    // state ={
    //     receiveData1 = receiveData2 = 'No data received',
    //     receiveJson1 = receiveJson2 =
    // }


//    const activeKey = "aio_oFng13i2Ap1pb4dpN86jgoULrJok";
//    const apiHeader = "https://io.adafruit.com/api/v2/";
//
//    const [receiveTopic1, setReceiveTopic1] = useState({value: '', error:''});
//    const [receiveTopic2, setReceiveTopic2] = useState({value: '', error:''});
//    const [receiveData1, setReceivedData1] = useState('No data received!');
//    const [receiveData2, setReceivedData2] = useState('No data received!');
//    const [receiveJson1, setReceivedJson1] = useState('');
//    const [receiveJson2, setReceivedJson2] = useState('');
//    const [mode1, setMode1] = useState('last');
//    const [mode2, setMode2] = useState('last')
//
//    const getDataFromFeed = async (topic, aioKey, mode, index) =>{
//        url = apiHeader+topic.value+"/data/"+mode;
//        console.log(url);
//        return fetch(url, {
//            method: "GET",
//            headers: {
//                "X-AIO-Key": aioKey,
//            }
//        }).then((response)=> response.json())
//        .then((json)=>{
//            console.log("Lasted info on topic "+topic.value+":",json);
//            console.log(json.value);
//            if (index === 1){
//                setReceivedData1('Received value:'+json.value);
//                setReceivedJson1("JSON:" +JSON.stringify(json, null, 2));
//            }
//            else if (index === 2){
//                setReceivedData2('Received value:'+json.value);
//                setReceivedJson2("JSON:" +JSON.stringify(json, null, 2));
//            }
//            return json;
//        })
//        .catch((error)=>{
//            console.error(error);
//        })
//    };

    // Data humidity
    const cur_humidity = 50;

    const his_humidity = {
       labels: ["January", "February", "March", "April", "May", "June"],
       datasets: [
         {
           data: [
             40,
             80,
             55,
             70,
             60,
             50
           ]
         }
       ]
     }

    return (
            <View>
              <Text>Bezier Line Chart</Text>
              <LineChart
                data={his_humidity}
                width={Dimensions.get("window").width} // from react-native
                height={220}
//                yAxisLabel="$"
                yAxisSuffix="C"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#08130D",
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false // optional
                }}
//                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />

              <ProgressCircle
                              percent={cur_humidity}
                              radius={100}
                              borderWidth={8}
                              color="#3399FF"
                              shadowColor="#999"
                              bgColor="#fff"
                          >
                              <Text style={{ fontSize: 20 }}>{cur_humidity.toString() + '%'}</Text>
                          </ProgressCircle>
            </View>
        )

//    return (
//        <BackGroundNormal>
//            <ProgressCircle
//                percent={x}
//                radius={100}
//                borderWidth={8}
//                color="#3399FF"
//                shadowColor="#999"
//                bgColor="#fff"
//            >
//                <Text style={{ fontSize: 20 }}>{'50%'}</Text>
//            </ProgressCircle>
//        </BackGroundNormal>
//        );
}

