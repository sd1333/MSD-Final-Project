import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../App'
import { CartContext } from '../App';
import axios from 'axios'
import NavBar from './NavBar.js'
import { TouchableOpacity } from 'react-native-gesture-handler';




const FarmerProducts = ({ route, navigation: { navigate } }) => {

    const [productsList, setProductsList] = useState({})
    const [userToken, setUserToken] = useState({})
    const [cartState, setCartState] = useState([])
    const [farmerBuy, setFarmerValid] = useState({ valid: true })

    const dispatchFunct = useContext(AuthContext)
    const cartFunct = useContext(CartContext)

    useEffect(() => {
        (async () => {
            let token = dispatchFunct.getToken()
            setUserToken((prevState) => ({ ...prevState, data: token }))


            // console.log("cartItems: ", cartItems)


            // console.log('token: ', token) https://cs583finalapi.herokuapp.com/
            // console.log('userToken.data=======================================: ', userToken.data)

            axios.get(`https://cs583finalapi.herokuapp.com/customer/farmer/${route.params.farmerId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }

                }
            ).then((response) => {

                setProductsList((prevState) => ({ ...prevState, data: response.data }))

                let cartItems = cartFunct.getCart()

                // console.log('response===============================: ', response.data)
                // console.log('cartItems===============================: ', cartItems)
                // console.log('productsList.data: ', productsList.data)

                console.log('response??')


                if (cartItems.length && response.data.length) {

                    console.log(`${cartItems[0].farmer._id} = ${response.data[0].farmer._id}`)
                    console.log('true or false: ', cartItems[0].farmer._id === response.data[0].farmer._id)
                    if (cartItems[0].farmer._id !== response.data[0].farmer._id) {

                        setFarmerValid((prevState) => ({ valid: false }))
                    }
                }


            }).catch((err) => {
                console.log('errrrorrrrrrrrrrrrrrrrrrrrr')
            })

        })()
    }, [])

    // const addToCart = (product, qtyVal) => {
    //     console.log('product: ', product)
    //     console.log('qtyVal: ', qtyVal)

    // axios.post(`https://cs583finalapi.herokuapp.com/customer/addtocart`, product,
    //     {
    //         headers: {
    //             authorization: `Bearer ${userToken.data}`
    //         }

    //     })
    // }

    const navToProductDetails = (id) => {
        navigate('MAIN_PRODUCTDETAILS', {
            productId: id
        })
    }


    const viewCart = () => {
        console.log('helooooooooooooooooooooooooooooooooooo')
        // console.log('CURRENT CARTSTATE: ', cartState)
        console.log('cartFunct.getCart()', cartFunct.getCart())
    }

    const addToCartHelper = (item) => {


        // let copyOfCart = [...cartState]
        let copyOfCart = cartFunct.getCart()

        if (copyOfCart.length) {
            for (let i = 0; i < copyOfCart.length; i++) {
                if (copyOfCart[i]._id == item._id) {
                    console.log("copyOfCart[i]._id: ", copyOfCart[i]._id)
                    console.log("item._id: ", item._id)
                    console.log('already in cart!')
                    // setCartState(prevState => ([...copyOfCart]))
                    return
                }
            }
            item.qtyToBuy = 1
            // setCartState(prevState => ([...copyOfCart, item]))
            cartFunct.addToCart(item)
        } else {
            item.qtyToBuy = 1
            // setCartState(prevState => ([item]))
            cartFunct.addToCart(item)
            console.log('FIRST cartstate: ', cartState)

        }

    }

    const addToCart = async (item) => {

        addToCartHelper(item)


    }

    const clearCart = () => {
        cartFunct.clearCart()
    }



    return (
        <KeyboardAwareScrollView>
            <NavBar></NavBar>
            {productsList && <SafeAreaView style={styles.container}>

                <FlatList
                    data={productsList.data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {

                        return (
                            <View style={styles.productrow}>
                                <Text style={styles.producttext}>Product Name: {item.product.productName}</Text>
                                <Text style={styles.producttext}>Price per unit: {item.product.price}</Text>
                                <Text style={styles.producttext}>Quantity remaining: {item.product.qty}</Text>
                                {
                                    farmerBuy.valid ? <TouchableOpacity style={styles.button} onPress={() => { addToCart(item) }} >
                                        <Text style={styles.buttontext}>
                                            Add to Cart!
                                        </Text>
                                    </TouchableOpacity>
                                        :
                                        <Text>You may only checkout from one farmer at a time! </Text>
                                }

                            </View>
                        )
                    }}
                />
                <Button title="cart state" onPress={viewCart} />

            </SafeAreaView>}

        </KeyboardAwareScrollView>
    )

}

export default FarmerProducts

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

{/* <Button title="Clear Cart" onPress={clearCart} /> */ }

{/* <Button title="Add to cart!" onPress={() => { addToCart(item) }} /> */ }


{/* <Input value={loginState.password2} onChangeText={password2TextChange} /> */ }

    // for (let elem of productsList.data) {
    //     // for(let i = 0; i < productsList.data.length; i++){


    //     if (elem._id == id) {

    //         // const tempQtyToBuy = {...elem.qtyToBuy}
    //         // tempQtyToBuy = text
    //         console.log('reaching ======================2')


    //         console.log('MATCHED ELEM: ', elem)

    //         elem.qtyToBuy = text

    //         setProductsList(prevState => ({
    //             ...prevState,

    //         }))

    // console.log('productsList: ', productsList)

    // }


    // setStyle(prevStyle => ({
    //     ...prevStyle,
    //     font: { ...prevStyle.font, align: event.target.value }
    // }));

    // if(productsList.data[i]._id == id){

    //     const tempProduct = {...productsList.data[i].product} 
    //     tempProduct.qtyToBuy = text
    //     const tempData 


    //     setProductsList(prevState => ({ ...prevState, }))




    //     // const tempQtyToBuy =  {...productsList.data[i].product.qtyToBuy} 
    //     // const tempProduct = {...productsList.data[i].produc}

    //     setProductsList(prevState => ({ ...prevState, }))
    // }
    // }

    // console.log(productsList.product._id)
    // setProductsList(prevState => ({ ...prevState, data: text }))
    // }


    // console.log('MATCH========================================================')
    // console.log('================================item.qtyToBuy: ', item.qtyToBuy)
    // console.log('================================copyOfCart[i].qtyToBuy: ', copyOfCart[i].qtyToBuy)
    // console.log('copyOfCart[i].qtyToBuy + item.qtyToBuy = : ', copyOfCart[i].qtyToBuy + item.qtyToBuy)
    // copyOfCart[i].qtyToBuy = copyOfCart[i].qtyToBuy + 1
    // console.log('=====2222===========================copyOfCart[i].qtyToBuy: ', copyOfCart[i].qtyToBuy)
    // // console.log('cartStateMATCH: ', cartState)
    // // console.log('copyOfCart: ', copyOfCart)

// } else {

//     // let meow = await (async () => {
//     //     setCartState(prevState => ([...prevState, item]))
//     //     return cartState

//     // })()
//     item.qtyToBuy = 1
//     setCartState(prevState => ([item]))
//     console.log('FIRST cartstate: ', cartState)
//     // console.log('FIRST cartstate meow: ', meow)


//     // await AsyncStorage.setItem('cart', cartState)

// }


    // cartFunct.addToCart(item)

        // console.log('addToCart item: ', item)

        // setCartState(prevState => ([item]))

        // addToCartHelper(item)

        // if (copyOfCart.length) {
        //     for (let i = 0; i < copyOfCart.length; i++) {
        //         if (copyOfCart[i]._id == item._id) {
        //             //already in cart!
        //             // setCartState(prevState => ([...copyOfCart]))
        //             break
        //         } else {
        //             item.qtyToBuy = 1
        //             setCartState(prevState => ([...copyOfCart, item]))

        //         }
        //     }
        // } else {

        //     item.qtyToBuy = 1
        //     setCartState(prevState => ([item]))
        //     console.log('FIRST cartstate: ', cartState)

        // }




        // if (copyOfCart.length) {
        //     for (let i = 0; i < copyOfCart.length; i++) {
        //         if (copyOfCart[i]._id == item._id) {

        //             setCartState(prevState => ([...copyOfCart]))
        //         } else {
        //             item.qtyToBuy = 1
        //             setCartState(prevState => ([...copyOfCart, item]))

        //         }
        //     }
        // } else {

        //     item.qtyToBuy = 1
        //     setCartState(prevState => ([item]))
        //     console.log('FIRST cartstate: ', cartState)

        // }




        // console.log('addToCart item: ', item)

        // let copyOfCart = [...cartState]

        // // console.log('copyOfCart: ', copyOfCart)

        // if (copyOfCart.length) {
        //     for (let i = 0; i < copyOfCart.length; i++) {
        //         if (copyOfCart[i]._id == item._id) {

        //             console.log('MATCH========================================================')
        //             console.log('================================item.qtyToBuy: ', item.qtyToBuy)
        //             console.log('================================copyOfCart[i].qtyToBuy: ', copyOfCart[i].qtyToBuy)
        //             console.log('copyOfCart[i].qtyToBuy + item.qtyToBuy = : ', copyOfCart[i].qtyToBuy + item.qtyToBuy)
        //             copyOfCart[i].qtyToBuy = copyOfCart[i].qtyToBuy + item.qtyToBuy

        //             // console.log('cartStateMATCH: ', cartState)
        //             // console.log('copyOfCart: ', copyOfCart)
        //             setCartState(prevState => ([...copyOfCart]))
        //         } else {
        //             setCartState(prevState => ([...copyOfCart, item]))

        //         }
        //     }
        // } else {
        //     setCartState(prevState => ([...prevState, item]))
        // }


        // // setCartState(prevState => ([...prevState, item]))
        // // console.log('CARTSTATE: ', cartState)




        // <Input onChangeText={(text) => { qtyTextChange(item._id, text) }} />

        // const qtyTextChange = (id, text) => {
        //     // console.log('ID: ', id)
        //     // console.log('TEXT HERE -================', text)
        //     // console.log('PRODUCTSLIST: ', productsList)

        //     let copyOfProductList = { ...productsList };



        //     for (let i = 0; i < copyOfProductList.data.length; i++) {
        //         if (copyOfProductList.data[i]._id == id && text > 0) {
        //             copyOfProductList.data[i].qtyToBuy = text
        //         } else if (copyOfProductList.data[i]._id == id && text < 1) {
        //             copyOfProductList.data[i].qtyToBuy = 1
        //         }
        //     }

        //     setProductsList(prevState => ({
        //         ...copyOfProductList

        //     }))

        // }