import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import {theme} from '../core/theme';
import {emailValidator} from '../util/emailValidator';
import {passwordValidator} from '../util/passwordValidator';
import {nameValidator} from '../util/nameValidator';
import {getUid, LoginScreen} from './LoginScreen';

export default function ChangePasswordScreen({navigation}){
    const [currPass, setCurrPass] = useState({value: '', error: ''});
    const [newPass0, setNewPass0] = useState({value: '', error: ''});
    const [newPass1, setNewPass1] = useState({value: '', error: ''});

    const onConfirmPressed = () =>{
        
        Alert.alert("Changing password", "Are you sure you want to change your password?", [
            { text: "No",},
            { text: "Yes", onPress: () => validatePassword() }
        ])
    }

    const validatePassword = () => {
        // console.log(global.uid);
        fetch(`http://192.168.1.9:8000/api/users/${global.uid}/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: global.name,
                email: global.email,
                phone_number: global.phone,
                password: newPass0.value,
            })
        })
        .then((resp) => resp.json())
        .then(() => {
            Alert.alert(
                "Success!",
                "Information changed!",
                [
                    {text: 'OK', onPress: () => {}}
                ],
                {cancelable: false}
            );
            return
            navigation.navigate('LoginScreen');
        })
        .catch(error => { 
            Alert.alert(
                "Failed!",
                "Information did not change!",
                [
                    {text: 'OK', onPress: () => {}}
                ],
                {cancelable: false}
            );
            console.log("error", error) 
        });
    }

    return (
        <BackGroundNormal>
            <Header>Change Password</Header>
            <TextInput
                label="Current password"
                returnKeyType="next"
                value= {currPass.value}
                onChangeText={(text) => setCurrPass({ value: text, error: '' })}
                error={!!currPass.error}
                errorText={currPass.error}
                secureTextEntry
            />

            <TextInput
                label="New password"
                returnKeyType="done"
                value= {newPass0.value}
                onChangeText={(text) => setNewPass0({ value: text, error: '' })}
                error={!!newPass0.error}
                errorText={newPass0.error}
                secureTextEntry
            />

            <TextInput
                label="Confirm new password"
                returnKeyType="done"
                value= {newPass1.value}
                onChangeText={(text) => setNewPass1({ value: text, error: '' })}
                error={!!newPass1.error}
                errorText={newPass1.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={onConfirmPressed}> 
                Confirm
            </Button>
        </BackGroundNormal>
    );    
}


const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        marginTop: 4,
    },
    link:{
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});