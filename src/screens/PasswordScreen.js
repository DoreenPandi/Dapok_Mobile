import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import TextInput from '../components/TextInput'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import Button from '../components/Button'
import { Toast } from "toastify-react-native"
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'


export default function PasswordScreen({ navigation }) {

    // const [user, setUser] = useState()


    const auth = getAuth();

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // async function fethcUser() {
    //     if (auth.currentUser?.id != null) {
    //         const userRef = collection(db, "users")
    //         const q = query(userRef, where("uid", "==", auth.currentUser?.uid))

    //         const qSnapshot = await getDocs(q)

    //         if (q) {
    //             let userDetails = []
    //             qSnapshot.foreach((doc) => {
    //                 userDetails.push(doc.data())
    //             })

    //             setUser(userDetails[0])
    //         } else {
    //             console.log("Something went wrong!")
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (auth.currentUser?.uid != null) {
    //         fethcUser()
    //     }
    // }, [])


    const updateAccount = async () => {
        // if (currentPassword == "") {
        //     Toast.error("Current Password cannot be blank!")
        // } else


        if (newPassword == "") {
            Toast.error("New Password cannot be blank!")
        } else if (confirmPassword == "") {
            Toast.error("Confirm Password cannot be blank!")
        } else if (newPassword != confirmPassword) {
            Toast.error("Password does not match!")
        } else {

            // const userRef = doc(db, "users", auth.currentUser?.uid)
            // const q = updateDoc(userRef, {
            //     firstname: firstname,
            //     lastname: lastname,
            // })

            const user = auth.currentUser

            const credentials = EmailAuthProvider.credential(user.email, currentPassword)

            try {

                await reauthenticateWithCredential(user, credentials)
                if (newPassword == confirmPassword) {

                    await updatePassword(auth.currentUser, newPassword)
                        .then(() => {
                            Toast.success("You have successfully update your account.")
                            navigation.navigate("HomeScreen")
                        }).catch((error) => {
                            Toast.error("Something went wrong!.")
                            console.log(error)
                        })
                }
            } catch (e) {
                Toast.error(e.code, e.message)
                // Could be incorrect credentials
            }


            // if (q) {

            // } else {


            // } 
        }
    }

    return (
        <Layout>
            <View style={styles.container}>
                {/* <TextInput
                    label="Current Password"
                    returnKeyType="next"
                    value={currentPassword.value}
                    onChangeText={(text) => setCurrentPassword(text)}
                /> */}
                <TextInput
                    label="New Password"
                    style={{ backgroundColor: "#fff" }}
                    returnKeyType="next"
                    value={newPassword.value}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    label="Confirm Password"
                    style={{ backgroundColor: "#fff" }}
                    returnKeyType="next"
                    value={confirmPassword.value}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                />
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