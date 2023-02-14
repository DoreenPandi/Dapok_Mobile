import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Layout from '../components/Layout'
import TextInput from '../components/TextInput'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore/lite'
import { Toast } from "toastify-react-native"
import { PaperSelect } from 'react-native-paper-select';



export const selectValidator = (value: any) => {
    if (!value || value.length <= 0) {
        return 'Please select a value.';
    }
    return '';
};

export default function EducationalBackgroundScreen({ navigation }) {

    const [user, setUser] = useState([])

    const [language, setLanguage] = useState({
        value: '',
        list: [
            { _id: '1', value: 'Cebuano - Beginner' },
            { _id: '2', value: 'Cebuano - Intermediate' },
            { _id: '3', value: 'Cebuano - Advanced' },
            { _id: '4', value: 'Mandaya - Beginner' },
            { _id: '5', value: 'Mandaya - Intermediate' },
            { _id: '6', value: 'Mandaya - Advanced' },
            { _id: '7', value: 'Tagalog - Beginner' },
            { _id: '8', value: 'Tagalog - Intermediate' },
            { _id: '9', value: 'Tagalog - Advanced' },
        ],
        selectedList: [],
        error: '',
    });

    const [educationAttainment, setEducationAttainment] = useState({
        value: '',
        list: [
            { _id: '1', value: 'No schooling' },
            { _id: '2', value: 'Elementary Graduate' },
            { _id: '3', value: 'Junior High School Graduate' },
            { _id: '4', value: 'Senior High School Graduate' },
            { _id: '5', value: 'College Undergraduate' },
            { _id: '6', value: 'Bachelor`s Degree' },
            { _id: '7', value: 'Master`s Degree' },
            { _id: '8', value: 'Doctoral Degree' },
        ],
        selectedList: [],
        error: '',
    });


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
        if (educationAttainment.value == "") {
            Toast.error("Educational Attainment cannot be blank!")
        } else if (language.value == "") {
            Toast.error("Language with fluency cannot be blank!")
        } else {
            if (auth.currentUser?.uid != null) {
                const userRef = doc(db, "users", auth.currentUser?.uid)
                const q = updateDoc(userRef, {
                    educattainment: educationAttainment.value,
                    languagespoken: language.value,
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
                <Text style={styles.titleText}>Educational Attainment: <Text style={styles.languageText}>{user.educattainment}</Text></Text>
                <Text style={styles.titleText}>Language Spoken and Fluency: <Text style={styles.languageText}>{user.languagespoken}</Text></Text>
                <PaperSelect
                    label="Highest Educational Attainment"
                    value={educationAttainment.value}
                    labelStyle={styles.text}
                    onSelection={(value: any) => {
                        setEducationAttainment({
                            ...educationAttainment,
                            value: value.text,
                            selectedList: value.selectedList,
                            error: '',
                        });
                    }}
                    arrayList={[...educationAttainment.list]}
                    selectedArrayList={educationAttainment.selectedList}
                    errorText={educationAttainment.error}
                    textInputMode="flat"
                    searchStyle={{ iconColor: 'red' }}
                    searchPlaceholder="Search"
                    modalCloseButtonText="Cancel"
                    modalDoneButtonText="Select"
                    theme={{
                        colors: {
                            placeholder: "#000"
                        }
                    }}
                    style={styles.selectOption}
                />
                <PaperSelect
                    label="What Language(s) do you speak?"
                    value={language.value}
                    labelStyle={styles.text}
                    onSelection={(value: any) => {
                        setLanguage({
                            ...language,
                            value: value.text,
                            selectedList: value.selectedList,
                            error: '',
                        });
                    }}
                    textInputColor="black"
                    arrayList={[...language.list]}
                    selectedArrayList={language.selectedList}
                    errorText={language.error}
                    multiEnable={true}
                    textInputMode="flat"
                    searchStyle={{ iconColor: 'red' }}
                    searchPlaceholder="Search"
                    modalCloseButtonText="Cancel"
                    modalDoneButtonText="Select"
                    theme={{
                        colors: { placeholder: 'black' }
                    }}
                    style={styles.selectOption}
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
    },
    titleText: {
        textAlign: "left",
        fontSize: 18,
        marginBottom: 20
    },
    languageText: {
        textAlign: "left",
        fontSize: 18,
        fontWeight: "bold"
    }
})