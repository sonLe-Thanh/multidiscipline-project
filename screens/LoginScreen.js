import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import BackGroundMain from '../components/BackGroundMain';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import {theme} from '../core/theme';
import {emailValidator} from '../util/emailValidator';
import {passwordValidator} from '../util/passwordValidator';

var uid = 0;

function getUid() {
    return uid;
}

export default function LoginScreen({navigation}){
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});

    useEffect(() => {
        fetch("http://192.168.56.1:80/api/users/", {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
        })
        .catch(error => { console.log("error", error) });
    }, []);

    // console.log(data);

    const onLoginPressed = () =>{
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({...email, error:emailError});
            setPassword({...password, error:passwordError});
            return
        }
        let able = 0;
        for (let i = 0; i < user.length; ++i) {
            if (email.value == user[i].email) {
                // check password here
                global.uid = user[i].id;
                able = 1;
                break;
            }
        }
        if (!able) return;
        navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
        })
    }
    return (
        <BackGroundMain onPress={() => console.log("background pressed!")}>
            <Header>RAIN FORCAST SYSTEM</Header>
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
                label="Password"
                returnKeyType="done"
                value= {password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
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