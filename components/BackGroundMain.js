import React from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {theme} from '../core/theme';

const image_link = '../assets/images/mainscreen_background.jpg';

export default function mainBackground({ children }){
    return (
        <ImageBackground
            source= {require('../assets/images/mainscreen_background.jpg')}
            style = {styles.background}
            style={styles.background}
        >
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
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