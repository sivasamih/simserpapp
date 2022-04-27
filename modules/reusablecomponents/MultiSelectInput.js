import React  from "react";
import {
    StyleSheet,
} from "react-native";

import MultiSelect from 'react-native-multiple-select';


export default function MultiSelectInput(props) {
    return (
        <MultiSelect
        styleDropdownMenu={props.autocompleteInput}
        styleDropdownMenuSubsection={props.styleDropdownMenuSubsection}
        styleTextDropdown={props.styleTextDropdown}
        styleInputGroup={props.autocompleteInputInputGroup}
        styleRowList={props.autocompleteInputstyleRowList}
        styleTextDropdownSelected={props.styleTextDropdownSelected}
        selectText={props.selectText}
        searchInputPlaceholderText={props.searchInputPlaceholderText}
        hideTags={props.hideTags}
        items={props.options}
        uniqueKey={props.uniqueKey}
        onSelectedItemsChange={props.onSelectedItemsChange}
        selectedItems={props.selectedItems}
        single={props.single}
        searchInputStyle={props.searchInputStyle}
        selectedItemTextColor={props.selectedItemTextColor}
    />
    );
}

const styles = StyleSheet.create({


});
