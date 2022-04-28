import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Text
} from "react-native";
import { Button } from 'react-native-paper';

import * as APIURLS from './helpers/apiconstant';
import * as FETCHAPI from './helpers/fetchapi';
import * as REUSABLES from './helpers/reusables';

import CompanyList from "./components/CompanyList";
import FullScreenLoader from "./reusablecomponents/FullScreenLoader";
import AlertBar from "./reusablecomponents/AlertBar";

const headers = {
    "Content-Type": "application/json",
};

export default function Login({ navigation }) {
    const [userid, setUserid] = useState(null);
    const [password, setPassword] = useState(null);
    const [sessionData, setSessionData] = useState({});
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [alertBarStatus, setAlertBarStatus] = useState(false);
    const [alertBarMessage, setAlertBarMessage] = useState(null);

    useEffect(() => {
        if (sessionData === null) {
            REUSABLES.storeSessionData('sessionData', {});
            setSessionData({});
        }
        getSessionData();
    }, []);

    const processLogin = async () => {
        try {
            if (userid.trim() !== "" && password.trim() !== "") {
                setLoaderStatus(true);
                try {
                    const Data = {
                        loginId: userid,
                        password: password,
                        ClientInfo: ""
                    };
                    const res = await FETCHAPI.APICALL(APIURLS.APIURL.Login, Data, headers);

                    console.log("await res > ", res);

                    if (res.status === true) {
                        let data = await res.data;
                        if (data.head) {
                            if (data.head.status !== "UU") {
                                REUSABLES.storeSessionData('sessionData', await res.data);
                                getSessionData();
                                setLoaderStatus(false);
                            } else {
                                setPassword(null);
                                setLoaderStatus(false);
                                setAlertBarStatus(true);
                                setAlertBarMessage("Invalid Credentials");
                            }
                        }

                    } else {
                        setPassword(null);
                        setLoaderStatus(false);
                        setAlertBarStatus(true);
                        setAlertBarMessage("Invalid Credentials");
                    }

                } catch (ex) {
                    console.log("-------> ERROR ex > ", ex);
                    setLoaderStatus(false);
                    setAlertBarStatus(true);
                    setAlertBarMessage("API Error");
                }
            }
        } catch (ex) { }
    }

    const getSessionData = async () => {
        try {
            const sessionData = await REUSABLES.getStoredSessionData();
            setSessionData(sessionData);
        } catch (ex) {
            console.log("-------> getSessionData ex > ", ex);
        }
    }

    const logout = async () => {
        setLoaderStatus(true);
        try {
            console.log("logout > sessionData.head > ", sessionData.head);
            const Data = {
                "UserID": parseInt(sessionData.head.userID),
                "Token": sessionData.head.token
            };
            const res = await FETCHAPI.APICALL(APIURLS.APIURL.Logout, Data, headers);
            REUSABLES.storeSessionData('sessionData', {});
            setUserid(null);
            setPassword(null);
            setSessionData({});
            setLoaderStatus(false);
        } catch (ex) {
            setLoaderStatus(false);
        }
    }

    const openBranchDashboard = (branch) => {
        console.log("In openBranchDashboard");
        console.log("branch > ", branch);
        navigation.navigate('BranchDashboard', branch)
    }

    const onDismissSnackBar = () => setAlertBarStatus(false);

    return (
        <>
            {sessionData && sessionData !== {} ? sessionData.head ? (
                <>
                    <View style={styles.container2}>
                        <CompanyList key="companyList" sessionData={sessionData} logout={logout} openBranchDashboard={openBranchDashboard} />
                    </View>
                </>
            ) : (
                <>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#e3f2fd',
                        borderBottomLeftRadius: 250,
                    }}>
                        <View style={{ marginTop: 80, alignItems: 'center' }}>
                            <Image style={styles.image} source={require("../assets/B1.png")} />
                        </View>
                    </View>
                    <View style={styles.loginTextWrapper}>
                        <Text style={styles.loginText}>Login</Text>
                        <Text style={styles.loginTextCaption}>Please sign in to your account</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="User ID"
                                style={styles.TextInput}
                                value={userid}
                                onChangeText={(userid) => setUserid(userid)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder="Password"
                                style={styles.TextInput}
                                value={password}
                                secureTextEntry
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                        <View style={styles.loginBtn}>
                            <Button
                                style={styles.loginBtnElement}
                                mode="contained"
                                onPress={() => processLogin()}>
                                LOGIN
                            </Button>
                        </View>
                    </View>
                </>
            ) : null}
            <FullScreenLoader status={loaderStatus} />
            <AlertBar status={alertBarStatus} message={alertBarMessage} onDismissSnackBar={onDismissSnackBar} />
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container2: {
        backgroundColor: "#fff",
    },
    loginTextWrapper: {
        marginLeft: 55,
        marginBottom: 20
    },
    loginText: {
        color: '#0072bc',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    loginTextCaption: {
        color: '#bdbdbd'
    },
    image: {
        marginBottom: 40,
        width: '70%',
        height: 70,
    },
    image2: {
        marginBottom: 40,
        width: '75%',
        height: 75,
        alignItems: "center",
    },

    inputView: {
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 25,
        alignItems: "center",
    },

    TextInput: {
        backgroundColor: '#fff',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 40,
        lineHeight: 40,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 10,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },
    loginBtnElement: {
        backgroundColor: 'rgb(0, 114, 188)',
    }
});
