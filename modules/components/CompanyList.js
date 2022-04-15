import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView
} from "react-native";

import { Avatar, Card, IconButton, List, TouchableRipple } from 'react-native-paper';

export default function CompanyList({ sessionData, logout, openBranchDashboard }) {

    useEffect(() => {
        
    }, []);


    return (
        <>
            <Card key="CompList-Card">
                <Card.Title
                    key="CompList-CardTitle"
                    titleStyle={styles.titleStyle}
                    title={sessionData.head ? "Hi " + sessionData.head.firstName : "Hi"}
                    subtitle="Welcome to SIMS APP"
                    left={(props) => <Avatar.Text key="Comp-ct" size={50} label={sessionData.head ? sessionData.head.firstName.charAt(0) : "SG"} style={styles.avatar} />}
                    right={(props) => <IconButton key="Comp-ct-IB" {...props} icon={require('../../assets/icons/logout.png')} onPress={() => logout()} />}
                />
                <Card.Content key="CompList-CardContent">
                    <SafeAreaView key="SafeAreaView_1">
                        <ScrollView key="ScrollView_1">
                            <View key="CompList-View" style={{ height: 20 }}></View>
                            <List.AccordionGroup key="Comp-List-AccGrp">
                                {sessionData.companies ? sessionData.companies.companyList ? sessionData.companies.companyList.map((company, i) => (
                                    <View key={"P_V_"+company.compID}>
                                        <List.Accordion 
                                        id={"L_A_"+company.compName + "_" + i+"_ "+company.compID} 
                                        key={"L_A_"+company.compName + "_" + i+"_ "+company.compID} 
                                        style={styles.accordList} 
                                        titleStyle={styles.listTitleStyle} 
                                        title={company.compName} >
                                            <View key={"CompList-View-" + company.compName} style={styles.accordContentArea}>
                                                {company.branchList ? company.branchList.map((branch, j) => (
                                                    <>
                                                   
                                                        <TouchableRipple key={"TR_" + company.compName + "_" + i + "_" + "_" + j} rippleColor="rgba(104, 143, 173)" onPress={() => openBranchDashboard(branch)} >
                                                            <List.Item key={"LITM_" + company.compName + branch.branchName + "_" + i + "_" + "_" + j} title={branch.branchName} titleStyle={styles.listItemTitleStyle} />
                                                        </TouchableRipple>
                                                    </>
                                                )) : null}
                                            </View>
                                        </List.Accordion>
                                    </View>
                                )) : null : null}
                            </List.AccordionGroup>
                        </ScrollView>
                    </SafeAreaView>
                </Card.Content>
            </Card>
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#0072bc'
    },
    titleStyle: {
        color: 'rgb(1, 87, 155)'
    },
    accordList: {
        backgroundColor: '#39b54a',

    },
    listTitleStyle: {
        color: '#fff',
        letterSpacing: 0.1,
        fontWeight: "500",
        fontSize: 16
    },
    listItemTitleStyle: {

    },
    accordContentArea: {
        // borderStyle: "solid",
        // borderWidth: 1,
        marginBottom: 5,
        backgroundColor: '#e0f2f1'
    }
});
