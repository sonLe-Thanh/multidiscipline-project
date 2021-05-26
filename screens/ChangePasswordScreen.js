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

export default function ChangePasswordScreen({navigation}){
    const [currPass, setCurrPass] = useState({value: '', error: ''});
    const [newPass0, setNewPass0] = useState({value: '', error: ''});
    const [newPass1, setNewPass1] = useState({value: '', error: ''});

    const onConfirmPressed = () =>{
        // check password here
        Alert.alert("Changing password", "Are you sure you want to change your password?", [
            { text: "No",},
            { text: "Yes", onPress: () => validatePassword() }
        ])
    }

    const validatePassword = () => {
        navigation.navigate('LoginScreen');
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
                onChangeText={(text) => setNewPass0({ value: text, error: '' })}
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