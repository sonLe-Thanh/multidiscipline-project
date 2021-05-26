import React, {useState, useEffect} from 'react';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { Alert, TouchableOpacity, SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function NotificationTab({navigation}){
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const ref = React.useRef();
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
        //BackGroundNormal
        <ScrollView style = {{marginTop:20}}>
            {/* <StatusBar hidden /> */}
            {data.map(({ bg, color, header, content }, index) => {
                return (
                <TouchableOpacity
                    key={header}
                    onPress={() => {
                        setCurrentIndex(index === currentIndex ? null : index);
                    }}
                    style={styles.cardContainer}
                    activeOpacity={0.9}
                >
                    <View style={[styles.card, { backgroundColor: bg }]}>
                        <Text style={[styles.heading, { color }]}>{header}</Text>
                        {index === currentIndex && (
                            <View style={styles.contentList}>
                                {content.map((line) => (
                                    <Text key={line} style={[styles.body, { color }]}>
                                        {line}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                );
            })}
        </ScrollView>
        // </TouchableWithoutFeedback>
    );    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: 20,
    },
    cardContainer: {
        marginTop: 1,
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        alignItems: 'center',
    //   justifyContent: 'center',
    },
    heading: {
        fontSize: 38,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -2,
    },
    body: {
        fontSize: 20,
        lineHeight: 20 * 1.5,
        textAlign: 'center',
    },
    subCategoriesList: {
        marginTop: 20,
    },
});

var data = [
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 1',
        content: ["Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! "],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 2',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 3',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 4',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 5',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 6',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 7',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 8',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 9',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 10',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 11',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 12',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 13',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 14',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 15',
        content: ["notification 2 content"],
    },
    {
        bg: 'gray',
        color: 'white',
        header: 'notification 16',
        content: ["notification 2 content"],
    },
];