import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, FlatList  } from 'react-native';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import { onChange } from 'react-native-reanimated';
import {BackendAddress} from '../constants/BackendAddress'

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function SettingScreen({navigation}){
    const [name, setName] = useState({value: '', error: ''});
    const [phone, setPhone] = useState({value: '', error: ''});

    const changePhoneName = async (toChangeName, toChangePhone) => {
        console.log(global.email);
        console.log(global.password);
        // return await fetch(`${BackendAddress}/api/auth/login/`,{
        //     method: "POST",
        //     headers: {
        //         // 'Accept': 'application/json, text/plain, */*', 
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: global.email,
        //         password: global.password
        //     })
        // }).then((response) => response.json())
        // .then((json)=>{
        //     return fetch(`${BackendAddress}/api/users/`+global.uid+`/`,{
        //         method: "PUT",
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*', 
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             password: json.password,
        //             name: toChangeName,
        //             email: json.email,
        //             phone_number: toChangePhone,
        //         })
        //     }).then((response)=>response.json())
        //     .then((json)=>{
        //         console.log(json);
        //         Alert.alert(
        //             "Success!",
        //             "Information changed!",
        //             [
        //                 {text: 'OK', onPress: () => {}}
        //             ],
        //             {cancelable: false}
        //         );
        //     })
        // })
        // .catch((error)=>{
        //     console.log(error);
        //     Alert.alert(
        //         "Failed!",
        //         "Information did not change!",
        //         [
        //             {text: 'OK', onPress: () => {}}
        //         ],
        //         {cancelable: false}
        //     );
        // })
        return await fetch(`${BackendAddress}/api/users/`+global.uid+`/`,{
                method: "PUT",
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: global.password,
                    name: toChangeName,
                    email: global.email,
                    phone_number: toChangePhone,
                })
        }).then((response) => response.json())
        .then((json)=>{
            console.log(json);
            Alert.alert(
                "Success!",
                "Information changed!",
                [
                    {text: 'OK', onPress: () => {}}
                ],
                {cancelable: false}
            );
        })
        .catch((error)=>{
            console.log(error);
            Alert.alert(
                "Failed!",
                "Information did not change!",
                [
                    {text: 'OK', onPress: () => {}}
                ],
                {cancelable: false}
            );
        })
    }

    const onSavePressed = () =>{
        let phoneToChange = phone.value;
        let nameToChange = name.value;
        if (phone.value === '' && name.value === ''){
            return;
        }
        else{
            if (name.value === '') {
                nameToChange = global.name;
            }
            if (phone.value === ''){
                phoneToChange = global.phone;
            }
            changePhoneName(nameToChange, phoneToChange);
            return;
        }
    }

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
            <TextInput
                label="Name"
                returnKeyType="next"
                value= {name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
            />

            <TextInput
                label="Phone"
                returnKeyType="done"
                value= {phone.value}
                onChangeText={(text) => setPhone({ value: text, error: '' })}
                keyboardType="numeric"
            />

            <Button mode="contained" 
                onPress={onSavePressed}
            > 
                Save
            </Button>

            <Button mode="contained" onPress={() => navigation.navigate('ChangePassword')}> 
                Change Password
            </Button>

            <Button mode="contained" 
                onPress={() => {
                    Alert.alert("Logging out", "Are you sure you want to log out?", [
                        { text: "No",},
                        { text: "Yes", onPress: () => navigation.reset({index: 0,routes: [{name: 'LoginScreen'}],}) }
                    ])
                }}
            > 
                Log out
            </Button>
        </BackGroundNormal>
        // </TouchableWithoutFeedback>
    );    
}
