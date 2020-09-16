import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, SafeAreaView } from 'react-native';
import { Button, Input, Text, Divider } from 'react-native-elements'
import { AuthContext } from '../App'
import axios from 'axios'
import NavBar from './NavBar.js'
import { TouchableOpacity } from 'react-native-gesture-handler';


const AllOrders = ({ route, navigation: { navigate } }) => {

    const [userToken, setUserToken] = useState({})
    const [ordersList, setOrdersList] = useState({})

    const dispatchFunct = useContext(AuthContext)

    let token;

    useEffect(() => {
        (async () => {
            token = dispatchFunct.getToken()
            setUserToken((prevState) => ({ ...prevState, data: token }))

            console.log('token: ', token)
            console.log('userToken.data=======================================: ', userToken.data)


            axios.get(`https://cs583finalapi.herokuapp.com/customer/orders/all`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }

                }
            ).then((response) => {
                console.log('RESPONSE: ', response.data)

                setOrdersList((prevState) => ({ ...prevState, data: response.data }))

            }).catch((err) => {
                console.log('errrrrrrrrrrrrr')
            })


        })()
    }, [])


    const viewOrdersByStatus = (stat) => {
        console.log('stat: ', stat)
        console.log('userToken.data: ', userToken.data)

        axios.get(`https://cs583finalapi.herokuapp.com/customer/orders/${stat}`,
            {
                headers: {
                    authorization: `Bearer ${userToken.data}`
                }

            })
            .then((response) => {
                console.log("VIEW ORDERS BY DATA response.data: ", response.data)

                setOrdersList((prevState) => ({ ...prevState, data: response.data }))
            })

    }

    const navToRate = (farmerId) => {
        navigate('MAIN_RATING',
            {
                farmerId: farmerId
            }
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <NavBar></NavBar>



            {ordersList && <SafeAreaView style={{ flex: 1 }}>


                <View style={styles.buttonrow}>
                    <TouchableOpacity style={styles.button} onPress={() => { viewOrdersByStatus('pending') }}>
                        <Text style={styles.buttontext} >
                            pending
                                </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { viewOrdersByStatus('ready') }}>
                        <Text style={styles.buttontext} >
                            ready
                                </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.button} onPress={() => { viewOrdersByStatus('complete') }}>
                        <Text style={styles.buttontext} >
                            complete
                                </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { viewOrdersByStatus('bydate') }}>
                        <Text style={styles.buttontext} >
                            by date
                                </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={ordersList.data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {

                        console.log('item.products: ', item.products)
                        return (
                            <View style={styles.ordercard}>

                                <Text style={styles.text}>Order ID#: {item._id}</Text>
                                <Text style={styles.subtitle}>Status: {item.status}</Text>

                                {item.status == "complete" && <TouchableOpacity style={styles.ratebutton} onPress={() => { navToRate(item.farmer._id) }}>
                                    <Text style={styles.buttontext} >
                                        Rate this farmer!
                                                                        </Text>
                                </TouchableOpacity>}


                                <Text style={styles.subtitle}>Farmer Details: </Text>

                                <Text> </Text>
                                <Text style={styles.textdetails} >{item.farmer.firstName + ' ' + item.farmer.lastName}</Text>
                                <Text style={styles.textdetails}>{item.farmer.email}</Text>
                                <Text style={styles.textdetails}>Rating: {item.farmer.rating}</Text>
                                <Text> </Text>
                                <Text style={styles.subtitle}>Products: </Text>
                                <Text> </Text>

                                <View style={styles.producttable}>
                                    <FlatList
                                        data={item.products}
                                        renderItem={({ item }) => {

                                            return (
                                                <View>
                                                    <Text style={styles.textdetails}>Product Name: {item.productName}</Text>
                                                    <Text style={styles.textdetails}>Product Price: {item.price}</Text>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                                <Divider style={styles.dividerstyle} />
                            </View>
                        )

                    }}
                />
            </SafeAreaView>
            }

        </View>
    )
}

export default AllOrders


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
    },
    ordercard: {
        marginTop: 30
    },
    dividerstyle: {
        backgroundColor: 'rgb(125, 168, 121)',
        height: 2,
        marginTop: 30,
        marginHorizontal: 10
    },
    buttonrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    text: {
        textAlign: 'left',
        fontSize: 22,
        fontFamily: 'serif',
        color: 'black',
        marginLeft: 10
    },
    subtitle: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: 'serif',
        color: 'black',
        marginLeft: 10
    },
    textdetails: {
        textAlign: 'left',
        fontSize: 17,
        fontFamily: 'serif',
        color: 'black',
        marginLeft: 10
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
        marginBottom: 2,
        marginHorizontal: 5,
        height: 40,
        width: 80,
        borderRadius: 10,
    },
    ratebutton: {
        backgroundColor: 'rgb(57, 17, 138)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 40,
        width: 100,
        borderRadius: 10,
    },
    buttontext: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        color: 'white'
    },
    producttable: {
        backgroundColor: "rgb(255, 197, 153)"
    }
})


                    // <Button title="Pending" onPress={() => { viewOrdersByStatus('pending') }} />
                    // <Button title="Ready" onPress={() => { viewOrdersByStatus('ready') }} />
                    // <Button title="Complete" onPress={() => { viewOrdersByStatus('complete') }} />
                    // <Button title="By Date" onPress={() => { viewOrdersByStatus('bydate') }} />