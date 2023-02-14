import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
// import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { PaperSelect } from 'react-native-paper-select';
import Layout from "../components/Layout"
import { Toast } from 'toastify-react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { Heading, Text } from "native-base"
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore/lite'


export const selectValidator = (value: any) => {
    if (!value || value.length <= 0) {
        return 'Please select a value.';
    }
    return '';
};

export default function RegisterScreen({ navigation }) {

    const [valid, isValid] = useState(false)
    const [error, setError] = useState(false)

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);

    const [checked, setChecked] = useState(false)

    const [language, setLanguage] = useState({
        value: '',
        list: [
            { _id: '1', value: 'Cebuano - Beginner' },
            { _id: '2', value: 'Cebuano - Intermediate' },
            { _id: '3', value: 'Cebuano - Advanced' },
            { _id: '4', value: 'Mandaya - Beginner' },
            { _id: '5', value: 'Mandaya - Intermediate' },
            { _id: '6', value: 'Mandaya - Advanced' },
            { _id: '7', value: 'Tagalog - Beginner' },
            { _id: '8', value: 'Tagalog - Intermediate' },
            { _id: '9', value: 'Tagalog - Advanced' },
        ],
        selectedList: [],
        error: '',
    });

    const [educationAttainment, setEducationAttainment] = useState({
        value: '',
        list: [
            { _id: '1', value: 'No schooling' },
            { _id: '2', value: 'Elementary Graduate' },
            { _id: '3', value: 'Junior High School Graduate' },
            { _id: '4', value: 'Senior High School Graduate' },
            { _id: '5', value: 'College Undergraduate' },
            { _id: '6', value: 'Bachelor`s Degree' },
            { _id: '7', value: 'Master`s Degree' },
            { _id: '8', value: 'Doctoral Degree' },
        ],
        selectedList: [],
        error: '',
    });

    const onNextStepOne = () => {
        if (firstname == "") {
            Toast.error("Fistname cannot be blank!")
        }
        if (lastname == "") {
            Toast.error("Lastname cannot be blank!")
        }
        if (email == "") {
            Toast.error("Email cannot be blank!")
        }
        //  else {
        //     const userCol = collection(db, "users")
        //     const q = query(userCol, where("ëmail", "==", email.value))

        //     const qSnapshot = getDocs(q);

        //     if (q) {
        //         let user = [];
        //         qSnapshot.forEach((doc) => {
        //             user.push(doc.data())
        //             console.log(user)
        //         })
        //         if (user.length > 0) {
        //             Toast.error("Email is already exist!")
        //         }
        //     } else {
        //         console.log("Something went wrong")
        //     }
        // }
        setPassword("")
        setConfirmPassword("")
        setError(false)
    }


    const onNextStepTwo = () => {
        if (password == "") {
            Toast.error("Password cannot be blank!")
        }
        if (confirmPassword == "") {
            Toast.error("Confirm Password cannot be blank!")
        }
        if (password != confirmPassword) {
            Toast.error("Password does not match!")
        }
        if (password.length < 7) {
            Toast.error("Password must be more than 6 characters!")
        }
    }

    const onNextStepThree = () => {
        if (educationAttainment.value == "") {
            Toast.error("Educational Attainment cannot be blank!")
        } else if (language.value == "") {
            Toast.error("Language with fluency cannot be blank!")
        }
    }

    const onSignUpPressed = () => {

        if (checked == false) {
            Toast.error("You must first Agree with the Terms and Conditions")
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const user = res.user

                    const addUser = setDoc(doc(db, "users", user.uid), {
                        firstname: firstname,
                        lastname: lastname,
                        email: user.email,
                        uid: user.uid,
                        educattainment: educationAttainment.value,
                        languagespoken: language.value,
                        usertype: "Contributor",
                        score: 0
                    })

                    if (addUser) {
                        Toast.success("Sucessfully Register")
                    } else {
                        Toast.error("Something went wrong")
                    }
                }).catch((error) => {
                    if (error.code == 'auth/email-already-in-use') {
                        Toast.error('You already have an account with that email.');
                    }
                    if (error.code == 'auth/invalid-email') {
                        Toast.error('Please provide a valid email');
                    }
                    if (error.code == 'auth/weak-password') {
                        Toast.error('The password is too weak.');
                    }
                    Toast.error(error)
                })
        }
    }


    return (
        <Layout>
            <View style={styles.container}>
                <ProgressSteps
                    completedProgressBarColor="#0c79f3"
                    completedStepIconColor="#0c79f3"
                    activeStepNumColor="#0c79f3"
                    activeStepIconColor="#0c79f3"
                    activeStepIconBorderColor="#0c79f3"
                    activeLabelColor="#0c79f3"
                >
                    <ProgressStep nextBtnTextStyle={styles.buttonTextStyle} onNext={onNextStepOne} errors={error}>
                        <Text style={styles.baseText}>Personal Information</Text>
                        <Text style={styles.innerText}>Enter your personal information</Text>
                        <TextInput
                            label="Firstname"
                            selectionColor={theme.colors.primary}
                            underlineColor="transparent"
                            mode="outlined"
                            returnKeyType="next"
                            value={firstname.value}
                            onChangeText={(text) => setFirstName(text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Lastname"
                            selectionColor={theme.colors.primary}
                            underlineColor="transparent"
                            mode="outlined"
                            returnKeyType="next"
                            value={lastname.value}
                            onChangeText={(text) => setLastName(text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Email"
                            selectionColor={theme.colors.primary}
                            underlineColor="transparent"
                            mode="outlined"
                            returnKeyType="next"
                            value={email.value}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.textInput}
                            autoCapitalize="none"

                        />
                    </ProgressStep>
                    <ProgressStep nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle} onNext={onNextStepTwo}>
                        <Text style={styles.baseText}>Create a password</Text>
                        <Text style={styles.innerText}>Pick a password for your new account. You can
                            always change it later</Text>
                        <TextInput
                            label="Password"
                            selectionColor={theme.colors.primary}
                            underlineColor="transparent"
                            mode="outlined"
                            value={password.value}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={secureTextEntryPassword}
                            right={
                                <TextInput.Icon
                                    name="eye"
                                    onPress={() => {
                                        setSecureTextEntryPassword(!secureTextEntryPassword);
                                        return false;
                                    }}
                                />
                            }
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Confirm Password"
                            selectionColor={theme.colors.primary}
                            underlineColor="transparent"
                            mode="outlined"
                            value={confirmPassword.value}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={secureTextEntryConfirmPassword}
                            right={
                                <TextInput.Icon
                                    name="eye"
                                    onPress={() => {
                                        setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
                                        return false;
                                    }}
                                />
                            }
                            style={styles.textInput}
                        />
                    </ProgressStep>
                    <ProgressStep nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle} onNext={onNextStepTwo}>
                        <Text style={styles.baseText}>Additional Information</Text>
                        <Text style={styles.innerText}>Please fill up the details to continue</Text>
                        <PaperSelect
                            label="Highest Educational Attainment"
                            value={educationAttainment.value}
                            labelStyle={styles.text}
                            onSelection={(value: any) => {
                                setEducationAttainment({
                                    ...educationAttainment,
                                    value: value.text,
                                    selectedList: value.selectedList,
                                    error: '',
                                });
                            }}
                            arrayList={[...educationAttainment.list]}
                            selectedArrayList={educationAttainment.selectedList}
                            errorText={educationAttainment.error}
                            textInputMode="flat"
                            searchStyle={{ iconColor: 'red' }}
                            searchPlaceholder="Search"
                            modalCloseButtonText="Cancel"
                            modalDoneButtonText="Select"
                            theme={{
                                colors: {
                                    placeholder: "#000"
                                }
                            }}
                            style={styles.selectOption}
                        />
                        <PaperSelect
                            label="What Language(s) do you speak?"
                            value={language.value}
                            labelStyle={styles.text}
                            onSelection={(value: any) => {
                                setLanguage({
                                    ...language,
                                    value: value.text,
                                    selectedList: value.selectedList,
                                    error: '',
                                });
                            }}
                            textInputColor="black"
                            arrayList={[...language.list]}
                            selectedArrayList={language.selectedList}
                            errorText={language.error}
                            multiEnable={true}
                            textInputMode="flat"
                            searchStyle={{ iconColor: 'red' }}
                            searchPlaceholder="Search"
                            modalCloseButtonText="Cancel"
                            modalDoneButtonText="Select"
                            theme={{
                                colors: { placeholder: 'black' }
                            }}
                            style={styles.selectOption}
                        />
                    </ProgressStep>

                    <ProgressStep nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle} onSubmit={onSignUpPressed}>
                        <ScrollView>
                        <Heading mb="4" style={{ fontSize: 25, textAlign: "center", color: "#1F2D49"}}>Terms and Conditions</Heading>

                            <Text mb="2" style={{ fontSize: 12, textAlign: "center", color: "#1F2D49"}}>By checking the box below, you bound to agree on these following terms and conditions:</Text>
                            <Text mb="2" style={{ fontSize: 12, textAlign: "center", color: "#1F2D49"}}>Gathering of data for evaluation and analysis; Personal Information, such as name, age, civil status, address, contact.</Text>
                            <Heading mb="4" style={{ fontSize: 18, textAlign: "center",color: "#1F2D49"}}>About the Study DAPOK: A MULTI-PLATFORM MULTILINGUAL PARALLEL CORPUS APPLICATION</Heading>

                            <Heading mb="2" style={{ fontSize: 12, textAlign: "left", color: "#1F2D49"}}>Aims to build a multilingual parallel corpus by:</Heading>

                            <Text mb="2" style={{ fontSize: 13, textAlign: "left", color: "#1F2D49"}}>• Incorporating a crowdsourcing functionality to the application,</Text>

                            <Text mb="2" style={{ fontSize: 13, textAlign: "left", color: "#1F2D49"}}>• Design a moderating module that would be able to control the monolingual data that will be available in the mobile application, as well as to analyze the contributions from crowdsourcing and assess how they align with other contributions with the web application,</Text>

                            <Text mb="5" style={{ fontSize: 13, textAlign: "left", color: "#1F2D49"}}>• Lastly, evaluate the user experience design to increase the effectiveness of crowdsourcing language data.</Text>

                            <Text style={{ fontSize: 15, fontWeight: "bold", textDecorationLine: "underline", color: "#1F2D49"}}>Terms & Conditions</Text>
                            <Text mb="3" style={{ fontSize: 12, color: "#1F2D49"}}>Due to the heavy reliance on online presence, the study's main threats are unlawfully access of data. Though, the proponents utilized and vetted technology that can guarantee utmost privacy & security.</Text>

                            <Text style={{ fontSize: 15, fontWeight: "bold", textDecorationLine: "underline", color: "#1F2D49"}}>Data Privacy</Text>
                            <Text mb="3" style={{ fontSize: 12, color: "#1F2D49"}}>To ensure the non-violation of data privacy and protect user rights or welfare, the researchers adhere to the Data Privacy Act (RA 10173). Therefore, all information gathered is kept in strict confidentiality, if deemed necessary, and will only be used for research purposes.</Text>

                            <Text style={{ fontSize: 15, fontWeight: "bold", textDecorationLine: "underline", color: "#1F2D49"}}>Voluntary Participation</Text>
                            <Text mb="3" style={{ fontSize: 12, color: "#1F2D49"}}>All the participation that occurred and will occur for the study will be voluntary and can only proceed if the participants agreed to partake in. The participant will also have the right to withdraw at any given time without any need to explain their withdrawal.</Text>

                            <View style={{ marginBottom: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Checkbox
                                    style={{ marginBottom: 20 }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Heading style={{ fontSize: 12, textAlign: "left", left: -20, color: "#1F2D49"}}>I agree with the Terms and Conditions</Heading>
                            </View>
                        </ScrollView>
                    </ProgressStep>
                </ProgressSteps>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        height: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    buttonTextStyle: {
        // textAlign: "center",
        fontSize: 15,
        lineHeight: 16,
        backgroundColor: "#1F2D49",
        borderRadius: 12,
        // color: "#fff",
        height: 44,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        color: "#fff",
        textAlign: 'center',
        padding: 15,
        marginRight: -50,
        marginLeft: -50,
        // backgroundColor: '#F8CC23',
    },
    baseText: {
        fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineGeight: 29,
        color: "#1F2D49",
        marginTop: 20,
        textAlign: "center",
    },
    innerText: {
        fontFamily: 'Montserrat',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 11,
        lineHeight: 13,
        textAlign: "center",
        color: "#737171",
        marginTop: 20,
        marginBottom: 40
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        color: '#fff',
    },
    textInput: {
        marginBottom: 20,
        backgroundColor: "#fff"
    },
    selectOption: {
        marginBottom: 20,
        borderRadius: 25
    }
})