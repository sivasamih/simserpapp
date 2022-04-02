import React, { useState } from "react";
import {
    Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView,
    ScrollView,
} from "react-native";
import { IconButton,List } from 'react-native-paper';

const ModalComponent = ({ modalVisible, setModalVisible, modalContent }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                        <IconButton
                            icon="close"
                            color="#0072bc"
                            size={20}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                    <View style={{height:350}}>
                        <SafeAreaView>
                            <ScrollView>
                                {modalContent}
                            </ScrollView>
                        </SafeAreaView>
                        <View style={{ height: 30 }}></View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: "#eceff1", 
        borderRadius: 20,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalComponent;