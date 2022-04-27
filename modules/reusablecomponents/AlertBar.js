import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
} from "react-native";

import {Snackbar  } from 'react-native-paper';


export default function AlertBar({ status, message,onDismissSnackBar }) {
    return (
        <Snackbar
        style={styles.snackbar}
            visible={status}
            onDismiss={onDismissSnackBar}
            action={{
                label: 'Close',
                onPress: () => onDismissSnackBar,
            }}>
            {message}
        </Snackbar>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.6,
        marginTop: -50,
        alignItems: 'center'
    },
    snackbar:{
        backgroundColor:'#ffab40',
    }

});
