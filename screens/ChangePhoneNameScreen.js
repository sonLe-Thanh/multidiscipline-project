import React, {useState} from 'react';
import {Alert} from 'react-native';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default function ChangePhoneNameScreen({navigation}){
    const [name, setName] = useState({value: '', error: ''});
    const [phone, setPhone] = useState({value: '', error: ''});

    const changePhoneName = async (toChangeName, toChangePhone) => {
        return await fetch("http://192.168.1.9:8000/api/users/"+global.uid+"/",{
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
        <BackGroundNormal>
            <Header>CHANGE MY INFO</Header>
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
        </BackGroundNormal>
    );    
}