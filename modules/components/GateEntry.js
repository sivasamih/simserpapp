import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableHighlight
} from "react-native";
import { BottomNavigation, List } from 'react-native-paper';


import SectionComponent from "../reusablecomponents/SectionComponent";
import CalenderComponent from "../reusablecomponents/CalenderComponent";



export default function GateEntry({ route, navigation }) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'section1', title: 'Take Entry', icon: 'boom-gate' },
        { key: 'section2', title: 'Details', icon: 'gate-arrow-right' },
    ]);
    const [gateEntryList, setGateEntryList] = useState([]);

    useEffect(() => {
        console.log("---------------------------------------------------------");
        console.log("route > ", route);
        console.log("navigation > ", navigation);
        console.log("---------------------------------------------------------");
        const gateEntryList=[
            {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            }, {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            }, {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            }, {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            }, {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            }, {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            }, {
                id:1,
                title:"Container",
                desc:"13' - From France, Machine and parts",
                time:"10:30AM"
            },
        ];
        setGateEntryList(gateEntryList);
    }, []);

   const viewGateEntryList=()=>{
       console.log("In viewGateEntryList");
   }

    const GateEntrySection = () => <>
        <View style={styles.container}>
            <View style={styles.marginLeftRight5}>
                <SectionComponent title="Take Entry" />
                <View style={{ marginLeft: 9 }}>
                    <Text>Gate Entry Insert.....</Text>
                </View>
            </View>
        </View>
    </>;

    const GateEntryStats = () => <>
        <View style={styles.container}>
            <View style={styles.marginLeftRight5}>
                <CalenderComponent />
                <View style={{height:20}}></View>
                <SectionComponent title="Details" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ marginLeft: 20 }}>
                        {gateEntryList.length > 0 ?(
                                <List.Item
                                    title={"Total "+gateEntryList.length+" entries available"}
                                    description=""
                                    left={props => <List.Icon {...props} icon="package-variant-closed" />}
                                    right={props => (
                                        <>
                                        <TouchableHighlight onPress={()=>viewGateEntryList()}>
                                          <List.Icon {...props} icon="eye" color="#0072bc"/>
                                        </TouchableHighlight>
                                        
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

                            {/* {gateEntryList.length > 0 ? gateEntryList.map((item, i) => (
                                <List.Item
                                    title={item.title}
                                    description={item.desc + " | " + item.time}
                                    left={props => <List.Icon {...props} icon="package-variant-closed" />}
                                />
                            )) : (
                                <List.Item
                                    title="No Entry"
                                    description=""
                                    left={props => <List.Icon {...props} icon="package-variant-closed" />}
                                />
                            )} */}

                        </View>
                    </ScrollView>
                </SafeAreaView>


            </View>
        </View>
    </>;


    const renderScene = BottomNavigation.SceneMap({
        section1: GateEntrySection,
        section2: GateEntryStats,
    });




    return (
        <BottomNavigation
            barStyle={{ backgroundColor: '#39b54a' }}
            activeColor="#000"
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
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
});
