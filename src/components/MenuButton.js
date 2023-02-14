import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Ionicons from "react-native-vector-icons/Ionicons"

export default function MenuButton() {
    return (
        <TouchableOpacity style={styles.container}>
            <Ionicons
                name="menu"
                size={35}
                color="black"
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


Ionicons