import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AddContribution, LoginScreen, RegisterScreen, StartScreen } from '../screens';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerTransparent: true
            }}
        >
            <Stack.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    headerLeft: () => null,
                    title: "",
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: 'transparent',
                    },
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={AppStack}
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
