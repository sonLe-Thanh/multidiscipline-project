import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';

const image_link = './assets/images/mainscreen_background.jpg';

export default function App() {
  const [userName, onChangeUserName] = React.useState("Username");
  return (
    <View style={styles.container}>
      <ImageBackground source={require(image_link)} style={styles.image_background} >
        <Text style={[styles.header,styles.header_color]}>Rain forcast system</Text>
        {/* <StatusBar style="auto" /> */}
        <TextInput 
          style = {styles.input_box}
          onChangeText = {onChangeUserName}
          placeholder = {userName}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image_background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  header: {
    // fontFamily: 'Red Hat Text',
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 56,
    borderColor: "#0C0A0A",
    borderWidth: 4
  },

  header_color:{
    color: 'black',
  },

  input_box: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});