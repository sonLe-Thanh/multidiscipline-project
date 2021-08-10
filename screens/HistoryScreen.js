import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import { Alert, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

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
    const [isGettingData, setIsGettingData] = useState(true);

    const [avgTemp, setAvgTemp] = useState('28*C');
    const [maxTemp, setMaxTemp] = useState('32*C');
    const [minTemp, setMinTemp] = useState('24*C');

    const [avgHumid, setAvgHumid] = useState('93%');
    const [maxHumid, setMaxHumid] = useState('95%');
    const [minHumid, setMinHumid] = useState('90%');

    const [avgRain, setAvgRain] = useState('50 mm');
    const [maxRain, setMaxRain] = useState('100 mm');
    const [minRain, setMinRain] = useState('0 mm');

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
                if (testJson.name==="TEMP-HUMID" && !appearList.includes(testJson.name)){
                    // DHT11 Device
                    setAppearList(appearList=>[...appearList, testJson.name])
                    for (var i =0;i<json.length;i++){
                        var date = Date.parse(json[i].created_at);
                        var dataPoint = JSON.parse(json[i].value);
                        var infoPoint = dataPoint.data.split('-');
                        // 0 temp, 1 humid
                        setTempData(tempData=>[...tempData, parseFloat(infoPoint[0])]);
                        setHumidityData(humidityData=>[...humidityData, parseFloat(infoPoint[1])]);
                    }
                }
                else if (testJson.name === "RAIN" && !appearList.includes(testJson.name)){
                    setAppearList(appearList=>[...appearList, testJson.name])
                    for (var j =0;j<json.length;j++){
                        var date = Date.parse(json[j].created_at);
                        var dataPoint = JSON.parse(json[j].value);
                        setRainData(rainData=>[...rainData, parseFloat(dataPoint.data)])
                    }
                }
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setIsGettingData(false);
        })
    }
    const getInputDevice = (_start_date, _end_date) =>{
        fetch("http://192.168.1.2:8000/api/devices/?user="+global.uid+"&type=I",{
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
            // setIsLoading(false);
            // return;

            for (var i =0;i<listInputDevice.length;i++){
                getTimeSerieDate(_start_date, _end_date,listInputDevice[i].aio_key, listInputDevice[i].topic_name,24);
            }
            if (!isGettingData){
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
                    avgT.toFixed(2);
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
                    avgH.toFixed(2);
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
                    avgR.toFixed(2);
                    setAvgRain(avgR+"*C");
                    setMaxRain(maxR+"*C");
                    setMinRain(minR+"*C");
                }
    
                setIsLoading(false);
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
                <Image
                    style={deviceCardStyle.tinyLogo}
                    source={require('../assets/images/tempIcon_Noti.png')}
                />

                <Text style={{marginTop: 5, fontSize: 20}}>
                    Maximum temperature: {maxTemp}
                </Text>
                <Text style={{marginTop: 5, fontSize: 20}}>
                    Minimum temperature: {minTemp}
                </Text>
                <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>
                    Average temperature: {avgTemp}
                </Text>
                {/* <View
                style={{height:1, width:'100%',backgroundColor:'black'}}
                >
                </View> */}
                
                <Image
                    style={deviceCardStyle.tinyLogo}
                    source={require('../assets/images/humidity.png')}
                />
               
                <Text style={{marginTop: 5, fontSize: 20}}>
                    Maximum humidity: {maxHumid}
                </Text>
                <Text style={{marginTop: 5, fontSize: 20}}>
                    Minimum humidity: {minHumid}
                </Text>
                <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>
                    Average humidity: {avgHumid}
                </Text>

                <Image
                    style={deviceCardStyle.tinyLogo}
                    source={require('../assets/images/rain_level.png')}
                />

                
                <Text style={{marginTop: 5, fontSize: 20}}>
                    Maximum rain level: {maxRain}
                </Text>
                <Text style={{marginTop: 5, fontSize: 20}}>
                    Minimum rain level: {minRain}
                </Text>
                <Text style={{marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>
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

const deviceCardStyle = StyleSheet.create({

    tinyLogo: {
      marginTop: 10,
      marginBottom: 10,
      width: 50,
      height: 50,
    },
  })