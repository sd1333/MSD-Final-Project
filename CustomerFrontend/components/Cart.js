import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, SafeAreaView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { AuthContext } from '../App'
import { CartContext } from '../App';

import axios from 'axios'
import NavBar from './NavBar.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Cart = ({ route, navigation: { navigate } }) => {

    const cartFunct = useContext(CartContext)
    const dispatchFunct = useContext(AuthContext)


    const [cartItemState, setCartItemState] = useState([])
    const [userToken, setUserToken] = useState({})

    let token;
    let cartItems;

    useEffect(() => {
        (async () => {
            token = dispatchFunct.getToken()
            setUserToken((prevState) => ({ ...prevState, data: token }))

            console.log('token: ', token)
            console.log('userToken.data=======================================: ', userToken.data)

            cartItems = cartFunct.getCart()

            console.log('cartItems: ', cartItems)
            setCartItemState((prevState) => ([...cartItems]))
            console.log('cartItemState: ', cartItemState)
        })()
    }, [])

    const submitOrder = () => {

        console.log('userToken: ', userToken.data)

        axios.post(`https://cs583finalapi.herokuapp.com/customer/createorder`, cartItemState,
            {
                headers: {
                    authorization: `Bearer ${userToken.data}`
                }
            }
        ).then((response) => {
            console.log('response: ', response)
            cartFunct.clearCart()
            navigate('MAIN_HOME')

        })
            .catch((err) => {
                console.log('errrrrrrrrrrrrrr')
            })
    }

    // const clearCart = () => {

    //     cartItems = cartFunct.clearCart()
    //     console.log('clearcart cartItems: ', cartItems)
    //     // setCartItemState((prevState) => ([...cartItems]))
    // }


    return (
        <View>
            <NavBar></NavBar>


            {cartItemState.length > 0 && <SafeAreaView style={styles.container}>

                <FlatList
                    data={cartItemState}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.productrow}>
                                <Text style={styles.producttext}>Item Name: {item.product.productName} </Text>
                                <Text style={styles.producttext}>Item Price: {item.product.price} </Text>
                            </View>
                        )
                    }}
                />

            </SafeAreaView>
            }

            <View style={styles.productrow}>
                <Text style={styles.totaltext}>
                    Total: $
                        {cartItemState.reduce((total, item) => {
                    return total + item.product.price
                }, 0)}
                </Text>
            </View>
            <View style={styles.productrow}>
                <TouchableOpacity style={styles.button} onPress={() => { submitOrder(item) }} >
                    <Text style={styles.buttontext}>Place Order!
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(231, 224, 214);',
        justifyContent: 'center'
    },

    productrow: {
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
    producttext: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        color: 'black',
        marginBottom: 5
    },
    totaltext: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'serif',
        color: 'black',
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



// <Button title="Clear Cart" onPress={clearCart} />

{/* <Button title="Place Order" onPress={submitOrder} /> */ }
