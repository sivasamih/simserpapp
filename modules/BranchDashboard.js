import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text,
} from "react-native";

import { TextInput, Button, Surface, TouchableRipple, Searchbar } from 'react-native-paper';



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


function MenuCard({ title, screenPath, route, navigation }) {
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
        <View style={styles.colhalf}>
            <View style={styles.marginLeftRight5}>
                <TouchableRipple rippleColor="rgba(104, 143, 173)" style={styles.surface} onPress={() => optionClicked(screenPath)}>
                    <Text style={styles.menuCardTitle}>{title}</Text>
                </TouchableRipple>
            </View>
        </View>
    );
}


export default function BranchDashboard({ route, navigation }) {
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const [visibleBanner, setVisibleBanner] = React.useState(true);
    const [bannerMessage, setBannerMessage] = React.useState("Notice notification will be shown here...");
    const [menuListMaster, setMenuListMaster] = React.useState([
        {
            title: "IN & OUT",
            screenPath: "INOUT"
        }, {
            title: "Gate Entry",
            screenPath: "Gate Entry"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }
    ]);
    const [menuList, setMenuList] = React.useState([
        {
            title: "IN & OUT",
            screenPath: "INOUT"
        }, {
            title: "Gate Entry",
            screenPath: "Gate Entry"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }, {
            title: "Stock In",
            screenPath: "Stock In"
        }
    ]);


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


    const searchMenu = (input) => {
        console.log("searchMenu  > input > ", input);
        let menuList = [];
        menuList = menuListMaster.filter(o =>
            Object.keys(o).some(k => o[k].toLowerCase().includes(input.toLowerCase())));
        console.log("searchMenu  > menuList > ", menuList);
        setMenuList(menuList);
    }

    return (
        <>
            {/* <TopBanner
                message={bannerMessage}
                visible={visibleBanner}
                onPress={() => setVisibleBanner(false)} /> */}

            {/* <View>
                <View style={styles.searchInputView}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(e) => searchMenu(e)}
                    />

                </View>
            </View> */}
            {/* <View style={{ height: 5 }}></View> */}

            <SafeAreaView>
                <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
                    <View style={styles.container}>

                        <View style={styles.welcomeWrapper}>

                            <View style={{ width: '70%' }}>
                                <View style={{ marginLeft: -50, marginTop: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Dashboard</Text>
                                    <Text style={{ fontSize: 18, color: '#cddc39' }}>{sessionData.head ? "Hi " + sessionData.head.firstName : "Hi"}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.controlSpace}>
                            {menuList.map((item, i) => (
                                <MenuCard
                                    key={item.title + "_" + i}
                                    title={item.title}
                                    screenPath={item.screenPath}
                                    route={route} navigation={navigation} />
                            ))}
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>

            <FullScreenLoader status={loaderStatus} />
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0072bc",//"#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Calibri',
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
    },
    colhalf: {
        minWidth: '50%',
        maxWidth: '50%',
        width: '50%',
        height: 80,
        padding: 8,
    },
    welcomeWrapper: {
        flexDirection: 'row',
        marginLeft: 20,
        alignContent: 'flex-end',
        marginBottom: -50
    },
    controlSpace: {
        paddingTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 50,
        marginTop: 90,
    },

    searchInputView: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    searchTextInput: {
        color: '#bdbdbd'
    }
});




