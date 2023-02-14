import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import Layout from '../components/Layout'
import TextInput from '../components/TextInput'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore/lite'
import { Toast } from "toastify-react-native"

export default function AccountScreen({ navigation }) {

    const [user, setUser] = useState()


    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')


    async function fetchUser() {
        if (auth.currentUser?.uid != null) {
            const userRef = collection(db, "users")
            const q = query(userRef, where("uid", "==", auth.currentUser?.uid))

            const qSnapshot = await getDocs(q)

            if (q) {
                let userDetails = []
                qSnapshot.forEach((doc) => {
                    userDetails.push(doc.data())
                })

                setUser(userDetails[0])
                setFirstName(!user ? "" : user.firstname)
                setLastName(!user ? "" : user.lastname)
                setEmail(userDetails.map(row => row.email))



            } else {
                console.log("Something went wrong")
            }
        }
    }

    useEffect(() => {
        if (auth.currentUser?.uid != null) {
            fetchUser()
        }
    }, [])

    const updateAccount = () => {
        if (firstname == "") {
            Toast.error("Firstname cannot be blank!")
        } else if (lastname == "") {
            Toast.error("Lastname cannot be blank!")
        } else {
            if (auth.currentUser?.uid != null) {
                const userRef = doc(db, "users", auth.currentUser?.uid)
                const q = updateDoc(userRef, {
                    firstname: firstname,
                    lastname: lastname,
                })
                if (q) {
                    Toast.success("You have successfully update your account.")
                    navigation.navigate("HomeScreen")
                } else {
                    Toast.error("Something went wrong!.")

                }
            }
        }
    }

    return (
        <Layout>
            <View style={styles.container}>
                {
                    user != null ? (
                        <>
                            <TextInput
                                label="Firstname"
                                style={{ backgroundColor: "#fff" }}
                                returnKeyType="next"
                                value={firstname.value}
                                defaultValue={user.firstname}
                                onChangeText={(text) => setFirstName(text)}
                            />
                            <TextInput
                                label="Lastname"
                                style={{ backgroundColor: "#fff" }}
                                returnKeyType="next"
                                value={lastname.value}
                                defaultValue={user.lastname}
                                onChangeText={(text) => setLastName(text)}
                            />
                            <TextInput
                                label="Email"
                                style={{ backgroundColor: "#fff" }}
                                returnKeyType="next"
                                value={!user ? email.value : user.email}
                                onChangeText={(text) => setEmail(text)}
                                autoCapitalize="none"
                                disabled={true}
                            />
                        </>
                    ) : ""
                }
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Button mode="outlined" style={styles.button} onPress={updateAccount}>Save</Button>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        maxWidth: 340,
    },
    button: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        width: 180,
        borderColor: "#1F2D49",
        fontWeight: "bold",
    }
})