import React, {useState, useEffect} from 'react';
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

export default function RegisterScreen({navigation}){
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [name, setName] = useState({value: '', error: ''});
    const [phone, setPhone] = useState({value: '', error: ''});

    const onRegisterPressed = () =>{
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const nameError = nameValidator(name.value);
        if (emailError || passwordError || nameError) {
            setEmail({...email, error:emailError});
            setPassword({...password, error : passwordError});
            setName({...name, error: nameError});

            return
        }

        fetch("http://35.197.134.82:8000/api/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password: password.value,
                name: name.value,
                email: email.value,
                phone_number: phone.value
            })
        })
        .then((resp) => resp.json())
        .then(() => {
            navigation.navigate('LoginScreen');
        })
        .catch(error => { 
            Alert.alert(
                "Failed!",
                "There was some connection errors during the process.\nPlease try again later!",
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
            <Header>Register</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value= {name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />

            <TextInput
                label="Email"
                returnKeyType="next"
                value= {email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Phone"
                returnKeyType="next"
                value= {phone.value}
                onChangeText={(text) => setPhone({ value: text, error: '' })}
                error={!!phone.error}
                errorText={phone.error}
                keyboardType="numeric"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                description="Password must have at least 8 characters"
                value= {password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={onRegisterPressed}> 
                Register
            </Button>

            <View style={styles.row}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={()=>navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
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