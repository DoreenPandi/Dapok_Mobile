import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase'
import Layout from '../components/Layout'
import { Card, Title, Text } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NativeBaseProvider, Progress } from 'native-base';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import Button from '../components/Button';
import { AppContext } from '../store';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeScreen({ navigation }) {

    const { state, dispatch } = useContext(AppContext)


    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);


    const [user, setUser] = useState()
    const [languages, setLanguage] = useState([])
    const [contributions, setContributions] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        fetchContributions()
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    async function getLanguages() {
        const languagesCol = collection(db, "language")

        const languagesSnapshot = await getDocs(languagesCol);
        let languages = [];
        languagesSnapshot.forEach((doc) => {
            languages.push(doc.data())
        })

        setLanguage(languages)
    }



    useEffect(() => {
        getLanguages()
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

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            fetchContributions()
            getLanguages()
        });
        return focusHandler;
    }, [navigation]);




    return (
        <Layout>
            <NativeBaseProvider>
                <ScrollView style={styles.scroll}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={fetchContributions}
                        />
                    }
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                        <View style={{ overflow: "hidden" }}>
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
                        <Card style={{ borderRadius: 10 }}>
                            <Card.Content>
                                <Title style={{ marginTop: -13, marginBottom: -5, fontWeight: 'bold', }}>{contributions.length || 0}</Title>
                                <Text variant="labelSmall" style={{ fontStyle: "normal", fontWeight: "400", fontSize: 10 }}>Contributions</Text>
                                <View style={{ width: 170 }} >
                                    <Progress value={contributions.length} _filledTrack={{ bg: "#e2a300" }} style={{ marginTop: 10, height: 10 }} />
                                </View>
                                <View style={{ marginBottom: -5, flexDirection: "row", justifyContent: "space-between" }}>
                                    {
                                        contributions.length >= 0 && contributions.length <= 20 ? (
                                            <>
                                                <Text variant="labelSmall">0</Text>
                                                <Text variant="labelSmall">20</Text>
                                            </>
                                        ) : contributions.length >= 21 && contributions.length <= 30 ? (
                                            <>
                                                <Text variant="labelSmall">21</Text>
                                                <Text variant="labelSmall">30</Text>
                                            </>
                                        ) : contributions.length >= 31 && contributions.length <= 40 ? (
                                            <>
                                                <Text variant="labelSmall">31</Text>
                                                <Text variant="labelSmall">40</Text>
                                            </>
                                        ) : contributions.length >= 41 && contributions.length <= 50 ? (
                                            <>
                                                <Text variant="labelSmall">41</Text>
                                                <Text variant="labelSmall">50</Text>
                                            </>
                                        ) : contributions.length >= 51 && contributions.length <= 60 ? (
                                            <>
                                                <Text variant="labelSmall">51</Text>
                                                <Text variant="labelSmall">60</Text>
                                            </>
                                        ) : contributions.length >= 61 && contributions.length <= 70 ? (
                                            <>
                                                <Text variant="labelSmall">61</Text>
                                                <Text variant="labelSmall">70</Text>
                                            </>
                                        ) : contributions.length >= 71 && contributions.length <= 80 ? (
                                            <>
                                                <Text variant="labelSmall">71</Text>
                                                <Text variant="labelSmall">80</Text>
                                            </>
                                        ) : contributions.length >= 81 && contributions.length <= 90 ? (
                                            <>
                                                <Text variant="labelSmall">81</Text>
                                                <Text variant="labelSmall">90</Text>
                                            </>
                                        ) : contributions.length >= 91 || contributions.length <= 100 ? (
                                            <>
                                                <Text variant="labelSmall">91</Text>
                                                <Text variant="labelSmall">100</Text>
                                            </>
                                        ) : ""
                                    }
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                    <View>
                        <Title>Hello, <Text style={{ fontWeight: "bold", }}>{user != undefined ? user.firstname + " " + user.lastname : ""}</Text></Title>
                        <Text style={{ color: "#0C79F3", marginTop: 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchContributions} />}>What would you like to contribute?</Text>
                    </View>
                    <View style={{
                        marginTop: 30,
                        alignItems: 'center'
                    }}>
                        <Carousel
                            ref={isCarousel}
                            data={languages}
                            renderItem={({ item }) => {
                                return (
                                    <View
                                        style={{
                                            padding: 20,
                                            borderRadius: 20,
                                            alignItems: 'center',
                                        }}>
                                        <Image source={{ uri: item.image }} style={{ width: "100%", height: 300 }} />
                                        <TouchableOpacity onPress={() => navigation.navigate("AboutTestScreen", { translatedLanguage: item.name })}>
                                            <Button style={styles.button}>Contribute</Button>
                                        </TouchableOpacity>
                                    </View >
                                )
                            }}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            onSnapToItem={index => setIndex(index)}
                        />
                        <Pagination
                            dotsLength={languages.length}
                            activeDotIndex={index}
                            carouselRef={isCarousel}
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 1,
                                backgroundColor: '#F4BB41',
                                marginTop: 0
                            }}
                            tappableDots={true}
                            inactiveDotStyle={{
                                backgroundColor: 'black',
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        </Layout >
    )
}


const styles = StyleSheet.create({
    levelBadge: {
        width: 90,
        height: 90,

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
    imageText: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#1F2D49",
        fontWeight: "bold",
        position: "relative",
        marginTop: -25,
        width: 150
    },
    buttonTest: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#1F2D49",
        fontWeight: "bold",
        marginBottom: 70
    }
})