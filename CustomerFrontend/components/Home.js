import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, SafeAreaView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { AuthContext } from '../App'
import axios from 'axios'
import NavBar from './NavBar.js'
import { TouchableOpacity } from 'react-native-gesture-handler';


const Home = ({ navigation: { navigate } }) => {

    const [farmersInfo, setFarmersInfo] = useState({})

    const dispatchFunct = useContext(AuthContext)

    const showData = () => {
        console.log(farmersInfo)
    }


    useEffect(() => {

        (async () => {
            let userToken = await AsyncStorage.getItem('token')
            console.log('=============userToken: ', userToken)
            dispatchFunct.restoreToken(userToken)

            await axios.get('https://cs583finalapi.herokuapp.com/customer/farmers',
                {
                    headers: {
                        authorization: `Bearer ${userToken}`
                    }
                })
                .then((response) => {
                    console.log('======================FARMERS: ', response.data)
                    setFarmersInfo((prevState) => ({ ...prevState, data: response.data }))
                })

        })()

    }, [])

    const navToProducts = (farmerId) => {

        console.log('navToProducts farmerId: ', farmerId)

        navigate('MAIN_PRODUCTS', {
            farmerId: farmerId
        })
    }

    return (
        <View >
            <NavBar></NavBar>
            {farmersInfo && <View style={styles.container}>

                <FlatList
                    data={farmersInfo.data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.farmerrow}>
                            <Text style={styles.text}>{item.firstName + ' ' + item.lastName}</Text>
                            <Text style={styles.ratingtext}>Rating: {item.rating}</Text>

                            <TouchableOpacity style={styles.button} onPress={() => { navToProducts(item._id) }}>
                                <Text style={styles.buttontext} >
                                    View Products
                                </Text>
                            </TouchableOpacity>




                        </View>
                    )}
                />
            </View>}
        </View>
    )



}

export default Home


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
    },

    farmerrow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'serif',
        color: '#39793b'
    },
    ratingtext: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        color: '#39793b',
        marginBottom: 5
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
    }
})
//hello 
{/* <Button title="console.log data" onPress={showData} /> */ }
{/* <Button title="View Products" onPress={() => { navToProducts(item._id) }} /> */ }