import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    LogBox 
} from "react-native";
import axios from "axios";

import { BottomNavigation, List, IconButton, TextInput,Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import MultiSelect from 'react-native-multiple-select';
import moment from "moment";

import PickerInput from "../reusablecomponents/PickerInput";
import MultiSelectInput from "../reusablecomponents/MultiSelectInput";

import SectionComponent from "../reusablecomponents/SectionComponent";
import CalenderComponent from "../reusablecomponents/CalenderComponent";
import ModalComponent from "../reusablecomponents/ModalComponent";
import FullScreenLoader from "../reusablecomponents/FullScreenLoader";
import AlertBar from "../reusablecomponents/AlertBar";
import * as APIURLS from '../helpers/apiconstant';
import * as FETCHAPI from '../helpers/fetchapi';
import * as REUSABLES from '../helpers/reusables';

const today = moment().format("YYYY-MM-DD");
const currentTime = moment().format("HH:mm");


const headers = {
    "Content-Type": "application/json",
  };

  const fontSize=14;

  const documentTypeList=[
      {
        label:"Document",
        value:"1"
      },
      {
        label:"Goods",
        value:"2"
      },
      {
        label:"Visitor",
        value:"3"
      }
  ];

  

  

export default function GateEntry({ route, navigation }) {
    const [sessionData, setSessionData] = useState({});
    const [branchID, setBranchID] = useState(0);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'section1', title: 'Take Entry', icon: 'boom-gate' },
        { key: 'section2', title: 'Details', icon: 'gate-arrow-right' },
    ]);
    
    const [gateEntryList, setGateEntryList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        // console.log("---------------------------------------------------------");
        // console.log("route > ", route);
      try{
        getSessionData();     
        setBranchID(parseInt(route.params.params.branchID)); 
      }catch(ex){}
        

        // console.log("---------------------------------------------------------");
       

    }, []);


    const getSessionData = async () => {
        try {
            const sessionData = await REUSABLES.getStoredSessionData();
            setSessionData(sessionData);
        } catch (ex) {
            // console.log("-------> getSessionData ex > ", ex);
        }
    }

    const getGateEntryList=async()=>{
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

        const sessionData = await REUSABLES.getStoredSessionData();
        let reqData = {
            validUser: {
                UserID: sessionData.head.userID,
                Token: sessionData.head.token
            },
            branchID: branchID,
            date: today
        };

        try {
            axios
                .post("", reqData, { headers })
                .then((response) => {
                    console.log("response > ", response);
                    setGateEntryList(gateEntryList);
                })
                .catch((error) => {
                    console.log("getGateEntryList > error > ", error);
                });
        } catch (ex) { }
    }

    const updateInput = (inputValue) => {
        // console.log("updateInput > ",inputValue);
      };

      const handleChange = (e) => {
        // console.log("handleChange > e > ",e);
      };

    const viewGateEntryList = () => {
        // console.log("In viewGateEntryList");
        setModalVisible(true);
    }

    const GateEntrySection = () => {
        const [showDatePopUp, setShowDatePopUp] = useState(false);
        const [dateTimeMode, setdateTimeMode] = useState(null);
        const [entryDate, setEntryDate] = useState(new Date());
        const [entryTime, setEntryTime] = useState(currentTime);        
        const [selectedEntryDate, setSelectedEntryDate] = useState(today);
        const [selectedEntryTime, setSelectedEntryTime] = useState(currentTime);
        const [documentType, setDocumentType] = useState('');
        const [vehicleNo, setVehicleNo] = useState('');
        const [driverName, setDriverName] = useState('');
        const [refNo, setRefNo] = useState('');
        const [deliverTo, DeliverTo] = useState('');
        
        const [branch, setBranch] = useState({});
        const [supplierInput, setSupplierInput] = useState([]);
        const [supplierList, setSupplierList] = useState([]);

        const [loaderStatus, setLoaderStatus] = useState(false);
        const [alertBarStatus, setAlertBarStatus] = useState(false);
        const [alertBarMessage, setAlertBarMessage] = useState(null);

        const onDismissSnackBar = () => setAlertBarStatus(false);

        useEffect(() => {    
            // console.log("$$$$$ GateEntrySection > branchID > ",branchID); 
            const ac = new AbortController();       
            getSuppliers();

            //return () => ac.abort();
            return () => {
                setSupplierList([]);
            };
        }, []);

        const getValidUserData=async()=>{
            const sessionData = await REUSABLES.getStoredSessionData();
            const token = sessionData.head.token;
            let validUser={
                UserID:sessionData.head.userID,
                Token:sessionData.head.token
            }
            return validUser;
        }
        

        const getSuppliers=async()=>{
            const validUser=await getValidUserData();
            // console.log("supplierList > validUser > ",validUser);
            let reqData={
                ValidUser: validUser,
                Supplier: {
                    BranchID: parseInt(branchID)
                  }
            };  
           
            axios
            .post(APIURLS.APIURL.GetSuppliersByBranchID, reqData, { headers })
            .then((response) => {
            //   console.log("getSuppliers > response > ",response);
                try {
                    let data = response.data;
                    let Branch = data.Branch[0];                    
                    let supplierData = data.Supplier;
                    let supplierList = [];
                    for (let supplier of supplierData) {
                        supplierList.push({
                            id: supplier.SuplID,
                            name: supplier.Name
                        });
                    }
                    // console.log("supplierList > ", supplierList);
                    setSupplierList(supplierList);
                    setBranch(Branch);
                    setLoaderStatus(false);
                } catch (ex) { }  
              
            })
            .catch((error) => {
                // console.log("supplierList > error > ",error);
            });
            
        }

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
                    // setSelectedEntryTime(moment(currentDate).format('LT'));
                    setSelectedEntryTime(moment(currentDate).format('HH:mm'));
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

        const saveGateEntry = async () => {
            if (isValidEntry() === true) {
                try {
                    const sessionData = await REUSABLES.getStoredSessionData();
                    const token = sessionData.head.token;
                    console.log("-------> token  > ", token);
                    let validUser={
                        UserID:sessionData.head.userID,
                        Token:sessionData.head.token
                    }
                    console.log("branch > ",branch);
                    console.log("branch.GENo > ",branch.GENo);

                    let reqData={
                        validUser:validUser,
                        GateEntry:{
                            NoSeriesID:parseInt(branch.GENo),  
                            GEID :0,
                            No  :"",
                            EntryDate  :moment(selectedEntryDate).format("YYYY-MM-DD"),
                            EntryTime :selectedEntryTime,
                            DocumentType:isNaN(parseInt(documentType))?0:parseInt(documentType),
                            VehicleNo:vehicleNo,
                            Name:driverName,
                            RefNo:refNo,
                            DeliverTo:deliverTo,
                            SuppID:parseInt(isNaN(supplierInput[0])?0:supplierInput[0]),
                            BranchID:branchID
                        }
                    }; 

                    console.log("reqData > ",reqData);
                   
                    axios
                    .post(APIURLS.APIURL.Add_Update_GateEntry, reqData, { headers })
                    .then((response) => {
                        console.log("response > ",response);
                    })
                    .catch((error) => {
                        console.log("saveGateEntry > error > ",error);
                    });
                    

                } catch (ex) {
                    
                }
            } else {
                setAlertBarStatus(true);
                setAlertBarMessage("Enter Details Properly.");
            }
        }

        const isValidEntry=()=>{
            let isValid=false;
            if(
                documentType!=="" &&
                deliverTo!==""
            ){
                isValid=true;
            }
            return isValid;
        }

        const setSupplier=selectedItems=>{
            {console.log("----------------------------")}
            {console.log("setSupplier > item > ",selectedItems)}
            setSupplierInput(selectedItems)
        }


        return (
            <>

                <FullScreenLoader status={loaderStatus} backgroundColor='red'/>
                <AlertBar status={alertBarStatus} message={alertBarMessage} onDismissSnackBar={onDismissSnackBar} />

                {showDatePopUp && (
                    <DateTimePicker
                        style={styles.dateSelector}
                        mode={dateTimeMode}
                        value={entryDate}
                        // dateFormat="longtime"
                        is24Hour={true}
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
                                                style={styles.textInput}
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
                                                style={styles.textInput}
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
                                            <PickerInput
                                             label="Type"
                                             style={styles.Picker}
                                             selectedValue={documentType}
                                             onValueChange={(itemValue, itemIndex) =>
                                                 setDocumentType(itemValue)
                                             }
                                             options={documentTypeList}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.rowBox,{marginBottom:-5,marginTop:20}]}>
                                        <View style={styles.col12}>
                                            <MultiSelectInput
                                                styleDropdownMenu={styles.autocompleteInput}
                                                styleDropdownMenuSubsection={styles.styleDropdownMenuSubsection}
                                                styleTextDropdown={styles.styleTextDropdown}
                                                styleInputGroup={styles.autocompleteInputInputGroup}
                                                styleRowList={styles.autocompleteInputstyleRowList}
                                                styleTextDropdownSelected={styles.styleTextDropdownSelected}
                                                selectText="Supplier"
                                                searchInputPlaceholderText="Supplier"
                                                hideTags={true}
                                                options={supplierList}
                                                uniqueKey="id"
                                                onSelectedItemsChange={setSupplier}
                                                selectedItems={supplierInput}
                                                single={true}
                                                searchInputStyle={{ color: '#000' }}
                                                selectedItemTextColor="#000"
                                            />
                                        </View>
                                    </View>
                                   

                                    <View style={styles.rowBox}>
                                        <View style={styles.col12}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Vehicle No"
                                                selectionColor="#000"
                                                underlineColor={null}
                                                activeUnderlineColor="#000"
                                                value={vehicleNo}
                                                onChangeText={(vno) => setVehicleNo(vno)}   
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.rowBox}>
                                        <View style={styles.col12}>
                                            <TextInput
                                             style={styles.textInput}
                                                placeholder="Name"
                                                selectionColor="#000"
                                                underlineColor={null}
                                                activeUnderlineColor="#000"
                                                value={driverName}
                                                onChangeText={(dname) => setDriverName(dname)}   
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.rowBox}>
                                        <View style={styles.col12}>
                                            <TextInput
                                             style={styles.textInput}
                                                placeholder="Reference No."
                                                selectionColor="#000"
                                                underlineColor={null}
                                                activeUnderlineColor="#000"
                                                value={refNo}
                                                onChangeText={(refno) => setRefNo(refno)}   
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.rowBox}>
                                        <View style={styles.col12}>
                                            <TextInput
                                             style={styles.textInput}
                                                placeholder="Deliver To?"
                                                selectionColor="#000"
                                                underlineColor={null}
                                                activeUnderlineColor="#000"
                                                value={deliverTo}
                                                onChangeText={(deliverto) => DeliverTo(deliverto)}   
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.rowBox}>
                                        <View style={styles.col12}>
                                            <Button icon="content-save" mode="contained" color="#39b54a" onPress={() => saveGateEntry()}>
                                                Save
                                            </Button>
                                        </View>
                                    </View>

                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    </View>
                </View>
            </>
        )
    }
  

    const GateEntryStats = () => {
        const [selectedCalenderDate, setSelectedCalenderDate] = useState(today);
        

        const processCalenderDate=(date)=>{
            console.log("processCalenderDate > date > ",date);
            setSelectedCalenderDate(date);
        }

        return (
            <>
                <ModalComponent
                    title={"Gate Entries on " + selectedCalenderDate}
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
                        <CalenderComponent selectedDate={selectedCalenderDate} setSelectedDate={processCalenderDate} />
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
            </>
        )
    }
 


    return (
        <>
            <BottomNavigation
                barStyle={{ backgroundColor: '#0072bc' }}
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
        marginTop: 5
    },
    col12: {
        width: '100%',
        // height: 90
    },
    colgap: {
        width: '1.5%',
        // height: 90
    },
    col6: {
        width: '48.5%',
        // height: 90
    },
    dateSelector: {
        display: "none"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize:fontSize
    },
    Picker:{
        height: 40, 
        backgroundColor:'#e0e0e0',
        color:"#616161" ,
        fontSize:fontSize
    },
    autocompleteInput: {
        height: 45,
        backgroundColor:'#e0e0e0',
        fontSize:fontSize
    },
    styleDropdownMenuSubsection:{
        backgroundColor:'#e0e0e0',
        height: 45,
        fontSize:fontSize
    },
    autocompleteInputInputGroup:{
        height: 45,
        paddingLeft:10,
        backgroundColor:'#e0e0e0',
        fontSize:fontSize
    },
    autocompleteInputstyleRowList:{
      height:40 ,
      color:"#000" 
    },
    styleTextDropdownSelected:{
        color:"#000",
        paddingLeft:15,
        fontSize:fontSize 
    },
    styleTextDropdown:{
        paddingLeft:15,
        fontSize:fontSize 
    },
    textInput:{
        height:45,
        fontSize:fontSize
    }
});
