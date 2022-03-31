import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
} from "react-native";

import { Modal,ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress';
 

export default function FullScreenLoader({status}) {

    return (
        <Modal visible={status} contentContainerStyle={styles.containerStyle}>
          <Progress.CircleSnail size={60}  color={['red', 'green', '#0072bc']} />
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerStyle:{
        flex: 1,
        backgroundColor: 'black', 
        opacity:0.6,
        marginTop:-50,
        alignItems:'center'
    }
});
