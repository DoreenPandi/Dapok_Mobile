import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
// Ionicons

export default function BackButton({ goBack }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/img/arrow_back.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: -20 + getStatusBarHeight(),
        left: 4
    },
    image: {
        width: 25,
        height: 25
    }
})