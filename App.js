import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './modules/Login';
import BranchDashboard from './modules/BranchDashboard';
import GateEntry from "./modules/components/GateEntry";


// import Barcodescanner from './modules/Barcodescanner';
// import CameraComponent from './modules/CameraComponent';
// import FaceDetection from './modules/FaceDetection';


function LoginScreen({ navigation }) {
  return (
    <Login navigation={navigation} />
  );
}

function BranchDashboardScreen({route,navigation }) {
  return (
    <BranchDashboard navigation={navigation} route={route} />
  );
}

function GateEntryScreen({route,navigation }) {
  return (
    <GateEntry navigation={navigation} route={route} />
  );
}

export default function App() {
  const [greeting, setGreeting] = useState("Hi! ");
  useEffect(() => {
    initializeGreeting();
  }, []);

  const initializeGreeting = () => {
    var currentdate = new Date();
    var lastSync = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    var datetime = currentdate.toDateString();


    var time = currentdate.getHours();
    var greetings = "";
    if (time < 12) {
      greetings = "Good morning";
    } else {
      if (time >= 12) {
        if (time >= 16) {
          greetings = "Good Evening";
        } else {
          greetings = "Good afternoon";
        }
      }
    }
    setGreeting(greetings);
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0072bc'
            },
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitleStyle,
          }}
        >

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // options={{ title: greeting }}
            options={{
              headerTitle: (props) => <>
                <Image style={styles.image} source={require("./assets/icons/smiley.png")} />
                <Text style={styles.customTitle}>{" "}{greeting}</Text>
              </>
            }}
          />

          <Stack.Screen
            name="BranchDashboard"
            component={BranchDashboardScreen}
            headerTitleStyle={styles.headerTitleStyle}
            options={({ route }) => ({ title: route.params.branchName + " - " + route.params.name })}
          />

          <Stack.Screen
            name="GateEntry"
            component={GateEntryScreen}
            headerTitleStyle={styles.headerTitleStyle}
            options={({ route }) => ({ title: "Gate Entry" })}
          />


          {/* <Stack.Screen name="Barcode" component={Barcodescanner} options={{ title: 'Barcode Scanner' }}/>
          <Stack.Screen name="Camera" component={CameraComponent} options={{ title: 'Camera' }}/>
          <Stack.Screen name="FaceDetection" component={FaceDetection} options={{ title: 'Face Detection' }}/> */}

        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}


const styles = StyleSheet.create({
  theme: {
    fontFamily: 'Calibri'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 3
  },
  customTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
    color: '#fff'
  }

});