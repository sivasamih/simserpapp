import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
} from "react-native";
import { IconButton, Colors } from 'react-native-paper';


import DatePicker from 'react-native-modern-datepicker';

export default function CalenderComponent({selectedDate, setSelectedDate}) {
    // const [selectedDate, setSelectedDate] = useState('2022-04-02');
    return (
        <DatePicker
            mode="calendar"
            selected={selectedDate}
            onSelectedChange={date => {
                console.log("-> date > ", date)
                setSelectedDate(date)
            }}
            options={{
                selectedTextColor: '#000', 
              }}
        />

    );
}

const styles = StyleSheet.create({


});
