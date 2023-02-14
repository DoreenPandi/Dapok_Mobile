import React, { useEffect, useReducer, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './core/theme'
import Container from "toastify-react-native"
import { AppContext, initialState } from './store'
import reducer from './reducer'
import AppStack from './navigation/AppStack'
import AuthStack from './navigation/AuthStack'
import { auth, db } from './firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { NativeBaseProvider } from "native-base"

export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()



    // useEffect(() => {
    //     if (auth.currentUser?.uid != null) {
    //         async function fetchUser() {
    //             const userRef = collection(db, "users")
    //             const q = query(userRef, where("uid", "==", auth.currentUser?.uid))

    //             const qSnapshot = await getDocs(q)

    //             if (q) {
    //                 let userDetails = []
    //                 qSnapshot.forEach((doc) => {
    //                     userDetails.push(doc.data())
    //                 })
    //                 setUser(userDetails)
    //             } else {
    //                 console.log("Something went wrong")
    //             }
    //         }
    //         fetchUser();
    //     }
    // }, [])

    function onAuthStateChanged(user) {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber
    }, [])

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Provider theme={theme}>
                <NativeBaseProvider>
                    <Container position="top" />
                    <NavigationContainer>
                        {
                            !user ? (
                                <AppStack />
                            ) : (
                                <AuthStack />
                            )
                        }
                    </NavigationContainer>
                </NativeBaseProvider>
            </Provider>
        </AppContext.Provider>
    )
}
