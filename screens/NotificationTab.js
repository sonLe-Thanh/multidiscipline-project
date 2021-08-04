import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Platform, ActivityIndicator, Image, StyleSheet } from 'react-native';
import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';
import { FlatList } from 'react-native-gesture-handler';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listNotifi, setListNotifi] = useState([]);
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
      // console.log(listNotifi)
      setIsLoading(false);
    })
  }
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
    fetchAllNotifi();
    
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
      <View style={{marginTop: 50, justifyContent:'center', width:'100%'}}>
        <FlatList
          style={{}}
          data = {listNotifi}
          keyExtractor={(item, index)=>index.toString()}
          renderItem={({item})=>{
            return (
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <View style={{justifyContent:'center', marginLeft:3}}>
                  <Image
                    style={deviceCardStyle.tinyLogo}
                    source={require('../assets/images/noti.png')}
                  />
                  <Text style={{fontSize: 30, color: 'green'}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 15, color:'red'}}>
                    {item.time.split('T')[0]}
                  </Text>
                  <Text style={{fontSize: 30, color: 'black', marginBottom: 15}}>
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
        <Button
                mode="contained"
                onPress={()=>fetchAllNotifi()}
            >
                Refresh
            </Button>
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


const deviceCardStyle = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
})