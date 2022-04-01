import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text
} from "react-native";

import { Avatar, Card, IconButton, List, TouchableRipple, BottomNavigation } from 'react-native-paper';

const GateEntrySection = () => <>
    <View>
        <Text>Gate Entry Section</Text>
    </View>
</>;

const GateEntryStats = () => <>
    <View>
        <Text>Gate Entry Stats</Text>
    </View>
</>;;

export default function GateEntry({ route, navigation }) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'section1', title: 'Take Entry', icon: 'boom-gate' },
        { key: 'section2', title: 'Statistics', icon: 'gate-arrow-right' },
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
    }
});
