import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView
} from "react-native";

import { TextInput, Button } from 'react-native-paper';

import Logo from '../assets/B1.png';
import * as APIURLS from './helpers/apiconstant';
import * as FETCHAPI from './helpers/fetchapi';
import * as REUSABLES from './helpers/reusables';


import FullScreenLoader from "./reusablecomponents/FullScreenLoader";

const headers = {
    "Content-Type": "application/json",
};


export default function BranchDashboard(props) {
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [sessionData, setSessionData] = useState({});

    useEffect(() => {
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
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView>

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
});
