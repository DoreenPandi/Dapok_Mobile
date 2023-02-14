import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AddContributionScreen, AccountScreen, PasswordScreen, EducationalBackgroundScreen, ViewContributionScreen, TestScreen, AboutTestScreen } from '../screens'
import DrawerStack from './DrawerStack'


const Stack = createStackNavigator()

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={DrawerStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddContributionScreen"
                component={AddContributionScreen}
                options={{
                    title: "Contribute",
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#000',
                    },
                }}
            />
            <Stack.Screen
                name="AccountScreen"
                component={AccountScreen}
                options={{
                    title: "Account",
                    headerStyle: {
                        backgroundColor: "#1F2D49",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}

            />
            <Stack.Screen
                name="PasswordScreen"
                component={PasswordScreen}
                options={{
                    title: "Update Password",
                    headerStyle: {
                        backgroundColor: "#1F2D49",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="EducationalBackgroundScreen"
                component={EducationalBackgroundScreen}
                options={{
                    title: "Educational Background",
                    headerStyle: {
                        backgroundColor: "#1F2D49",
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="ViewContributionScreen"
                component={ViewContributionScreen}
                options={{
                    title: "Preview",
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#000',
                    },
                }}
            />
            <Stack.Screen
                name="TestScreen"
                component={TestScreen}
                options={{
                    title: "Test Questionaire",
                    headerStyle: {
                        backgroundColor: '#1F2D49',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                    headerTintColor: "#fff"
                }}
            />
            <Stack.Screen
                name="AboutTestScreen"
                component={AboutTestScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: 'transparent',
                    },
                }}
            />
        </Stack.Navigator>
    )
}
