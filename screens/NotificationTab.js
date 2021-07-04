// import React, {useState, useEffect} from 'react';
// import BackGroundNormal from '../components/BackGroundNormal';
// import Header from '../components/Header';
// import Button from '../components/Button';
// import { Alert, TouchableOpacity, SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Transition, Transitioning } from 'react-native-reanimated';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import * as firebase from 'firebase';
// import { Permissions, Notifications } from 'expo';
// import * as Application from 'expo-application';

// export default function NotificationTab({navigation}){
//     const [currentIndex, setCurrentIndex] = React.useState(null);
//     const ref = React.useRef();
//     console.log(Application.androidId);
//     console.log(Application.applicationId);

//     useEffect(()=>{
//         registerForPushNotifications();
//     });

//     registerForPushNotifications = async () =>{
//         const {status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

//         let finalStatus = status;

//         if (status !== 'granted'){
//             const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//             finalStatus = status;
//         }

//         // No permission
//         if (finalStatus !== 'granted'){ return; }

//         // Get push notifications token
//         let token = await Notifications.getExpoPushTokenAsync();
//         console.log(token);;
//     }

//     return (
//         // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
//         //BackGroundNormal
//         <ScrollView style = {{marginTop:20}}>
//             {/* <StatusBar hidden /> */}
//             {data.map(({ bg, color, header, content }, index) => {
//                 return (
//                 <TouchableOpacity
//                     key={header}
//                     onPress={() => {
//                         setCurrentIndex(index === currentIndex ? null : index);
//                     }}
//                     style={styles.cardContainer}
//                     activeOpacity={0.9}
//                 >
//                     <View style={[styles.card, { backgroundColor: bg }]}>
//                         <Text style={[styles.heading, { color }]}>{header}</Text>
//                         {index === currentIndex && (
//                             <View style={styles.contentList}>
//                                 {content.map((line) => (
//                                     <Text key={line} style={[styles.body, { color }]}>
//                                         {line}
//                                     </Text>
//                                 ))}
//                             </View>
//                         )}
//                     </View>
//                 </TouchableOpacity>
//                 );
//             })}
//         </ScrollView>
//         // </TouchableWithoutFeedback>
//     );    
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         marginTop: 20,
//     },
//     cardContainer: {
//         marginTop: 1,
//         flexGrow: 1,
//     },
//     card: {
//         flexGrow: 1,
//         alignItems: 'center',
//     //   justifyContent: 'center',
//     },
//     heading: {
//         fontSize: 38,
//         fontWeight: '900',
//         textTransform: 'uppercase',
//         letterSpacing: -2,
//     },
//     body: {
//         fontSize: 20,
//         lineHeight: 20 * 1.5,
//         textAlign: 'center',
//     },
//     subCategoriesList: {
//         marginTop: 20,
//     },
// });

// var data = [
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 1',
//         content: ["Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! Notification 1 content! "],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 2',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 3',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 4',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 5',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 6',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 7',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 8',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 9',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 10',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 11',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 12',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 13',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 14',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 15',
//         content: ["notification 2 content"],
//     },
//     {
//         bg: 'gray',
//         color: 'white',
//         header: 'notification 16',
//         content: ["notification 2 content"],
//     },
// ];



import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      {/* <Text>Your expo push token: {expoPushToken}</Text> */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}