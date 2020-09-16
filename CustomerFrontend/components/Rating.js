import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, SafeAreaView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { AuthContext } from '../App'
import axios from 'axios'
import NavBar from './NavBar.js'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-ratings';

const RatingComponent = ({ route, navigation: { navigate } }) => {

    const [ratingState, setRatingState] = useState({ rating: 2 })
    const [userToken, setUserToken] = useState({})

    const dispatchFunct = useContext(AuthContext)

    useEffect(() => {
        (async () => {

            let token = dispatchFunct.getToken()
            setUserToken((prevState) => ({ ...prevState, data: token }))

            console.log('route.params', route.params.farmerId)

        })()
    }, [])

    const showRating = (value) => {
        console.log(value)
        setRatingState((prevState) => ({ ...prevState, rating: value }))

        console.log('ratingState: ', ratingState)

    }

    const submitRating = () => {
        console.log(ratingState)

        console.log("userToken.data: ", userToken.data)

        axios.post(`https://cs583finalapi.herokuapp.com/customer/farmer/rating/${route.params.farmerId}`, ratingState,
            {
                headers: {
                    authorization: `Bearer ${userToken.data}`
                }
            })
            .then(() => {
                navigate('MAIN_HOME')
            })
    }

    return (


        <View>

            <NavBar></NavBar>

            <AirbnbRating
                count={3}
                reviews={["Bad", "Good", "Excellent"]}
                defaultRating={2}
                size={20}
                onFinishRating={showRating}
            />

            <View style={styles.buttonrow}>
                <TouchableOpacity style={styles.button} onPress={submitRating}>
                    <Text style={styles.buttontext}>
                        Submit Rating
                </Text>
                </TouchableOpacity>
            </View>




        </View>
    )




}

export default RatingComponent

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#39793b',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        marginBottom: 2,
        marginHorizontal: 30,
        height: 40,
        width: 200,
        borderRadius: 10,
    },
    buttontext: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        color: 'white'
    },
    buttonrow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
})