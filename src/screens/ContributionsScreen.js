import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl, StyleSheet, View, Image, Text } from "react-native"
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import Layout from '../components/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ContributionsScreen({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [contributions, setContributions] = useState([])


    async function getContributions() {
        const contributionsCol = collection(db, "contributions")
        const q = query(contributionsCol, where("UserID", "==", auth.currentUser?.uid))

        const qSnapshot = await getDocs(q);

        if (q) {
            let contributions = [];
            qSnapshot.forEach((doc) => {
                contributions.push(doc.data())
            })
            setContributions(contributions)
        } else {
            console.log("Something went wrong")
        } 
    }

    useEffect(() => {
        getContributions()
    }, [])

    return (
        <Layout>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <ScrollView style={styles.scroll}
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    contributions.length > 0 ? (
                        contributions.map((row, index) => (
                            <Card
                                key={index + 1}
                                style={styles.card}
                                onPress={() => {
                                    navigation.navigate("ViewContributionScreen", {
                                        status: row.Status,
                                        originalLanguage: row.originallanguage,
                                        originalSentence: row.originalsentence,
                                        created_at: row.timestamp,
                                        translatedLanguage: row.translatedlanguage,
                                        translatedSentence: row.translatedsentence
                                    })
                                }}
                            >
                                <View style={styles.cardView}>
                                    <View>
                                        <Card.Content style={styles.cardContent}>
                                            <Title>Original "{row.originallanguage}"</Title>
                                            <Paragraph style={{ color: "#0C79F3" }}>{row.originalsentence}</Paragraph>
                                        </Card.Content>

                                        <Card.Content style={styles.cardContent}>
                                            <Title>Translation "{row.translatedlanguage}"</Title>
                                            <Paragraph style={{ color: "#015A4A" }}>{row.translatedsentence}</Paragraph>
                                        </Card.Content>
                                    </View>
                                    <View>
                                        <Image
                                            source={
                                                row.Status == "Accepted" ?
                                                    require('../assets/img/accepted.png')
                                                    : row.Status == "Pending" ?
                                                        require('../assets/img/pending.png')
                                                        : row.Status == "Rejected" ?
                                                            require('../assets/img/rejected.png')
                                                            : ""
                                            }
                                        />
                                    </View>
                                </View>
                            </Card>
                        ))
                    ) :
                        <Text>No contributions made.</Text>
                }


            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginTop: 20
    },
    card: {
        marginTop: 20
    },
    cardView: {
        marginTop: 20, marginBottom: 20, flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardContent: {
        marginBottom: 20
    }
})