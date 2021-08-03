import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import BackGroundMain from '../components/BackGroundMain';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import {theme} from '../core/theme';
import {emailValidator} from '../util/emailValidator';
import {passwordValidator} from '../util/passwordValidator';


export default function LoginScreen({navigation}){
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    
    const login = async (input_email, input_password) =>{
         navigation.navigate('HomeScreen');
         return;

        return await fetch("http://35.197.134.82:8000/api/auth/login/",{
            method: "POST",
            headers: {
                // 'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: input_email,
                password: input_password
            })
        }).then((response) => response.json())
        .then((json)=>{
            console.log(json);
            global.uid = json.id;
            if (typeof global.uid === 'undefined'){
                setEmail({...email, error:"Invaild email or password"});
                setPassword({...password, error:"Invaild email or password"});
            }
            else {
                global.email = json.email;
                global.phone = json.phone_number;
                global.name = json.name;
                global.password = input_password;
                navigation.navigate('HomeScreen');
            }
            return;
        })
        .catch((error)=>{
            console.log(error);
            setEmail({...email, error:"Invaild email or password"});
            setPassword({...password, error:"Invaild email or password"});
            return;
        })
    }
    const onLoginPressed = () =>{
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({...email, error:emailError});
            setPassword({...password, error:passwordError});
            return
        }

        login(email.value, password.value);
    }
    return (
        <BackGroundMain>
            <Header>RAIN FORCAST SYSTEM</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value= {email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value= {password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    // Should navigate to reset password page here
                    onPress={()=>navigation.replace('ForgotPasswordScreen')}
                >
                    <Text style={styles.forgot} >Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <Button mode="contained" onPress={onLoginPressed}> 
                Log in 
            </Button>

            <View style={styles.row}>
                <Text>Don't have any account?</Text>
                <TouchableOpacity onPress={()=>navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Register</Text>
                </TouchableOpacity>
            </View>
        </BackGroundMain>
    );    
}


const styles = StyleSheet.create({
    forgotPassword:{
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row:{
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot:{
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link:{
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});