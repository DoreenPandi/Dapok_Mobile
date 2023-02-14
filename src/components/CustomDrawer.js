import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../firebase';
import { Toast } from 'toastify-react-native';
import { signOut } from 'firebase/auth';
import { AppContext } from '../store';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';


const CustomDrawer = props => {

    const { state, dispatch } = useContext(AppContext)

    const [user, setUser] = useState()

    const logout = () => {
        signOut(auth)
            .then(() => {
                Toast.success("You have successfully logout")
            })
            .catch(error => Toast.success(error))
    }


    async function fetchUser() {
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

    useEffect(() => {
        if (auth.currentUser?.uid != null) {
            fetchUser()
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#1F2D49' }}>
                <ImageBackground
                    source={require('../assets/img/menu-bg.png')}
                    style={{ padding: 20 }}>
                    <Image
                        source={require('../assets/img/avatar.png')}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            fontFamily: 'Roboto-Medium',
                            marginBottom: 5,
                        }}>
                        {user != undefined ? user.firstname + " " + user.lastname : ""}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontFamily: 'Roboto-Regular',
                                marginRight: 5,
                            }}>
                            {!user ? "" : user.email}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={logout} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;