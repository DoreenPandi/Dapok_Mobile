import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import Button from '../components/Button'
import { theme } from '../core/theme'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Toast } from "toastify-react-native"
import { auth } from '../firebase'
import { AppContext } from '../store'
import Layout from '../components/Layout'


export default function LoginScreen({ navigation }) {

    const { state, dispatch } = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);

    const login = () => {
        if (email == '') {
            Toast.error("Email cannot be blank!");
        } else if (password == '') {
            Toast.error("Password cannot be blank!");
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res)
                    const user = res.user;
                    Toast.success("Successfully Login");
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        Toast.error("That email address is invalid!");
                    } else if (error.code === 'auth/wrong-password') {
                        Toast.error("Wrong password!");
                    } else if (error.code == 'auth/user-not-found') {
                        Toast.error("User not found!");
                    }

                    console.log(error)
                })
        }
    }


    return (
        <Layout>
            <Image
                source={require('../assets/img/house-dapok.png')}
                style={styles.image}
            />
            <TextInput
                label="Email"
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={email.value}
                onChangeText={(text) => setEmail(text)}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                style={styles.textInput}

            />
            <TextInput
                label="Password"
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                value={password.value}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={secureTextEntryPassword}
                right={
                    <TextInput.Icon
                        name="eye"
                        onPress={() => {
                            setSecureTextEntryPassword(!secureTextEntryPassword);
                            return false;
                        }}
                    />
                }
                style={styles.textInput}
            />
            <Button mode="contained" style={styles.button} onPress={login}>
                Login
            </Button>
            <View style={styles.row}>
                <Text >Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Layout>

    )
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 200,
        marginBottom: 8,
        marginTop: 50
    },
    textInput: {
        marginBottom: 20,
        backgroundColor: "#fff"
    },
    input: {
        height: 44,
        backgroundColor: "#F5F5F5",
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: "#D1CFCF",
        // borderRadius: 12,
    },
    button: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#1F2D49",
        fontWeight: "bold",
        marginBottom: 70
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        paddingTop: 40
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})