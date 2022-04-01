import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";

import { Modal, ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress';


export default function SectionComponent({ title }) {

    return (
        <>
            <View style={{ 
                height: 30, marginLeft: 5, marginTop: 5, 
                // backgroundColor: '#03a9f4', 
                alignItems: 'flex-start', alignContent: 'center', alignSelf: 'flex-start', width: '35%', borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
                <View style={{ marginLeft: 5, marginTop: 3 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#757575' }}>{title}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  
});
