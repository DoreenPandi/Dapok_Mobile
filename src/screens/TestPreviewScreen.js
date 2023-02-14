import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Paragraph, Title, Text } from 'react-native-paper';
import Layout from '../components/Layout'
import { NativeBaseProvider } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import Button from '../components/Button';
import { Toast } from 'toastify-react-native';
export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);


export default function TestPreviewScreen({ navigation }) {


    const [user, setUser] = useState()
    const [languages, setLanguage] = useState([])

    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);

    async function getLanguages() {
        const languagesCol = collection(db, "translateLanguage")

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


    const onClickAction = async ({ translatedLanguage, originalLanguage }) => {
        // console.log("Data 1: ", translatedLanguage)
        // console.log("Data 2: ", originalLanguage) 
        const testScore = collection(db, "user_test_score")
        const q = query(testScore, where("uid", "==", auth.currentUser?.uid), where("original_language", "==", originalLanguage), where("translated_language", "==", translatedLanguage))

        const qSnapshot = await getDocs(q)

        if (q) {
            let testScoreDetails = []
            qSnapshot.forEach((doc) => {
                testScoreDetails.push(doc.data())
            })

            if (testScoreDetails.length > 0) {
                // navigation.navigate("AddContributionScreen", { translatedLanguage: translatedLanguage, originalLanguage: language.value })
                Toast.info("You already taken this test.")

            } else {
                navigation.navigate("TestScreen", { translatedLanguage: translatedLanguage, originalLanguage: originalLanguage })
                // Toast.info("You can only contribute if you have taken the Language Proficiency Test located in the menu.")

            }
        } else {
            console.log("Something went wrong")
        }
    }

    return (
        <View style={{ backgroundColor: "#1F2D49", flex: 1 }}>
            <Layout>
                <ScrollView>
                    <NativeBaseProvider>
                        <View style={{ alignItems: "center" }}>
                            <Image source={require('./../assets/img/atop-white.png')} style={{ width: 150, height: 50 }} />
                            <Title style={{ color: "#FFC122", fontWeight: "900", marginTop: 10 }}>LANGUAGE TEST</Title>
                            <Text style={{ color: "#fff", marginTop: 10, width: 250, textAlign: "justify" }}>Measure your command of a language with our free language proficiency tests.</Text>
                            <Paragraph style={{ color: "#fff", marginTop: 20, width: 250, textAlign: "justify", fontSize: 11 }}>We provide the opportunity for you to test your proficiency level in various Filipino languages.
                                {"\n"}
                                {"\n"}
                                A proficiency test is intended to measure your command of a language regardless of your background in that language.
                                {"\n"}
                                {"\n"}
                                We offer these tests for self-evaluation purposes only.</Paragraph>
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
                                                borderRadius: 50,
                                                alignItems: 'center',
                                            }}>
                                            <Image source={{ uri: item.Image }} style={{ width: "100%", height: 250 }} />
                                            {/* <TouchableOpacity onPress={() => navigation.navigate("AboutTestScreen", { translatedLanguage: item.name })}> */}
                                            {/* <TouchableOpacity onPress={() => navigation.navigate("TestScreen", { translatedLanguage: item.translatedLanguage, originalLanguage: item.originalLanguage })}> */}
                                            <TouchableOpacity onPress={() => onClickAction({ translatedLanguage: item.translatedLanguage, originalLanguage: item.originalLanguage })}>
                                                <Button style={styles.button}>Take Quiz</Button>
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
                    </NativeBaseProvider>
                </ScrollView>
            </Layout >
        </View>
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
        backgroundColor: "#fff",
        height: 44,
        borderRadius: 15,
        color: "#000",
        borderColor: "#fff",
        fontWeight: "bold",
        position: "relative",
        marginTop: -25,
        width: 150
    },
    buttonTest: {
        backgroundColor: "#fff",
        height: 44,
        borderRadius: 15,
        color: "#000",
        borderColor: "#fff",
        fontWeight: "bold",
        marginBottom: 70
    }
})