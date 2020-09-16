import 'react-native-gesture-handler';

import React, { useReducer, createContext, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import FarmerProducts from './components/FarmerProducts';
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails';
import AllOrders from './components/AllOrders';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RatingComponent from './components/Rating';




const Stack = createStackNavigator()

export const AuthContext = createContext()
export const CartContext = createContext()

const initialValue = {
  token: ''
}



const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':

      console.log('============action.token in reducer: ', action.token)

      return {
        ...prevState,
        token: action.token
      }
    case 'SIGN_IN': return { ...prevState, token: action.token }

    case 'SIGN_OUT': return {
      ...prevState,
      token: ''
    }
  }
}

const initialCart = {
  cart: []
}


const cartReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADDTOCART':
      console.log('========ADDTOCART in cartreducer')
      console.log('action.item: ', action.item)
      return {
        ...prevState,
        cart: [...prevState.cart, action.item]
      }

    case 'GETCART':
      console.log('GETCART in cartreducer')

      return prevState
    case 'CLEARCART':
      console.log('CLEARCART in cartreducer')
      return {
        cart: []
      }
  }
}
//===============================================================================================================================================
export default function App() {

  const [tokenState, dispatch] = useReducer(reducer, initialValue)

  const authContext = ({
    signIn: async (data) => {
      console.log('=======================signIn in Authcontext data: ', data)
      await dispatch({ type: 'SIGN_IN', token: data })
    },

    signOut: () => {
      dispatch({ type: 'SIGN_OUT' })
    },

    restoreToken: (data) => {
      console.log('restoreToken data: ', data)
      dispatch({ type: 'RESTORE_TOKEN', token: data })
    },

    getToken: () => {
      return tokenState.token
    }
  })

  const [myCartState, setCartState] = useReducer(cartReducer, initialCart)

  const cartContext = ({
    addToCart: (item) => {
      // setCartState(prevState => ([...prevState, item]))
      setCartState({ type: 'ADDTOCART', item: item })
    },

    getCart: () => {
      return myCartState.cart
      // setCartState({ type: 'GETCART' })
      // console.log('hello from getCart context aas;ldkfj;')
      // console.log('getCart:')
      // console.log(myCartState)
      // return cartState
    },

    clearCart: () => {
      setCartState({ type: 'CLEARCART' })
    }


  })

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext} >
        <CartContext.Provider value={cartContext}>
          <Stack.Navigator>
            {tokenState.token == '' ? (
              <>
                <Stack.Screen name="MAIN_SIGNIN" component={Signin} options={{ title: 'Signin' }} />
                <Stack.Screen name="MAIN_SIGNUP" component={Signup} options={{ title: 'Signup' }} />
              </>
            ) : (
                <>
                  <Stack.Screen name="MAIN_HOME" component={Home} options={{ title: 'Home' }} />
                  <Stack.Screen name="MAIN_PRODUCTS" component={FarmerProducts} options={{ title: 'Farmer Products' }} />
                  <Stack.Screen name="MAIN_CART" component={Cart} options={{ title: 'Cart' }} />
                  <Stack.Screen name="MAIN_PRODUCTDETAILS" component={ProductDetails} options={{ title: 'Product Details' }} />
                  <Stack.Screen name="MAIN_ALLORDERS" component={AllOrders} options={{ title: 'All Orders' }} />
                  <Stack.Screen name="MAIN_RATING" component={RatingComponent} options={{ title: 'Rating' }} />
                </>
              )}

          </Stack.Navigator>
        </CartContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//hello 