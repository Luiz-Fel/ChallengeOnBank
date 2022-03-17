import React from "react";
import { ScrollView, StyleSheet, View,Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Creators } from "../../store/ducks/example";

export function AllMovies() {

    const test = useSelector(state => state) 

    const dispatch = useDispatch();

    const movies = () => {
        dispatch(Creators.loadMovies())
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