import React, { useState } from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { ScrollView, Button } from 'react-native';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Divider } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';


// Device properties: id, topic_name, aio_key, type

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
    divider: {
        backgroundColor: 'blue',
        height: 10
    }
})

const sampleDevices = [
    { id: 1, topic_name: "Outdoor", aio_key: "7c046af32ff0", type: "input", name: "Temperature Sensor" },
    { id: 2, topic_name: "Outdoor", aio_key: "6fb5e156d18f", type: "output", name: "Magnetic Switch" },
]

export default function ListDevicesScreen({ navigation }) {
    console.log(sampleDevices)
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
            <Divider style={styles.divider} />
            <ScrollView>

                <View>
                    <FlatList
                        data={sampleDevices}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => <Text>{item.name}</Text>}
                    />
                </View>

            </ScrollView>
            <Divider style={styles.divider} />

        </BackGroundNormal>
    )
}
