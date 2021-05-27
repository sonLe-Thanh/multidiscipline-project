import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard} from 'react-native';

export default function normalBackground({ children }){
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style = {styles.background}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {children}
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#586273",
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