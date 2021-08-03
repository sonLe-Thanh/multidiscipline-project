import React from 'react';
import {StyleSheet } from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from '../core/theme';

export default function Button({mode, style, ...props}){
    return (
        <PaperButton
            style = {[
                styles.button,
                mode === 'outlined' && {backgroundColor: theme.colors.surface},
                styles,
            ]}
            labelStyle = {styles.text}
            mode = {mode}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button:{
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    text:{
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    }
});