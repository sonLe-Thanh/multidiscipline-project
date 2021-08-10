import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import {theme} from '../core/theme';
import {emailValidator} from '../util/emailValidator';

export default function ForgotPasswordScreen({navigation}){
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [name, setName] = useState({value: '', error: ''});
    const [phone, setPhone] = useState({value: '', error: ''});

    const onRetrievePressed = () =>{
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({...email, error:emailError});
            return;
        }
        navigation.navigate('LoginScreen');
    }
    return (
        <BackGroundNormal>
            <Header>Retrieve Password</Header>

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

            <Button mode="contained" onPress={onRetrievePressed}> 
                Retrieve Password
            </Button>

            <View style={styles.row}>
                <Text>Already have an account? </Text>
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