import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableOpacity, Keyboard, Text, View, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HistoryScreen({navigation}){
    // const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'android');
    //     setDate(currentDate);
    // };
    
    // const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    // };
    
    // const showDatepicker = () => {
    //     showMode('date');
    // };

    // const showTimepicker = () => {
    //     showMode('time');
    // };

    // return (
    //     // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
    //     <BackGroundNormal>
    //         <TouchableOpacity onPress={showDatepicker} title="Show date picker!" />
    //         <Text>History</Text>
    //     </BackGroundNormal>
    //     // </TouchableWithoutFeedback>
    // );   
    
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

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
        // position: "absolute",
    },
    text:{
        fontWeight: "bold",
        fontSize:20
    }
})