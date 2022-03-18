import React from "react";
import { ScrollView, StyleSheet, View,Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Creators } from "../../store/ducks/data";

export function AllMovies() {

    const test = useSelector(state => state) 

    const dispatch = useDispatch();

    const movies = () => {
        console.log('D A T A: ', test)    
    }


    return(
        <Pressable onPress={movies}>
            <Text>AAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAAAAA</Text>
        </Pressable>
    )
}