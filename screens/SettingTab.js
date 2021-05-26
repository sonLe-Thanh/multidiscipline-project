import React, {useState} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableWithoutFeedback, Keyboard, FlatList  } from 'react-native';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../util/emailValidator';
import { onChange } from 'react-native-reanimated';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function SettingTab({navigation}){
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [name, setName] = useState({value: '', error: ''});
    const [phone, setPhone] = useState({value: '', error: ''});

    const onSavePressed = () =>{
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({...email, error:emailError});
            //Send data to backend here
            return
        }
    }

    const onChangePasswordPressed = () => {
        
    }

    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        <BackGroundNormal>
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

            <Button mode="contained" 
                onPress={onSavePressed}
            > 
                Save
            </Button>

            <Button mode="contained" 
                onPress={onChangePasswordPressed}
            > 
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