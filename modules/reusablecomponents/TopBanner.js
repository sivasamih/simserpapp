import * as React from 'react';
import {  StyleSheet,Text,View } from 'react-native';
import { Banner } from 'react-native-paper';

const TopBanner = ({visible,onPress,message}) => {

  return (
    <Banner
      
      visible={visible}
      actions={[
        {
          label: 'Hide',
          onPress: () => onPress(),
        }
      ]}
      >
      <Text>{message}</Text>
    </Banner>
  );
};

export default TopBanner;

const styles = StyleSheet.create({
    
    rowBox: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    

  
});