import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import {theme} from '../core/theme';
import {emailValidator} from '../util/emailValidator';
import {passwordValidator} from '../util/passwordValidator';
import {nameValidator} from '../util/nameValidator';

export default function LoginScreen({navigation}){
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

            //Send data to backend here
            return
        }
        navigation.navigate('LoginScreen');
    }
    return (
        <BackGroundNormal>
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
                value= {password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
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