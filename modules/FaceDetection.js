import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import { Button } from 'react-native-paper';

export default function FaceDetection() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [caturedImage, setCaturedImage] = useState(null);


    let camera: Camera;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    const takePicture = async () => {
        const photo = await camera.takePictureAsync();
        console.log("takePicture > photo > ", photo);
        setCaturedImage(photo.uri);
    }

    const handleFacesDetected = ({ faces }) => {
       // takePicture();
       if(faces.length>0){
        console.log(faces);
       }
       
        
    };


    return (
        <View style={styles.container}>
            <View style={styles.camContainer}>
                <Camera



                    style={styles.camera}
                    type={type}
                    ref={(r) => {
                        camera = r
                    }}
                    onFacesDetected={handleFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                        runClassifications: FaceDetector.FaceDetectorClassifications.none,
                        minDetectionInterval: 100,
                        tracking: true,
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>

            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '90%',
                    marginBottom: 10
                }}
            >
                <ImageBackground
                    source={{ uri: caturedImage }}
                    style={{
                        flex: 1
                    }}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    camera: {
        flex: 1,

    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    button2: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    camContainer: {
        height: 350
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        fontFamily: 'Calibri'
    },


});
