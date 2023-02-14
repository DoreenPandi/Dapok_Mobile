import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { AboutScreen, AchievementsScreen, FAQsScreen, HomeScreen, ProfileScreen, ContributionsScreen, AddContribution } from '../screens';
import CustomDrawer from '../components/CustomDrawer';
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import TestPreviewScreen from '../screens/TestPreviewScreen'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function DrawerStack({ navigation }) {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName="Home"
            screenOptions={{
                drawerActiveBackgroundColor: '#1F2D49',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,

                },
            }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: 'transaparent',
                    },
                    headerTitleStyle: {
                        color: 'transparent',
                    },
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#1F2D49",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            />

            <Drawer.Screen
                name="Contribution"
                component={ContributionsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="newspaper-o" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{
                    title: "About Dapok",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="ios-information-circle-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: 'transaparent',
                    },
                    headerTitleStyle: {
                        color: '#1F2D49',
                    },
                }}
            />
            <Drawer.Screen
                name="Achievements"
                component={AchievementsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="medal-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: 'transaparent',
                    },
                    headerTitleStyle: {
                        color: '#000',
                    },
                }}
            />
            <Drawer.Screen
                name="FAQ"
                component={FAQsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="message-question-outline" size={22} color={color} />
                    ),
                    title: "FAQs",
                    headerStyle: {
                        backgroundColor: '#1F2D49',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            />
            <Drawer.Screen
                name="TestPreviewScreen"
                component={TestPreviewScreen}
                options={{
                    headerLeft: () => null,
                    title: "Take Quiz",
                    drawerIcon: ({ color }) => (
                        <Ionicons name="ios-newspaper-outline" size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: "#1F2D49",
                    },
                    headerTitleStyle: {
                        color: '#1F2D49',
                    },
                    headerTintColor: "#1F2D49"
                }}
            />

        </Drawer.Navigator>
    )
}
