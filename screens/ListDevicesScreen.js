import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { ScrollView, Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Divider } from 'react-native-elements';

function RegisterDevice(event) {

}

function RemoveDevice(event) {

}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    buttonStyle: {
        marginHorizontal: 10,
        marginTop: 5
    },
    div: {
        backgroundColor: 'blue',
        height: 5
    }
})

export default function ListDevicesScreen({ navigation }) {
    return (
        <BackGroundNormal>

            <Header
            >
                Device list</Header>

            <View style={{
                flexDirection: "row",
                position: 'absolute',
                top: 60,
            }}>
                <View style={styles.buttonStyle}>
                    <Button title="New device" color="blue" />
                </View>
                <View style={styles.buttonStyle}>
                    <Button title="Remove marked" color="red" />
                </View>
            </View>
            <Divider style={styles.div} />;
            <ScrollView>

            </ScrollView>
            <Divider style={styles.div} />;

        </BackGroundNormal>
    )
}
