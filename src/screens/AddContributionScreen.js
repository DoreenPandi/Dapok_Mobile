import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../components/Layout'
import { Title, Button} from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, orderBy, limit } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { Toast } from 'toastify-react-native';
import { AppContext } from '../store'; 
import TextInput from '../components/TextInput';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function AddContributionScreen({ route, navigation }) {

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [user, setUser] = useState()

    const [originalSentence, setOriginalSentence] = useState("")
    const [translatedlSentence, setTranslatedlSentence] = useState("")
    const [repository, setRepository] = useState([])
    const [random, setRandom] = useState("")
    const [disable, setDisable] = useState(false);
    const [documentRepoID, setDocumentRepoID] = useState("")

    const { state, dispatch } = useContext(AppContext)

    const { originalLanguage, translatedLanguage } = route.params;

    const [selectedLanguage, setSelectedLanguage] = useState([])

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

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
        console.log(translatedLanguage);
        console.log(originalLanguage);
        if (auth.currentUser?.uid != null) {
            fetchUser()
        }
    }, [])

    let savedata3 = []
    const [savedata, setsavedata] = useState([])

    useEffect(() => {
        if (auth.currentUser?.uid != null) {
            async function fetchRepository() {
                if (auth.currentUser?.uid != null) {
                    const repositoryRef = collection(db, "Repository")

                    if (originalLanguage == "Mandaya") {
                        const p = query(repositoryRef, orderBy("MandayaCount", "desc"), limit(1));
                        const qSnapshot2 = await getDocs(p)
                        if (p) {
                            let savedata2 = []
                            qSnapshot2.forEach((doc) => {
                                const data = doc.data()
                                data.id = doc.id;
                                savedata2.push(data)
                            })
                            savedata3 = savedata2;
                        } else {
                            console.log("Something went wrong")
                        }
                        console.log(savedata3)
                        const countvariable = savedata3[0]
                        const countresult = countvariable.MandayaCount;
                        const countfinal = countresult / 2;
                        console.log(countfinal)
                        console.log(originalLanguage)
                        const q = query(repositoryRef, where("MandayaCount", "<=", countfinal + 1) && where(originalLanguage, "!=", ""))
                        // add where for filter random repository
                        const qSnapshot = await getDocs(q)

                        if (q) {
                            let repositoryDetails = []
                            qSnapshot.forEach((doc) => {
                                const data = doc.data()
                                data.id = doc.id;
                                repositoryDetails.push(data)
                            })
                            setRepository(repositoryDetails)
                        } else {
                            console.log("Something went wrong")
                        }
                    }
                    else if (originalLanguage == "Cebuano") {
                        const p = query(repositoryRef, orderBy("CebuanoCount", "desc"), limit(1));
                        const qSnapshot2 = await getDocs(p)
                        if (p) {
                            let savedata2 = []
                            qSnapshot2.forEach((doc) => {
                                const data = doc.data()
                                data.id = doc.id;
                                savedata2.push(data)
                            })
                            savedata3 = savedata2
                        } else {
                            console.log("Something went wrong")
                        }
                        console.log(savedata3)
                        const countvariable = savedata3[0]
                        const countresult = countvariable.CebuanoCount;
                        const countfinal = countresult / 2;
                        console.log(countfinal)
                        console.log(originalLanguage)
                        const q = query(repositoryRef, where("CebuanoCount", "<=", countfinal + 1) && where(originalLanguage, "!=", ""))
                        // add where for filter random repository
                        const qSnapshot = await getDocs(q)

                        if (q) {
                            let repositoryDetails = []
                            qSnapshot.forEach((doc) => {
                                const data = doc.data()
                                data.id = doc.id;
                                repositoryDetails.push(data)
                            })
                            setRepository(repositoryDetails)
                        } else {
                            console.log("Something went wrong")
                        }
                    }
                    else if (originalLanguage == "Tagalog") {
                        const p = query(repositoryRef, orderBy("TagalogCount", "desc"), limit(1));
                        const qSnapshot2 = await getDocs(p)
                        if (p) {
                            let savedata2 = []
                            qSnapshot2.forEach((doc) => {
                                const data = doc.data()
                                data.id = doc.id;
                                savedata2.push(data)
                            })
                            savedata3 = savedata2
                        } else {
                            console.log("Something went wrong")
                        }
                        console.log(savedata3)
                        const countvariable = savedata3[0]
                        const countresult = countvariable.TagalogCount;
                        const countfinal = countresult / 2;
                        console.log(countfinal)
                        console.log(originalLanguage)
                        const q = query(repositoryRef, where("TagalogCount", "<=", countfinal + 1) && where("Mandaya", "!=", ""))
                        // add where for filter random repository
                        const qSnapshot = await getDocs(q)

                        if (q) {
                            let repositoryDetails = []
                            qSnapshot.forEach((doc) => {
                                const data = doc.data()
                                data.id = doc.id;
                                repositoryDetails.push(data)
                            })
                            setRepository(repositoryDetails)
                        } else {
                            console.log("Something went wrong")
                        }
                    }

                }
            }
            fetchRepository()

        }
    }, [])

    const generatePhrase = () => {
        if (repository.length > 0) {
            const randomRepo = repository[Math.floor(Math.random() * repository.length)];
            setRandom(randomRepo)
            console.log(random)
            setDisable(false)
        }
    }
    const onSubmit = () => {

        if (auth.currentUser?.uid != null) {
            if (translatedlSentence == '') {
                Toast.error("Translated sentence  cannot be blank!");
            } else {
                const addContribution = setDoc(doc(db, "contributions", makeId(20)), {
                    ApprovedBy: "",
                    Contributor: user.firstname + " " + user.lastname,
                    DateApproved: "",
                    Score: "",
                    Status: "Pending",
                    UserID: user.uid,
                    RepoID: random.id,
                    originallanguage: originalLanguage,
                    originalsentence: originalLanguage == "Cebuano" ?
                        random.Cebuano
                        : originalLanguage == "Tagalog" ?
                            random.Tagalog
                            : originalLanguage == "Mandaya" ?
                                random.Mandaya
                                : "",
                    translatedlanguage: translatedLanguage,
                    translatedsentence: translatedlSentence,
                    timestamp: new Date()
                })


                if (addContribution) {
                    if (random.id != null) {
                        const repositoryRef = doc(db, "Repository", random.id)
                        if (originalLanguage == "Cebuano") {
                            const q = updateDoc(repositoryRef, {
                                CebuanoCount: random.CebuanoCount + 1,
                            })
                            if (q) {
                                console.log("Successfully Update.")
                            } else {
                                console.log("Something went wrong!.")
                            }
                        }
                        if (originalLanguage == "Tagalog") {
                            const q = updateDoc(repositoryRef, {
                                TagalogCount: random.TagalogCount + 1,
                            })
                            if (q) {
                                console.log("Successfully Update.")
                            } else {
                                console.log("Something went wrong!.")
                            }
                        }

                        if (originalLanguage == "Mandaya") {
                            const q = updateDoc(repositoryRef, {
                                MandayaCount: random.MandayaCount + 1,
                            })
                            if (q) {
                                console.log("Successfully Update.")
                            } else {
                                console.log("Something went wrong!.")
                            }
                        }
                    }
                    Toast.success("Successfully Saved"); 
                    setOriginalSentence("")
                    setTranslatedlSentence("")
                } else {
                    console.log(error)
                }
            }
        }
    }


    return (
        <Layout>
            <ScrollView style={styles.scroll}
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View>
                    <View style={styles.viewContent}>
                        {/* <PaperSelect
                            label="Select Language"
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
                            arrayList={[...selectedLanguage]}
                            selectedArrayList={language.selectedList}
                            errorText={language.error}
                            textInputMode="flat"
                            searchStyle={{ iconColor: 'red' }}
                            searchPlaceholder="Search"
                            modalCloseButtonText="Cancel"
                            modalDoneButtonText="Select"
                            theme={{
                                colors: {
                                    placeholder: "black"
                                }
                            }}
                            style={styles.selectOption}
                        /> */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 14 }}>Translate from: <Title style={styles.title}>{originalLanguage}</Title></Text>
                            <Button mode="contained" style={{
                                width: 110,
                                backgroundColor: "#1F2D49",
                                height: 40,
                                borderRadius: 15,
                                color: "#fff",
                                borderColor: "#1F2D49", 
                                fontSize: 2,
                                padding: 0,
                                margin: 0
                            }}
                                onPress={generatePhrase}
                                disabled={disable} 
                            >
                                Generate
                            </Button>
                        </View>
                        <TextInput
                            multiline
                            style={{ backgroundColor: "#fff" }}
                            mode="outlined"
                            numberOfLines={4}
                            placeholder="Original sentence..."
                            value={originalSentence.value}
                            defaultValue={
                                originalLanguage == "Cebuano" ?
                                    random.Cebuano
                                    : originalLanguage == "Tagalog" ?
                                        random.Tagalog
                                        : originalLanguage == "Mandaya" ?
                                            random.Mandaya
                                            : ""
                            }
                            onChangeText={(text) => setOriginalSentence(text)}
                            disabled={true}
                        />
                    </View>
                    <View style={styles.viewContent}>
                        <Title style={{ fontSize: 14 }}>Translate to: <Title style={styles.title}>{translatedLanguage}</Title></Title>
                        <TextInput
                            multiline
                            style={{ backgroundColor: "#fff" }}
                            mode="outlined"
                            numberOfLines={4}
                            placeholder="Translation..."
                            value={translatedLanguage.value}
                            onChangeText={(text) => setTranslatedlSentence(text)}
                        />
                    </View>
                    <View style={[styles.viewContent, { flexDirection: "row", justifyContent: "space-between", }]}>
                        <View>
                            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
                                Back
                            </Button>
                        </View>
                        <View>
                            <Button mode="contained" style={styles.button} onPress={onSubmit}>
                                Submit
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Layout >
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginTop: 20
    },
    viewContent: {
        marginBottom: 30
    },
    selectOption: {
        marginBottom: 20
    },
    title: {
        fontWeight: "bold",
        textTransform: 'capitalize',
        marginBottom: 20
    },
    button: {
        backgroundColor: "#1F2D49",
        height: 40,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#1F2D49",
        fontWeight: "bold",
        width: 100
    },
})