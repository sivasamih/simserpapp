import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text
} from "react-native";

import { TextInput, Button } from 'react-native-paper';

import Logo from '../assets/B1.png';
import * as APIURLS from './helpers/apiconstant';
import * as FETCHAPI from './helpers/fetchapi';
import * as REUSABLES from './helpers/reusables';


import FullScreenLoader from "./reusablecomponents/FullScreenLoader";
import TopBanner from "./reusablecomponents/TopBanner";

const headers = {
    "Content-Type": "application/json",
};


export default function BranchDashboard({route, navigation}) {
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const [visibleBanner, setVisibleBanner] = React.useState(true);
    const [bannerMessage, setBannerMessage] = React.useState("Dashboard");
    

    useEffect(() => {
        // console.log("route > ",route);
        // console.log("navigation > ",navigation);
        getSessionData(); 
    }, []);

    const getSessionData = async () => {
        try {
            const sessionData = await REUSABLES.getStoredSessionData();
            setSessionData(sessionData);
        } catch (ex) {
            console.log("-------> getSessionData ex > ", ex);
        }
    }


    return (
        <>
            <TopBanner 
            message={bannerMessage}
            visible={visibleBanner} 
            onPress={()=>setVisibleBanner(false)}   />
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{height:10}}></View>
                        <View style={styles.rowBox}>
                            
                            <View style={{width: '50%', height: 50, backgroundColor: 'powderblue',marginRight:5}}>
                                <Text>Hi 1</Text>
                            </View>
                            <View style={{width: '50%', height: 50, backgroundColor: 'powderblue'}}>
                            <Text>Hi 2</Text>
                            </View>
                           
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>

            <FullScreenLoader status={loaderStatus} />
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Calibri'
    },
    rowBox:{
        flex: 1, 
        flexDirection: 'row'
    }
});
