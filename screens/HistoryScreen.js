import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableOpacity, Keyboard, Text, View, StyleSheet, Dimensions } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HistoryScreen({navigation}){
    const apiHeader = "https://io.adafruit.com/api/v2/";
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [listInputDevice, setListInputDevice] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [rainData, setRainData] = useState([]);
    const label = ['6:00','7:00','8:00','9:00','10:00','11:00','12:00']

    const onChange = (event, selectedDate) => {
        setHumidityData([]);
        setTempData([]);
        setRainData([]);
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        currentDate.setDate(currentDate.getDate())
        setDate(currentDate);
        
        
        const start_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),0,0,0,0)
        const end_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),24,0,0,0)
        
        // console.log(currentDate.toString());
        // console.log("Start "+start_date.toISOString()+" " + start_date)
        // console.log("End "+end_date.toISOString()+" " + end_date)
        
        getInputDevice(start_date, end_date);

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getTimeSerieDate = (_start_date, _end_date, _aio_key, _topic_name, limit) =>{
        var url = apiHeader+_topic_name+"/data?start_date="+_start_date+"&end_date="+_end_date+"&limit="+limit;
        console.log(url)
        console.log(_aio_key)
        fetch(url, {
            method: "GET",
            headers:{
                "X-AIO-Key": _aio_key,
            }
        }).then((response)=>response.json())
        .then((json)=>{
            console.log(json)
            if (json.length>0){
                var testJson = JSON.parse(json[0].value)
                console.log("test"+testJson)
                console.log(json.length)
                if (testJson[0].name==="TEMP-HUMID"){
                    // DHT11 Device
                    for (var i =0;i<json.length;i++){
                        var date = Date.parse(json[i].created_at);
                        var dataPoint = JSON.parse(json[i]);
                        var infoPoint = dataPoint.data.split('-');
                        // 0 temp, 1 humid
                        setTempData([...tempData, infoPoint[0]]);
                        setHumidityData([...humidityData, infoPoint[1]]);

                    }
                }
                else if (testJson[0].name === "RAIN"){
                    for (var i =0;i<json.length;i++){
                        var date = Date.parse(json[i].created_at);
                        var dataPoint = JSON.parse(json[i]);
                        setRainData([...rainData, dataPoint.data])
                    }
                }
            }
        })
    }
    const getInputDevice = (_start_date, _end_date) =>{
        fetch("http://192.168.1.9:8000/api/devices/?user="+global.uid+"&type=I",{
            method: "GET"
        })
        .then((response)=>response.json())
        .then((json)=>{
            setListInputDevice(json)
        })
        .then(()=>{
            for (var i =0;i<listInputDevice.length;i++){
                getTimeSerieDate(_start_date, _end_date,listInputDevice[i].aio_key, listInputDevice[i].topic_name,24);
            }
            console.log(tempData[0])
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            console.log(listInputDevice)
        })
    }
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
        <BackGroundNormal>
            <View>
                <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                    <Text style = {styles.text}>Choose a date</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {/* <LineChart
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
              /> */}
        </BackGroundNormal>
  );
}


const styles = StyleSheet.create({
    button:{
        backgroundColor: 'gray',
        marginTop: 20,
        width: 200,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        top: -300,
    },
    text:{
        fontWeight: "bold",
        fontSize:20
    }
})