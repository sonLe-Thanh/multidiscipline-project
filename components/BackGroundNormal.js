import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View} from 'react-native';

export default function normalBackground({ children }){
    return (
        <View style = {styles.background}>
            <View style={styles.container} behavior="padding">
                {children}
            </View>
        </View>
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