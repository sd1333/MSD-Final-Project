import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import axios from 'axios';
import { AuthContext } from '../App';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Signin = ({ navigation: { navigate } }) => {

    const dispatchFunct = useContext(AuthContext)

    const [loginState, setLoginState] = useState({
        email: 'chefvsmith1000@gmail.com',
        password: '123456'
    })



    const signInSubmit = async () => {
        if (validation()) {
            const reqBody =
            {
                email: loginState.email,
                password: loginState.password
            }

            console.log('reqBody: ', reqBody)

            axios.post('https://cs583finalapi.herokuapp.com/customersignin', reqBody)
                .then((response) => {
                    console.log('response.data', response.data)
                    console.log('response.data typeof', typeof response.data)
                    if (response.data) {
                        AsyncStorage.setItem('token', response.data)
                            .then(() => {

                                dispatchFunct.signIn(response.data)
                                    .then(() => {
                                        navigate('MAIN_HOME')
                                    })
                            })
                    }
                    else {
                        setLoginState(prevState => ({ ...prevState, userValid: false }))
                    }


                    // dispatchFunct.signIn(response.data)
                    //     .then(() => {
                    //         navigate('MAIN_HOME')
                    //     })
                    // console.log('==========================================POSSIBLE ERROR 1 =======================')
                    // // AsyncStorage.setItem('token', response.data)
                    // console.log('==========================================POSSIBLE ERROR 2 =======================')

                    // // navigate('MAIN_HOME')

                })
                .catch((err) => {
                    console.log('no')
                    console.log(err)
                })




            // const signinResponse = await axios.post('http://192.168.1.9:3000/customersignin', reqBody)

            // if (signinResponse.data) {
            //     console.log('signinResponse.data: ', signinResponse.data)
            //     await AsyncStorage.setItem('token', signinResponse.data)
            //     dispatchFunct.signIn(token)
            //     navigate('MAIN_TEST')
            // }


        }

    }

    const emailTextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, email: text }))

    }

    const passwordTextChange = (text) => {
        setLoginState(prevState => ({ ...prevState, password: text }))
    }

    const navToSignUp = () => {
        console.log('navToSignUp')
        navigate('MAIN_SIGNUP')
    }

    const validation = () => {
        let emailValid = false
        let passwordValid = false

        if (loginState.email.indexOf('@') !== -1) {

            emailValid = true
        }
        if (loginState.password.length > 5) {
            passwordValid = true
        }

        const validArray = [emailValid, passwordValid]

        for (let elem of validArray) {
            if (!elem) {
                return false
            }
        }
        console.log('validation() true')
        return true
    }

    const onSignout = () => {
        dispatchFunct.signOut()
    }


    return (

        <KeyboardAvoidingView style={styles.container}>


            <View style={{ flex: 1 }}></View>

            <View style={styles.titlecontainer}>
                <Text style={styles.titletext}>
                    Simple Fresh
                </Text>
            </View>

            <View style={styles.logincontainer}>
                <Text style={styles.text}>Email </Text>
                <TextInput style={styles.input} value={loginState.email} onChangeText={emailTextChange} />

                <Text style={styles.text}>Password </Text>
                <TextInput style={styles.input} value={loginState.password} onChangeText={passwordTextChange} />

                <TouchableOpacity style={styles.button} onPress={signInSubmit}>
                    <Text style={styles.buttontext}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={navToSignUp}>
                    <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>



            </View>

        </KeyboardAvoidingView>
    )

}



export default Signin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
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
        borderWidth: 0.75,
        borderColor: 'orange',
    },
    button: {
        backgroundColor: '#39793b',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 2,
        marginHorizontal: 30,
        height: 50,
        borderRadius: 10,
    },
    buttontext: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'serif',
        color: 'white'
    }
})

//hello 


{/* <Button title="Sign In" onPress={signInSubmit} />

<Button title="Sign Up" onPress={navToSignUp} />

<Button title="Signout" onPress={onSignout} /> */}