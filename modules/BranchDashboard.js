import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text,

} from "react-native";

import { TextInput, Button, Surface, TouchableRipple } from 'react-native-paper';

import Logo from '../assets/B1.png';
import * as APIURLS from './helpers/apiconstant';
import * as FETCHAPI from './helpers/fetchapi';
import * as REUSABLES from './helpers/reusables';


import FullScreenLoader from "./reusablecomponents/FullScreenLoader";
import TopBanner from "./reusablecomponents/TopBanner";
import SectionComponent from "./reusablecomponents/SectionComponent";

const headers = {
    "Content-Type": "application/json",
};


export default function BranchDashboard({ route, navigation }) {
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const [visibleBanner, setVisibleBanner] = React.useState(true);
    const [bannerMessage, setBannerMessage] = React.useState("Notice notification will be shown here...");


    useEffect(() => {
        console.log("route > ", route);
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

    const optionClicked = (input) => {
        console.log("Clicking on  > ", input);
        switch (input) {
            case "Gate Entry":
                console.log("Clicking on  > route > ", route);
                navigation.navigate('GateEntry', route)
                break;
            default:
                break;
        }
    }


    return (
        <>
            {/* <TopBanner
                message={bannerMessage}
                visible={visibleBanner}
                onPress={() => setVisibleBanner(false)} /> */}

            <SectionComponent title="ACTION MENU" />
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.rowBox}>
                            <View style={styles.col6}>
                                <View style={styles.marginLeftRight5}>
                                    <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked("Gate Entry")}>
                                        <Text style={styles.menuCardTitle}>Gate Entry</Text>
                                    </TouchableRipple>
                                </View>
                            </View>
                            <View style={styles.col6}>
                                <View style={styles.marginLeftRight5}>
                                    <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked("col 2")}>
                                        <Text style={styles.menuCardTitle}>Stock In</Text>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowBox}>
                            <View style={styles.col6}>
                                <View style={styles.marginLeftRight5}>
                                    <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked("col 1")}>
                                        <Text style={styles.menuCardTitle}>Stock Out</Text>
                                    </TouchableRipple>
                                </View>
                            </View>
                            <View style={styles.col6}>
                                <View style={styles.marginLeftRight5}>
                                    <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked("col 2")}>
                                        <Text style={styles.menuCardTitle}>PO List</Text>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowBox}>
                            <View style={styles.col6}>
                                <View style={styles.marginLeftRight5}>
                                    <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked("col 1")}>
                                        <Text style={styles.menuCardTitle}>Menu 3</Text>
                                    </TouchableRipple>
                                </View>
                            </View>
                            <View style={styles.col6}>
                                <View style={styles.marginLeftRight5}>
                                    <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked("col 2")}>
                                        <Text style={styles.menuCardTitle}>Menu 4</Text>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>

            <SectionComponent title="SECTION 2" />
            <View style={styles.container}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ height: 10 }}></View>

                        <View style={styles.rowBox}>
                            <View style={styles.col6}>

                            </View>
                            <View style={styles.col6}>

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
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Calibri'
    },
    rowBox: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    col6: {
        width: '50%',
        height: 90
    },

    marginLeftRight5: {
        marginLeft: 5,
        marginRight: 5
    },
    surface: {
        // borderRadius:10,
        padding: 8,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        backgroundColor: '#b3e5fc'
    },
    menuCardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#004d40',
        letterSpacing: 1.2
    }
});
