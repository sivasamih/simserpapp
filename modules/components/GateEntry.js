import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";

import { BottomNavigation } from 'react-native-paper';

import SectionComponent from "../reusablecomponents/SectionComponent";

const GateEntrySection = () => <>
    <View style={styles.container}>
        <View style={styles.marginLeftRight5}>
            <SectionComponent title="Take Entry" />
            <Text>Gate Entry Insert.....</Text>
        </View>
    </View>
</>;

const GateEntryStats = () => <>
    <View style={styles.container}>
        <View style={styles.marginLeftRight5}>
            <SectionComponent title="Entry Details" />
            <Text>Gate Entry Details.....</Text>
        </View>
    </View>
</>;

export default function GateEntry({ route, navigation }) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'section1', title: 'Take Entry', icon: 'boom-gate' },
        { key: 'section2', title: 'Details', icon: 'gate-arrow-right' },
    ]);

    useEffect(() => {
        console.log("---------------------------------------------------------");
        console.log("route > ", route);
        console.log("navigation > ", navigation);
        console.log("---------------------------------------------------------");
    }, []);

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
    container:{
        flex:1
    },
    marginLeftRight5: {
        marginLeft: 5,
        marginRight: 5
    },
});
