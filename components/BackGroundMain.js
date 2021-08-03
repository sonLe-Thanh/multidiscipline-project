import React from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {theme} from '../core/theme';

const image_link = '../assets/images/dark-mainscreen-background.png';

export default function mainBackground({ children }){
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground
                source={require(image_link)}
                style = {styles.background}
                style={styles.background}
            >
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {children}
                </KeyboardAvoidingView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: theme.colors.surface,
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
