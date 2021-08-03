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
import { Text, View, Platform, ActivityIndicator } from 'react-native';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { FlatList } from 'react-native-gesture-handler';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listNotifi, setListNotifi] = useState([
    {
      "id":1,
      "title": "Hello",
      "content": "1234",
      "time": "15:00"
    },
    {
      "id":2,
      "title": "Hi",
      "content": "5678",
      "time": "16:00"
    }
  ]);
  const notificationListener = useRef();
  const responseListener = useRef();

  const fetchAllNotifi = () =>{
    fetch("http://192.168.1.9:8000/api/notifications/?user="+global.uid,{
      metthod: "GET",
    })
    .then((response)=>response.json())
    .then((json)=>{
      setListNotifi(json);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{
      console.log(listNotifi)
      setIsLoading(false);
    })
  }
  useEffect(() => {
    // fetchAllNotifi();
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
    <BackGroundNormal>
      <Header>NOTIFICATIONS</Header>
      {isLoading?
      <ActivityIndicator size="large" color="#0000ff"/>
      :
      <View style={{flex: 1, marginTop: 50, justifyContent:'center', width:'100%'}}>
        <FlatList
          style={{flex: 1}}
          data = {listNotifi}
          keyExtractor={(item, index)=>index}
          renderItem={({item})=>{
            return (
              <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
                <View style={{flex: 1, justifyContent:'center', marginLeft:3}}>
                  <Text style={{fontSize: 18, color: 'green', marginBottom: 15}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 16, color:'red'}}>
                    {item.time}
                  </Text>
                  <Text>
                    {item.content}
                  </Text>
                </View>
              </View>
            )
          }}
          ItemSeparatorComponent={()=>{
            return (
              <View
                style={{height:1, width:'100%',backgroundColor:'black'}}
              >
              </View>
            )
          }}
        />
      </View>
      }
    </BackGroundNormal>
  ); 
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});