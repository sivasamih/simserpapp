import React from "react";
import {
    StyleSheet,
} from "react-native";

import { Picker } from '@react-native-picker/picker';


export default function PickerInput({ label,style, selectedValue, onValueChange,options,enabled }) {
    return (
        <Picker
            enabled={enabled}
            style={style}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            <Picker.Item label={label} value="0" />
            {options.map((item,i)=>(
                <Picker.Item label={item.label} value={item.value} />
            ))}
        </Picker>
    );
}

const styles = StyleSheet.create({


});
