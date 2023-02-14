import React from 'react'
import { StyleSheet, Text, Image, Dimensions } from 'react-native'

const win = Dimensions.get('window');

export default function LogoStart() {
    return (
        <>
            <Image
                source={require('../assets/img/mabuhay.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Get started by logging into your account.</Text>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 220,
        height: 220,
        marginBottom: 8,
        top: -40,
        left: -70,
        flexDirection: "row",
    },
    text: {
        width: 173,
        height: 36,
        left: -60,
        fontSize: 15,
        lineHeight: 18,
        color: "#7A7878",
        top: -30,
        marginBottom: 40,

    }
})