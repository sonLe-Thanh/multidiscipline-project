import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
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

    const onLoginPressed = () =>{
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({...email, error:emailError});
            setPassword({...password, error:passwordError});
            return
        }
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