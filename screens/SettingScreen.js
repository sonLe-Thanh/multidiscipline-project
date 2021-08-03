import React from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert  } from 'react-native';

export default function SettingScreen({navigation}){

    return (
        <BackGroundNormal>
            <Header>SETTINGS</Header>
            <Button mode="contained" onPress={() => navigation.navigate('ChangePhoneName')}> 
                Change info
            </Button>

            <Button mode="contained" onPress={() => navigation.navigate('ChangePassword')}> 
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
    );    
}