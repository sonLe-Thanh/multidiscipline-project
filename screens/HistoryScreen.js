import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableOpacity, Keyboard, Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { max } from 'react-native-reanimated';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HistoryScreen({navigation}){
    const apiHeader = "https://io.adafruit.com/api/v2/";
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [listInputDevice, setListInputDevice] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [humidData, setHumidityData] = useState([]);
    const [rainData, setRainData] = useState([]);
    const [appearList, setAppearList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [avgTemp, setAvgTemp] = useState('Not available');
    const [maxTemp, setMaxTemp] = useState('Not available');
    const [minTemp, setMinTemp] = useState('Not available');

    const [avgHumid, setAvgHumid] = useState('Not available');
    const [maxHumid, setMaxHumid] = useState('Not available');
    const [minHumid, setMinHumid] = useState('Not available');

    const [avgRain, setAvgRain] = useState('Not available');
    const [maxRain, setMaxRain] = useState('Not available');
    const [minRain, setMinRain] = useState('Not available');

    const onChange = (event, selectedDate) => {
        setAppearList([]);
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
        // console.log(url)
        // console.log(_aio_key)
        return fetch(url, {
            method: "GET",
            headers:{
                "X-AIO-Key": _aio_key,
            }
        })
        .then((response)=>response.json())
        .then((json)=>{
            if (json.length>0){
                var testJson = JSON.parse(json[0].value)
                // console.log(testJson.name)
                // console.log(appearList.includes(testJson.name))
                if (testJson.name==="TEMP-HUMID" && !appearList.includes(testJson.name)){
                    // console.log("DHT11")
                    // DHT11 Device
                    setAppearList(appearList=>[...appearList, testJson.name])
                    for (var i =0;i<json.length;i++){
                        var date = Date.parse(json[i].created_at);
                        var dataPoint = JSON.parse(json[i].value);
                        var infoPoint = dataPoint.data.split('-');
                        // 0 temp, 1 humid
                        setTempData(tempData=>[...tempData, parseFloat(infoPoint[0])]);
                        // console.log(infoPoint);
                        setHumidityData(humidityData=>[...humidityData, parseFloat(infoPoint[1])]);
                    }
                }
                else if (testJson.name === "RAIN" && !appearList.includes(testJson.name)){
                    // console.log("DHT12")
                    setAppearList(appearList=>[...appearList, testJson.name])
                    for (var j =0;j<json.length;j++){
                        var date = Date.parse(json[j].created_at);
                        var dataPoint = JSON.parse(json[j].value);
                        setRainData(rainData=>[...rainData, parseFloat(dataPoint.data)])
                    }
                    // console.log(appearList)
                }
            }
        })
    }
    const getInputDevice = (_start_date, _end_date) =>{
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
            for (var i =0;i<listInputDevice.length;i++){
                console.log(listInputDevice[i].topic_name);
                getTimeSerieDate(_start_date, _end_date,listInputDevice[i].aio_key, listInputDevice[i].topic_name,24);
            }
            setIsLoading(false);
            if (tempData.length>0){
                var minT = tempData[0];
                var maxT = tempData[0];
                var avgT = 0;
                for (var i=0; i<tempData.length;i++){
                    avgT +=tempData[i];
                    if (tempData[i]>maxT){
                        maxT = tempData[i];
                    }
                    if (tempData[i]<minT){
                        minT = tempData[i];
                    }
                }
                avgT /= tempData.length;
                setAvgTemp(avgT+"*C");
                setMaxTemp(maxT+"*C");
                setMinTemp(minT+"*C");
            }

            if (humidData.length>0){
                var minH = humidData[0];
                var maxH = humidData[0];
                var avgH = 0;
                for (var i=0; i<humidData.length;i++){
                    avgH +=humidData[i];
                    if (humidData[i]>maxH){
                        maxH = humidData[i];
                    }
                    if (humidData[i]<minH){
                        minH = humidData[i];
                    }
                }
                avgH /= humidData.length;
                setAvgHumid(avgH+"*C");
                setMaxHumid(maxH+"*C");
                setMinHumid(minH+"*C");
            }

            if (rainData.length>0){
                var minR = rainData[0];
                var maxR = rainData[0];
                var avgR = 0;
                for (var i=0; i<rainData.length;i++){
                    avgR +=rainData[i];
                    if (rainData[i]>maxR){
                        maxH = rainData[i];
                    }
                    if (rainData[i]<minR){
                        minH = rainData[i];
                    }
                }
                avgR /= rainData.length;
                setAvgRain(avgR+"*C");
                setMaxRain(maxR+"*C");
                setMinRain(minR+"*C");
            }
        })
    }
    return (
        <BackGroundNormal>
            
            <View>
                <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                    <Text style = {styles.text}>Choose a date</Text>
                </TouchableOpacity>
            </View>
            <Header>
                   PAST DATA
            </Header>
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
            {
            isLoading
            ?<View/>
            :<View>
                <Text>
                    Maximum temperature: {maxTemp}
                </Text>
                <Text>
                    Minimum temperature: {minTemp}
                </Text>
                <Text>
                    Average temperature: {avgTemp}
                </Text>
                {/* <View
                style={{height:1, width:'100%',backgroundColor:'black'}}
                >
                </View> */}
                
               
                <Text>
                    Maximum humidity: {maxHumid}
                </Text>
                <Text>
                    Minimum humidity: {minHumid}
                </Text>
                <Text>
                    Average humidity: {avgHumid}
                </Text>
                {/* <View
                style={{height:1, width:'100%',backgroundColor:'black'}}
                >
                </View> */}

                
                <Text>
                    Maximum rain level: {maxRain}
                </Text>
                <Text>
                    Minimum rain level: {minRain}
                </Text>
                <Text>
                    Average rain level: {avgRain}
                </Text>
                
            </View>
            }
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
