import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { List, Text } from 'react-native-paper';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { RefreshControl, ScrollView } from 'react-native';

export default function AboutScreen() {

    const [expanded, setExpanded] = useState()
    const [refreshing, setRefreshing] = useState(false);


    const [aboutDapok, setAboutDapok] = useState([])

    const handlePress = () => setExpanded(!expanded);

    async function fetchAboutDapok() {
        const aboutDapokRef = collection(db, "AboutDapok")

        const q = query(aboutDapokRef, orderBy("Identifier", "asc"), limit(10))

        const aboutDapokSnapshot = await getDocs(aboutDapokRef)

        if (q) {
            let aboutDapoks = [];
            aboutDapokSnapshot.forEach((doc) => {
                aboutDapoks.push(doc.data())
            })
            setAboutDapok(aboutDapoks)
        } else {
            console.log("Something went wrong!")
        }
    }

    useEffect(() => {
        fetchAboutDapok()
    }, [])

    return (
        <Layout>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchAboutDapok}
                    />
                }
            >
                <List.Section style={{ backgroundColor: "#fff" }}>
                    {
                        aboutDapok.length > 0 ? (
                            aboutDapok.map((row, index) => (
                                <List.Accordion
                                    style={{ backgroundColor: "#fff", fontWeight: "bold" }}
                                    title={row.Title}
                                    key={index + 1}>
                                    <List.Item
                                        descriptionNumberOfLines={20}
                                        description={
                                            <Text>{row.Content}</Text>
                                        } />
                                </List.Accordion>
                            ))
                        ) : ""
                    }
                </List.Section>
            </ScrollView>
        </Layout>
    )
}
