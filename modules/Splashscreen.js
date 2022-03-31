import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Logo from '../assets/B1.png';

export default function Splashscreen() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.brandLogo}
                source={Logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLogo: {
        width: '70%',
        height: 70,
    },
});
