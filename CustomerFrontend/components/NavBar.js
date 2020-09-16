import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Input, Text, Header } from 'react-native-elements'
import { AuthContext } from '../App'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome, Entypo } from '@expo/vector-icons';


const NavBar = () => {

    const dispatchFunct = useContext(AuthContext)
    const navigation = useNavigation()


    const onSignout = () => {

        dispatchFunct.signOut()
    }



    return (

        <View style={styles.container}>



            <View style={styles.homecontainer}>
                <TouchableOpacity onPress={() => navigation.navigate('MAIN_HOME')} >
                    <Text style={styles.text}>
                        Simple Fresh
                        </Text>
                </TouchableOpacity>
            </View>


            <View style={styles.utilitycontainer}>

                <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('MAIN_ALLORDERS')} >
                    <Text style={styles.signouttext}>
                        My Orders
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('MAIN_CART')} >
                    {/* <Text style={styles.signouttext}>
                        Cart
                        </Text> */}
                    <Entypo name="shopping-cart" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.signout} onPress={onSignout} >
                    {/* <Text style={styles.signouttext}>
                        Sign out
                        </Text> */}
                    <FontAwesome name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>

        </View>


    )
}

export default NavBar

const styles = StyleSheet.create({

    container: {
        height: 60,
        backgroundColor: '#39793b',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    homecontainer: {
        marginTop: 12,
        marginLeft: 5
    },
    utilitycontainer: {
        flexDirection: 'row',
        marginTop: 12
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'serif',
        color: 'white'
    },
    signouttext: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'serif',
        color: 'white'
    },
    cart: {
        margin: 10
    },
    signout: {
        margin: 10
    }
})

{/* <Header style={styles.headerstyle}
// leftComponent={<Button buttonStyle={{ width: 100 }} title="Home" onPress={navToHome} />}
leftComponent={<Button buttonStyle={{ width: 100 }} title="Home" onPress={() => navigation.navigate('MAIN_HOME')} />}

// centerComponent={<Button buttonStyle={{ width: 100 }} title="Cart" onPress={navToCart} />}
centerComponent={<Button buttonStyle={{ width: 100 }} title="Cart" onPress={() => navigation.navigate('MAIN_CART')} />}


rightComponent={
    <View>
        <Button buttonStyle={{ width: 100 }} title="Logout" onPress={onSignout} />
        <Button buttonStyle={{ width: 100 }} title="All Orders" onPress={() => navigation.navigate('MAIN_ALLORDERS')} />
    </View>
}
/> */}