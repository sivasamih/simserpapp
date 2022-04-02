import React, { useState } from "react";
import {
    Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView,
    ScrollView,
} from "react-native";
import { IconButton } from 'react-native-paper';

const ModalComponent = ({ modalVisible, setModalVisible, modalContent,title }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.rowBox}>
                        <View style={styles.col8}>
                            <View style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                                <View style={{ marginLeft: 15, marginTop: 5 }}>
                                    <Text style={{ fontSize: 15,letterSpacing:1, color:'#0072bc' }}>{title}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <View style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                                <IconButton
                                    icon="close"
                                    color="#0072bc"
                                    size={20}
                                    onPress={() => setModalVisible(!modalVisible)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 35 }}></View>
                    <View style={{ height: 400 }}>
                        <SafeAreaView>
                            <ScrollView>
                                {modalContent}
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                    <View style={{ height: 15 }}></View>
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
    },
    rowBox: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    col8: {
        width: '80%',
        height: 90
    },
    col2: {
        width: '20%',
        height: 90
    },
});

export default ModalComponent;