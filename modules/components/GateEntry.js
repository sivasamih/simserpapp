import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { BottomNavigation, List, IconButton, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

import SectionComponent from "../reusablecomponents/SectionComponent";
import CalenderComponent from "../reusablecomponents/CalenderComponent";
import ModalComponent from "../reusablecomponents/ModalComponent";

const today = moment().format("YYYY-MM-DD");

const currentTime = moment().format('LT');


export default function GateEntry({ route, navigation }) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'section1', title: 'Take Entry', icon: 'boom-gate' },
        { key: 'section2', title: 'Details', icon: 'gate-arrow-right' },
    ]);
    const [gateEntryList, setGateEntryList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('2022-04-02');


    const [showDatePopUp, setShowDatePopUp] = useState(false);
    const [dateTimeMode, setdateTimeMode] = useState(null);
    const [entryDate, setEntryDate] = useState(new Date());
    const [entryTime, setEntryTime] = useState(new Date());
    const [selectedEntryDate, setSelectedEntryDate] = useState(today);
    const [selectedEntryTime, setSelectedEntryTime] = useState(currentTime);
    const [supplierInput, setSupplierInput] = useState('');
    const [supplierList, setSupplierList] = useState([]);

    useEffect(() => {
        console.log("---------------------------------------------------------");
        console.log("route > ", route);
        console.log("navigation > ", navigation);
        console.log("---------------------------------------------------------");
        const gateEntryList = [
            {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            }, {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            }, {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            }, {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            }, {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            }, {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            }, {
                id: 1,
                title: "Container",
                desc: "13' - From France, Machine and parts",
                time: "10:30AM"
            },
        ];
        setGateEntryList(gateEntryList);



    }, []);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePopUp(false);
        setEntryDate(currentDate);
        console.log("----------> currentDate > ", currentDate);
        switch (dateTimeMode) {
            case "date":
                setSelectedEntryDate(moment(currentDate).format("YYYY-MM-DD"));
                break;
            case "time":
                setSelectedEntryTime(moment(currentDate).format('LT'));
                break;
            default:
                break;
        }

    };

    const showMode = (currentMode) => {
        switch (currentMode) {
            case "date":
                setdateTimeMode(currentMode);
                setShowDatePopUp(true);
                break;
            case "time":
                setdateTimeMode(currentMode);
                setShowDatePopUp(true);
                break;
            default:
                break;
        }
    };

    const viewGateEntryList = () => {
        console.log("In viewGateEntryList");
        setModalVisible(true);
    }

    const GateEntrySection = () => <>
        {showDatePopUp && (
            <DateTimePicker
                style={styles.dateSelector}
                mode={dateTimeMode}
                value={entryDate}
                onChange={onChange} />
        )}
        <View style={styles.container}>
            <View style={styles.marginLeftRight5}>
                <SectionComponent title="Take Entry" />
                <View style={{ marginLeft: 9 }}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={{ height: 10 }}></View>
                            <View style={styles.rowBox}>
                                <View style={styles.col6}>
                                    <TextInput
                                        placeholder="Select Date"
                                        selectionColor={null}
                                        underlineColor={null}
                                        activeUnderlineColor="#000"
                                        value={selectedEntryDate}
                                        disabled={true}
                                        right={<TextInput.Icon onPress={(e) => showMode('date')} name="calendar-range" />}
                                    />
                                </View>
                                <View style={styles.colgap}></View>
                                <View style={styles.col6}>
                                    <TextInput
                                        placeholder="Select Time"
                                        selectionColor={null}
                                        underlineColor={null}
                                        activeUnderlineColor="#000"
                                        value={selectedEntryTime}
                                        disabled={true}
                                        right={<TextInput.Icon onPress={(e) => showMode('time')} name="update" />}
                                    />
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <View style={styles.col12}>




                                </View>
                            </View>

                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        </View>
    </>;

    const GateEntryStats = () => <>
        <ModalComponent
            title={"Gate Entries on " + selectedDate}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalContent={
                <>
                    {gateEntryList.length > 0 ? gateEntryList.map((item, i) => (
                        <List.Item
                            key={"GE_" + item.title + i}
                            title={item.title}
                            description={item.desc + " | " + item.time}
                            left={props => <List.Icon {...props} icon="package-variant-closed" />}
                        />
                    )) : (
                        <List.Item
                            key={"GE_" + item.title}
                            title="No Entry"
                            description=""
                            left={props => <List.Icon {...props} icon="package-variant-closed" />}
                        />
                    )}
                </>
            }
        />
        <View style={styles.container}>
            <View style={styles.marginLeftRight5}>
                <CalenderComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <View style={{ height: 20 }}></View>
                <SectionComponent title="Details" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ marginLeft: 20 }}>
                            {gateEntryList.length > 0 ? (
                                <List.Item
                                    title={"Total " + gateEntryList.length + " entries available"}
                                    description=""
                                    left={props => <List.Icon {...props} icon="package-variant-closed" />}
                                    right={props => (
                                        <>
                                            <IconButton
                                                icon="eye"
                                                color="#0072bc"
                                                size={20}
                                                onPress={() => viewGateEntryList()}
                                            />
                                        </>
                                    )}
                                />
                            ) : (
                                <List.Item
                                    title="No Entry"
                                    description=""
                                    left={props => <List.Icon {...props} icon="package-variant-closed" />}
                                />
                            )}



                        </View>
                    </ScrollView>
                </SafeAreaView>


            </View>
        </View>
    </>;


    return (
        <>
            <BottomNavigation
                barStyle={{ backgroundColor: '#009688' }}
                activeColor="#000"
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={BottomNavigation.SceneMap({
                    section1: GateEntrySection,
                    section2: GateEntryStats,
                })
                }
            />
        </>
    );
}

const styles = StyleSheet.create({
    bottomNavigation: {
        backgroundColor: '#39b54a'
    },
    container: {
        flex: 1
    },
    marginLeftRight5: {
        marginLeft: 5,
        marginRight: 5
    },
    container1: {
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
    col12: {
        width: '100%',
        height: 90
    },
    colgap: {
        width: '1.5%',
        height: 90
    },
    col6: {
        width: '48.5%',
        height: 90
    },
    dateSelector: {
        display: "none"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
