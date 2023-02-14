import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import { List } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"


export default function ProfileScreen({ navigation }) {
    return (
        <Layout>
            <View>
                <List.Item
                    title="Account information"
                    description="See your account information like your
                    name and email address."
                    left={() => <TouchableOpacity onPress={() => { navigation.navigate("AccountScreen") }} style={styles.iconButton}><AntDesign name="user" size={30} /></TouchableOpacity>}
                />
                <List.Item
                    title="Password"
                    description="Change your password anytime you like."
                    left={() => <TouchableOpacity onPress={() => { navigation.navigate("PasswordScreen") }} style={styles.iconButton}><Ionicons name="key-outline" size={30} /></TouchableOpacity>}
                />
                <List.Item
                    title="Educational background"
                    description="Information abut your educational background,
                    language you speak and fluency."
                    left={() => <TouchableOpacity onPress={() => { navigation.navigate("EducationalBackgroundScreen") }} style={styles.iconButton}><FontAwesome5 name="graduation-cap" size={30} /></TouchableOpacity>}
                />
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        marginTop: 15,
        flexDirection: "row",
        alignItmes: "center",
        justifyContent: "center"
    }
})
