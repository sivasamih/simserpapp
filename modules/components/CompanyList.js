import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
} from "react-native";

import {Avatar, Card, IconButton, List, TouchableRipple } from 'react-native-paper';

export default function CompanyList({ sessionData,  logout,openBranchDashboard }) {

    useEffect(() => {
    }, []);


    return (
        <View>
            <Card>
                <Card.Title
                    titleStyle={styles.titleStyle}
                    title={sessionData.head ? "Hi " + sessionData.head.firstName : "Hi"}
                    subtitle="Welcome to SIMS APP"
                    left={(props) => <Avatar.Text size={50} label={sessionData.head ?sessionData.head.firstName.charAt(0) : "SG"} style={styles.avatar} />}
                    right={(props) => <IconButton {...props} icon={require('../../assets/icons/logout.png')} onPress={() => logout()} />}
                />
                <Card.Content>
                    <View style={{ height: 20 }}></View>
                    <List.AccordionGroup>
                        {sessionData.companies ? sessionData.companies.companyList ? sessionData.companies.companyList.map((company, i) => (
                            <>
                                <List.Accordion style={styles.accordList} titleStyle={styles.listTitleStyle} title={company.compName} id={company.compName + "_" + i} key={company.compName + "_" + i}>
                                    <View style={styles.accordContentArea}>
                                    {company.branchList ? company.branchList.map((branch, j) => (
                                        <>
                                            <TouchableRipple key={"TR_"+company.compName+"_"+i+"_"+"_"+j} rippleColor="rgba(104, 143, 173)" onPress={() => openBranchDashboard(branch)} >
                                                <List.Item  key={"LITM_"+company.compName+branch.branchName+"_"+i+"_"+"_"+j}  title={branch.branchName} titleStyle={styles.listItemTitleStyle}/>
                                            </TouchableRipple>
                                        </>
                                    )) : null}
                                    </View>
                                </List.Accordion>
                            </>
                        )) : null : null}
                    </List.AccordionGroup>
                </Card.Content>
            </Card>
        </View>
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
        letterSpacing:0.1,
        fontWeight:"500",
        fontSize:16
    },
    listItemTitleStyle:{

    },
    accordContentArea: {
        // borderStyle: "solid",
        // borderWidth: 1,
        marginBottom:5,
        backgroundColor:'#e0f2f1'
    }
});
