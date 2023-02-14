import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { Text, View, StyleSheet } from 'react-native'
import { Card, Title } from 'react-native-paper'
import { PaperSelect } from 'react-native-paper-select'
import Button from '../components/Button'
import Layout from '../components/Layout'
import TextInput from '../components/TextInput'
import { auth, db } from '../firebase'
import { Toast } from "toastify-react-native"



export default function AboutTestScreen({ route, navigation }) {


    const [user, setUser] = useState()

    const [originalSentence, setOriginalSentence] = useState("")
    const [translatedlSentence, setTranslatedlSentence] = useState("")
    const [repository, setRepository] = useState([])


    const { translatedLanguage } = route.params;

    const [selectedLanguage, setSelectedLanguage] = useState([])


    useEffect(() => {
        async function fetchLanguage() {
            const languageRef = collection(db, "language")
            const q = query(languageRef, where("name", "!=", translatedLanguage))

            const qSnapshot = await getDocs(q)

            if (q) {
                let details = [];
                qSnapshot.forEach((doc) => {
                    details.push(doc.data())
                })
                setSelectedLanguage(details.map((item, index) => ({
                    _id: index + 1,
                    value: item.name
                })))
            } else {
                Toast.error("Something went wrong!");
            }
        }
        fetchLanguage();
    }, [])

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


    const [language, setLanguage] = useState({
        value: '',
        list: [],
        selectedList: [],
        error: '',
    });

    const onClickAction = async () => {
        if (language.value == "") {
            Toast.error("Please select an original langauge");
        } else {
            const testScore = collection(db, "user_test_score")
            const q = query(testScore, where("uid", "==", auth.currentUser?.uid), where("original_language", "==", language.value), where("translated_language", "==", translatedLanguage))

            const qSnapshot = await getDocs(q)

            if (q) {
                let testScoreDetails = []
                qSnapshot.forEach((doc) => {
                    testScoreDetails.push(doc.data())
                })

                if (testScoreDetails.length > 0) {
                    navigation.navigate("AddContributionScreen", { translatedLanguage: translatedLanguage, originalLanguage: language.value })
                } else {
                    if (language.value != null) {
                        // navigation.navigate("TestScreen", { translatedLanguage: translatedLanguage, originalLanguage: language.value })
                        Toast.info("You can only contribute if you have taken the Language Proficiency Test located in the menu.")
                    }
                }
            } else {
                console.log("Something went wrong")
            }
        }
    }

    return (
        <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title style={styles.cardTitle}>Important</Title>
                        <Text style={styles.cardText}>{'\t'}You can only contribute
                            if you have taken the <Text style={{ fontWeight: "bold" }}> Language
                                Proficiency Test</Text> located in the menu.</Text>
                    </Card.Content>
                </Card>
            </View>
            <View style={{ marginTop: 50 }}>
                <Title style={{ marginTop: 10 }}>Source Language</Title>
                <PaperSelect
                    value={language.value}
                    onSelection={(value: any) => {
                        setLanguage({
                            ...language,
                            value: value.text,
                            selectedList: value.selectedList,
                            error: '',
                        });
                    }}
                    arrayList={[...selectedLanguage]}
                    selectedArrayList={language.selectedList}
                    errorText={language.error}
                    textInputMode="flat"
                    searchStyle={{ iconColor: 'red' }}
                    theme={{
                        colors: {
                            placeholder: "black"
                        }
                    }}
                />

            </View>
            <View>
                <Title style={{ marginBottom: 10 }}>Translated Language</Title>
                <TextInput
                    style={{ backgroundColor: "#fff" }}
                    mode="outlined"
                    placeholder="Translation..."
                    value={translatedLanguage.value}
                    defaultValue={translatedLanguage}
                    onChangeText={(text) => setTranslatedlSentence(text)}
                    disabled={true}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Button mode="contained" style={styles.button} onPress={onClickAction}>
                    Proceed
                </Button>
            </View>
        </Layout>
    )
}


const styles = StyleSheet.create({
    card: {
        top: 20,
        backgroundColor: "#1F2D49",
        borderRadius: 13
    },
    cardTitle: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold"
    },
    cardText: {
        textIndent: 20,
        margin: 20,
        color: "#fff",
        textAlign: "justify",
        alignItems: "center",
        flexDirection: "row"
    },
    button: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#1F2D49",
        fontWeight: "bold",
        width: 266,
        marginTop: 60,
        textAlign: "center",

    }
})
