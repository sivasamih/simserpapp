import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
  }),
});

import Login from './modules/Login';
import BranchDashboard from './modules/BranchDashboard';
import GateEntry from "./modules/components/GateEntry";
import * as REUSABLES from './modules/helpers/reusables';


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
  const [expoPushToken, setExpoPushToken] = useState('');

  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  
  useEffect(() => {
   
     //console.log("lastNotificationResponse > ",lastNotificationResponse);
    try{
      registerForPushNotificationsAsync().then(token => {
        setExpoPushToken(token);
        setNotifyToken(token); 
      });
      Notifications.addNotificationReceivedListener(this._handleNotification);
      Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
      initializeGreeting();
    }catch(ex){}
    
  }, []);

  const handleNotification = notification => {
    // console.log("_handleNotification > notification > ",notification);
  };

  const handleNotificationResponse = response => {
    //console.log("_handleNotificationResponse > response > ",response);
  };

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

  const setNotifyToken = async (token) => {
    try {
      REUSABLES.storeSessionData('notifyToken', token);
    } catch (ex) {
      console.log("-------> setNotifyToken ex > ", ex);
    }
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0072bc',
              elevation: 0,
              shadowOpacity: 0
            },
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitleStyle,
          }}
        >

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // options={{ headerShown: true }}
            options={{
              headerTitle: (props) => <>
                {/* <Image style={styles.image} source={require("./assets/icons/smiley.png")} /> */}
                <Text style={styles.customTitle}>
                  {" "}{greeting}
                  </Text>
              </>
              
            }}
            
          />

          <Stack.Screen
            name="BranchDashboard"
            component={BranchDashboardScreen}
            headerTitleStyle={styles.headerTitleStyle}
            options={({ route }) => ({ title: route.params.branchName + " - " + route.params.name,headerShadowVisible: false })}
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
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
  } else {
      alert('Must use physical device for Push Notifications');
  }

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