import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";

import { TextInput, Button } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';



export default function Barcodescanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState(null);
    const [data, setData] = useState(null);


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setType(type);
        setData(data);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <>

            <View style={styles.container}>
                <View style={styles.barcodeScannerContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.insideSeconSecontainer}>
                    <View>
                        <Text style={styles.boldText}>TYPE : <Text style={styles.normalText}>{type}</Text></Text>
                        
                    </View>
                    <View>
                        <Text style={styles.boldText}>DATA :  <Text style={styles.normalText}>{data}</Text></Text>
                       
                    </View>
                    <View style={styles.tapBtn}>
                        <TouchableOpacity onPress={() => {
                            setScanned(false);
                            setType(null);
                            setData(null);
                        }} >
                            <Text style={styles.textColor}>Tap to Scan Again</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        </>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Calibri'
    },
    secondContainer: {
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        fontFamily: 'Calibri',

    },
    insideSeconSecontainer: {
        marginLeft: 50,
        marginRight: 10
    },
    barcodeScannerContainer: {
        height: 380,
        width: 250
    },
    tapBtn:{ marginTop: 10, 
        marginBottom:10,
        height:50,
        alignItems:'center',
        justifyContent: "center",
        paddingLeft:10,
        paddingRight:10 ,
        backgroundColor:'rgb(0, 114, 188)',
     },
     textColor:{
         color:'#fff'
     },
     boldText:{
        fontWeight:'bold'
     },
     normalText:{
        fontWeight:'normal'
     }
});
