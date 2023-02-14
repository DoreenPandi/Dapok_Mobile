import React, { useState, useCallback } from 'react'
import { Text, View, StyleSheet, RefreshControl, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../components/Layout'
import { TextInput, Title } from 'react-native-paper';
import dateFormat from "dateformat"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ViewContributionScreen({ route, navigation }) {

    const {
        status,
        originalLanguage,
        originalSentence,
        created_at,
        translatedLanguage,
        translatedSentence
    } = route.params

    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
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
                    <View style={{ marginTop: 10, marginBottom: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.statusText}>Status: </Text>
                            <Image
                                source={
                                    status == "Accepted" ?
                                        require('../assets/img/accepted.png')
                                        : status == "Pending" ?
                                            require('../assets/img/pending.png')
                                            : status == "Rejected" ?
                                                require('../assets/img/rejected.png')
                                                : ""
                                }
                            />
                        </View>
                        <Text style={styles.dateText}>Date: {dateFormat(created_at.toDate().toISOString(), "mmmm dd, yyyy")}</Text>
                    </View>
                    <View>
                        <View style={styles.viewContent}>
                            <Text style={styles.titleText}>Translated from: <Title style={styles.languageText}>{originalLanguage}</Title></Text>
                            <TextInput
                                style={{ backgroundColor: "#fff" }}
                                multiline
                                mode="outlined"
                                numberOfLines={4}
                                placeholder="Original sentence..."
                                value={originalSentence}
                                disabled={true}
                            />
                        </View>
                        <View style={styles.viewContent}>
                            <Text style={styles.titleText}>Translated to: <Title style={styles.languageText}>{translatedLanguage}</Title></Text>
                            <TextInput
                                style={{ backgroundColor: "#fff" }}
                                multiline
                                mode="outlined"
                                numberOfLines={4}
                                placeholder="Translation..."
                                defaultValue={translatedSentence}
                                disabled={true}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Layout >
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginTop: 20
    },
    viewContent: {
        marginBottom: 30
    },
    statusText: {
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 18
    },
    dateText: {
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 18
    },
    titleText: {
        fontWeight: "normal",
        marginBottom: 20,
        fontSize: 18
    },
    languageText: {
        fontWeight: "bold",
        textTransform: 'capitalize',
        marginBottom: 20,
        color: "#1F2D49",
    },
    button: {
        backgroundColor: "#1F2D49",
        height: 44,
        borderRadius: 15,
        color: "#fff",
        borderColor: "#1F2D49",
        fontWeight: "bold",
        width: 100
    },
})