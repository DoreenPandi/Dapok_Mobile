import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { List, Text } from 'react-native-paper';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { RefreshControl, ScrollView } from 'react-native';



export default function FAQsScreen() {

    const [expanded, setExpanded] = useState()

    const [refreshing, setRefreshing] = useState(false);

    const [faq, setFaq] = useState([])

    const handlePress = () => setExpanded(!expanded);

    async function fetchFAQ() {
        const faqRef = collection(db, "FAQs")

        const q = query(faqRef, orderBy("Title", "asc"), limit(10));

        const faqSnapshot = await getDocs(q)
        if (q) {
            let faqs = [];
            faqSnapshot.forEach((doc) => {
                faqs.push(doc.data())
            })
            setFaq(faqs)
        } else {
            console.log("Someting went wrong!")
        }

    }

    useEffect(() => {
        fetchFAQ()
    }, [])


    return (
        <Layout>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchFAQ}
                    />
                }
            >
                <List.Section>
                    {
                        faq.length > 0 ? (
                            faq.map((row, index) => (
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
