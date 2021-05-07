import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import {theme} from '../core/theme';

export default function normalBackground({ children }){
    return (
        <View style = {styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#312525",
    },
    container:{
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});