import React from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import LogoStart from '../components/LogoStart'
import { View, Text, StyleSheet } from 'react-native'

export default function StartScreen({ navigation }) {
    return (
        <Background>
            <LogoStart />
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.buttonLogin}
            >
                Log in
            </Button>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E3E3E3' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center', color: "#A3A3A3" }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E3E3E3' }} />
            </View>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
                style={styles.buttonRegister}
            >
                Sign Up
            </Button>
        </Background>
    )
}

const styles = StyleSheet.create({
    buttonLogin: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 12,
        color: "#fff",
        borderColor: "#1F2D49",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,

    },
    buttonRegister: {
        height: 44,
        borderRadius: 12,
        color: "#1F2D49",
        borderColor: "#1F2D49",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
    },
})