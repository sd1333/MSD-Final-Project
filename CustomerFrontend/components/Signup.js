import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import axios from 'axios';
import { AuthContext } from '../App';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const Signup = ({ navigation: { navigate } }) => {

    const dispatchFunct = useContext(AuthContext)

    const [loginState, setLoginState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    })

    const firstNameTextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, firstName: text }))
    }

    const lastNameTextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, lastName: text }))
    }

    const emailTextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, email: text }))
    }

    const passwordTextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, password: text }))
    }

    const password2TextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, password2: text }))
    }

    const validation = () => {
        let firstNameValid = false
        let lastNameValid = false
        let emailValid = false
        let passwordValid = false
        let password2Valid = false

        if (loginState.firstName.length) {
            firstNameValid = true
        }
        if (loginState.lastName.length) {
            lastNameValid = true
        }
        if (loginState.email.indexOf('@') !== -1) {
            emailValid = true
        }
        if (loginState.password.length > 5) {
            passwordValid = true
        }
        if (loginState.password2 === loginState.password) {
            password2Valid = true
        }

        let validArray = [firstNameValid, lastNameValid, emailValid, passwordValid, password2Valid]

        for (let elem of validArray) {
            if (!elem) {
                return false
            }
        }
        return true
    }

    const signUpSubmit = async () => {
        if (validation()) {

            const { password2, ...reqBody } = loginState

            console.log(reqBody)


            axios.post('http://192.168.1.9:3000/customersignup', reqBody)
                .then((response) => {
                    console.log('response.data', response.data)
                    if (response.data) {
                        navigate('MAIN_TEST')
                    }

                })
                .catch((err) => {
                    console.log('no')
                    console.log(err)
                })

            // const signUpResponse = await axios.post('http://192.168.1.9:3000/customersignup', reqBody)

            // if (signupResponse.data) {
            //     console.log('signupResponse.data: ', signupResponse.data)
            //     await AsyncStorage.setItem('token', signupResponse.data)
            //     dispatchFunct.signUp(token)
            //     navigate('MAIN_TEST')
            // }

        }
        else { console.log('validation not passed') }
    }


    return (

        <KeyboardAvoidingView>
            <ScrollView>

                <Text>
                    This is Signup
                </Text>

                <View style={styles.inputrow}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput style={styles.input} value={loginState.firstName} onChangeText={firstNameTextChange} />
                </View>

                <View style={styles.inputrow}>
                    <Text style={styles.text}>Last Name</Text>
                    <TextInput style={styles.input} value={loginState.lastName} onChangeText={lastNameTextChange} />
                </View>

                <View style={styles.inputrow}>
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput style={styles.input} value={loginState.email} onChangeText={emailTextChange} />
                </View>

                <View style={styles.inputrow}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.input} value={loginState.password} onChangeText={passwordTextChange} />
                </View>

                <View style={styles.inputrow}>
                    <Text style={styles.text}>Re-enter Password</Text>
                    <TextInput style={styles.input} value={loginState.password2} onChangeText={password2TextChange} />
                </View>

                <TouchableOpacity style={styles.button} onPress={signUpSubmit}>
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>






            </ScrollView>
        </KeyboardAvoidingView>
    )

}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
    },

    inputrow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    titlecontainer: {
        flex: 1,
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
    },
    logincontainer: {
        flex: 5,
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'serif',
        color: '#39793b'
    },
    titletext: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'serif',
        color: '#39793b'
    },
    input: {
        fontFamily: 'serif',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 5,
        width: 300
    },
    button: {
        backgroundColor: '#39793b',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 30,
        height: 50,
        borderRadius: 10
    },
    buttontext: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'serif',
        color: 'white'
    }
})



//hello 

{/* <Button title="Sign Up" onPress={signUpSubmit} /> */ }