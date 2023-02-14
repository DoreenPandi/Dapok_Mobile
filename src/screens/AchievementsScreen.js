import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import Layout from '../components/Layout'
import { auth, db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { Card, Title } from 'react-native-paper'
import { NativeBaseProvider, Progress } from 'native-base';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function AchievementsScreen() {



    const [user, setUser] = useState()
    const [contributions, setContributions] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

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



    async function fetchContributions() {
        if (auth.currentUser?.uid != null) {
            const contributionsRef = collection(db, "contributions")
            const q = query(contributionsRef, where("UserID", "==", auth.currentUser?.uid), where("Status", "==", "Accepted"))

            const qSnapshot = await getDocs(q)


            if (q) {
                let contributionsDetails = []
                qSnapshot.forEach((doc) => {
                    contributionsDetails.push(doc.data())
                })

                setContributions(contributionsDetails)

            } else {
                console.log("Something went wrong")
            }
        }
    }

    useEffect(() => {
        if (auth.currentUser?.uid != null) {
            fetchContributions()
        }
    }, [])


    return (
        <Layout>
            <NativeBaseProvider>
                <ScrollView style={styles.scroll}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={{ overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Image
                            source={require("../assets/img/level-badge.png")}
                            style={styles.levelBadge}
                        />
                        <View style={styles.textView}>
                            <Text variant="displayLarge" style={{ fontSize: 40, color: '#fff', fontWeight: 'bold', }}>
                                {
                                    // Level
                                    contributions.length >= 0 && contributions.length <= 20 ? (
                                        1
                                    ) : contributions.length >= 21 && contributions.length <= 30 ? (
                                        2
                                    ) : contributions.length >= 31 && contributions.length <= 40 ? (
                                        3
                                    ) : contributions.length >= 41 && contributions.length <= 50 ? (
                                        4
                                    ) : contributions.length >= 51 && contributions.length <= 60 ? (
                                        5
                                    ) : contributions.length >= 61 && contributions.length <= 70 ? (
                                        6
                                    ) : contributions.length >= 71 && contributions.length <= 80 ? (
                                        7
                                    ) : contributions.length >= 81 && contributions.length <= 90 ? (
                                        8
                                    ) : contributions.length >= 91 && contributions.length <= 100 ? (
                                        9
                                    ) : 0
                                }
                            </Text>
                        </View>
                    </View>
                    <Card style={{ borderRadius: 10, marginTop: 30, padding: 10, marginBottom: 30 }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                <View>
                                    <Title style={{ marginTop: -13, marginBottom: -5, fontWeight: 'bold', textAlign: "center" }}>{contributions.length || 0}</Title>
                                    <Text variant="labelSmall" style={{ fontStyle: "normal", fontWeight: "400", fontSize: 10 }}>Contributions</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "bold", alignContent: "center", alignItems: "center", alignSelf: "center" }}>|</Text>
                                    <Text style={{ fontWeight: "bold", alignContent: "center", alignItems: "center" }}></Text>
                                </View>
                                <View>
                                    <Title style={{ marginTop: -13, marginBottom: -5, fontWeight: 'bold', textAlign: "center" }}>{contributions.length || 0}</Title>
                                    <Text variant="labelSmall" style={{ fontStyle: "normal", fontWeight: "400", fontSize: 10 }}>Points</Text>
                                </View>
                            </View>
                            <Progress value={contributions.length} _filledTrack={{ bg: "#e2a300" }} style={{ marginTop: 10, height: 10 }} />
                            <View style={{ marginBottom: -5, flexDirection: "row", justifyContent: "space-between" }}>
                                {
                                    contributions.length >= 0 || contributions.length <= 20 ? (
                                        <>
                                            <Text variant="labelSmall">0 points</Text>
                                            <Text variant="labelSmall">20 points</Text>
                                        </>
                                    ) : contributions.length >= 21 || contributions.length <= 30 ? (
                                        <>
                                            <Text variant="labelSmall">21 points</Text>
                                            <Text variant="labelSmall">30 points</Text>
                                        </>
                                    ) : contributions.length >= 31 || contributions.length <= 40 ? (
                                        <>
                                            <Text variant="labelSmall">31 points</Text>
                                            <Text variant="labelSmall">40 points</Text>
                                        </>
                                    ) : contributions.length >= 41 || contributions.length <= 50 ? (
                                        <>
                                            <Text variant="labelSmall">41 points</Text>
                                            <Text variant="labelSmall">50 points</Text>
                                        </>
                                    ) : contributions.length >= 51 || contributions.length <= 60 ? (
                                        <>
                                            <Text variant="labelSmall">51 points</Text>
                                            <Text variant="labelSmall">60 points</Text>
                                        </>
                                    ) : contributions.length >= 61 || contributions.length <= 70 ? (
                                        <>
                                            <Text variant="labelSmall">61 points</Text>
                                            <Text variant="labelSmall">70 points</Text>
                                        </>
                                    ) : contributions.length >= 71 || contributions.length <= 80 ? (
                                        <>
                                            <Text variant="labelSmall">71 points</Text>
                                            <Text variant="labelSmall">80 points</Text>
                                        </>
                                    ) : contributions.length >= 81 || contributions.length <= 90 ? (
                                        <>
                                            <Text variant="labelSmall">81 points</Text>
                                            <Text variant="labelSmall">90 points</Text>
                                        </>
                                    ) : contributions.length >= 91 || contributions.length <= 100 ? (
                                        <>
                                            <Text variant="labelSmall">91 points</Text>
                                            <Text variant="labelSmall">100 points</Text>
                                        </>
                                    ) : ""
                                }
                            </View>
                        </Card.Content>
                    </Card>

                    <Title style={styles.titleBadge}>Badges</Title>
                    <Card style={{ marginTop: 30 }}>
                        <Card.Content>
                            <View style={styles.viewBadge}>
                                <View>
                                    <Image source={
                                        contributions.length >= 0 && contributions.length <= 20 ? (
                                            require("./../assets/img/badge/iron-1.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Iron I</Text>
                                </View>
                                <View>
                                    <Image source={
                                        contributions.length >= 21 && contributions.length <= 30 ? (
                                            require("./../assets/img/badge/iron-2.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Iron II</Text>
                                </View>
                                <View>
                                    <Image source={
                                        contributions.length >= 31 && contributions.length <= 40 ? (
                                            require("./../assets/img/badge/iron-3.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Iron III</Text>
                                </View>
                            </View>
                            <View style={styles.viewBadge}>
                                <View>
                                    <Image source={
                                        contributions.length >= 41 && contributions.length <= 50 ? (
                                            require("./../assets/img/badge/bronze-1.jpg")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Bronze I</Text>
                                </View>
                                <View>
                                    <Image source={
                                        contributions.length >= 51 && contributions.length <= 60 ? (
                                            require("./../assets/img/badge/bronze-2.jpg")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Bronze II</Text>
                                </View>
                                <View>
                                    <Image source={
                                        contributions.length >= 61 && contributions.length <= 70 ? (
                                            require("./../assets/img/badge/bronze-3.jpg")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Bronze III</Text>
                                </View>
                            </View>
                            <View style={styles.viewBadge}>
                                <View>
                                    <Image source={
                                        contributions.length >= 71 && contributions.length <= 80 ? (
                                            require("./../assets/img/badge/silver-1.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Silver I</Text>
                                </View>
                                <View>
                                    <Image source={
                                        contributions.length >= 81 && contributions.length <= 90 ? (
                                            require("./../assets/img/badge/silver-2.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Silver II</Text>
                                </View>
                                <View>
                                    <Image source={
                                        contributions.length >= 91 && contributions.length <= 100 ? (
                                            require("./../assets/img/badge/silver-3.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Silver III</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <View>
                                    <Image source={
                                        contributions.length >= 101 && contributions.length <= 1000 ? (
                                            require("./../assets/img/badge/gold-1.png")
                                        ) : require("./../assets/img/badge-rounded.png")
                                    } style={{ width: 80, height: 80 }} />
                                    <Text style={{ textAlign: "center" }}>Gold I</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </NativeBaseProvider>
        </Layout >
    )
}

const styles = StyleSheet.create({
    levelBadge: {
        width: 80,
        height: 80,

    },
    textView: {
        position: "absolute",
        bottom: 0,
        top: -20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBadge: {
        color: "#1F2D49",
        fontWeight: "800",
        textTransform: "uppercase",
        textAlign: "center",
        alignItems: "center",
        margintop: 40
    },
    viewBadge: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})