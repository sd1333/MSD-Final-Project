import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage, FlatList, SafeAreaView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { AuthContext } from '../App'
import axios from 'axios'
import NavBar from './NavBar.js'

const ProductDetails = ({ route, navigation: { navigate } }) => {


    return (
        <Text>
            This is ProductDetails
        </Text>
    )
}

export default ProductDetails