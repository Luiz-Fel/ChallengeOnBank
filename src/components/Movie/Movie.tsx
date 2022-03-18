import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { COLORS } from "../../colors";
import { DataProps } from "../../store/ducks/data";
 
interface MovieProps {
    
        id: number,
        title: string,
        vote_average: number,
        vote_count: number,
        poster_path: string,
        backdrop_path: string,
        overview: string,
        genre_ids: number[],
        popularity: number,
        release_date: string,
        formattedDate: string,

}

export function Movie({ route } : NativeStackScreenProps<RootStackParamList, 'Movie'>) {
    const { id } = route.params
    
    const [movieParams, setMovieParams] = useState< any >()
    const  { data } = useSelector((state : DataProps)  => state) 
    
    useEffect(() => {
        const params = data.movies.find((movie) => movie.id === id)
        setMovieParams( {
            ...params,
            formattedDate: format(new Date(params!.release_date), 'dd MMM yyyy')
            
        }
             )
            console.log( data.movies.find((movie) => movie.id === id))
        },[])
    if (movieParams) {

    }
    return(
        <>
        {
            movieParams 
            &&
            <>
            <ScrollView style={{
        backgroundColor: '#000000',
        
      }}>

                <Image 
                source={{uri: `https://image.tmdb.org/t/p/w500/${movieParams.backdrop_path}`}}
                style={styles.backdrop}
                />
                <View style={styles.movieContainer}>

                <View style={styles.posterContainer}>
                    <Image 
                    source={{uri: `https://image.tmdb.org/t/p/w500/${movieParams.poster_path}`}}
                    style={styles.poster}
                    />
                    <Text style={[styles.posterTitle, styles.content]}>{movieParams.title}</Text>
                </View>
                <View>
                    {/* CATEGORIES CAROUSEL */}
                </View>
                <Text>About</Text>
                <View>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.containerTitle, styles.content]}>Overview:</Text>
                        <Text style={[styles.content]}>{movieParams.overview}</Text>
                    </View>
                   
                    <View style={styles.contentContainer}>
                        <Text style={[styles.containerTitle, styles.content]}>Release Date:</Text>
                        <Text style={[styles.content]}>{movieParams.formattedDate}</Text>
                    </View>
                    
                    <View style={styles.ratesContainer}>
                        <View style={styles.rateContentContainer}>
                            <Text style={[styles.containerTitle, styles.content]}>Average Rating:</Text>
                            <Text style={[styles.content]}>{movieParams.vote_average}</Text>
                        </View>
                       
                        <View style={styles.rateContentContainer}>
                            <Text style={[styles.containerTitle, styles.content]}>Rate Count:</Text>
                            <Text style={[styles.content]}>{movieParams.vote_count}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.contentContainer}>
                        <Text style={[styles.containerTitle, styles.content]}>Popularity</Text>
                        <Text style={[styles.content]}>{movieParams.popularity}</Text>
                    </View>
                </View>
                
                </View>
            </ScrollView>
            </>
        }

        </>
    )
}

const styles = StyleSheet.create({
    content: {
        color: COLORS.text,

    },


    movieContainer: {
        paddingLeft: 29,
        paddingRight: 29,
        justifyContent: 'center',
    },
    contentContainer: {
        marginTop: 12,
        marginBottom: 12,
    },
    posterContainer: {
        flexDirection: 'row',
    },
    poster: {
        width: 140, 
        height: 190,
        borderRadius: 15,
        marginTop: '-25%',
    },
    posterTitle: {
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 12,
        paddingTop: 12,
        maxWidth: 210,
    },
    containerTitle: {
        fontWeight: '500',
    },
    ratesContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 12,
    },
    rateContentContainer: {
     width: '50%',
    },


    backdrop: {
        width: '100%', 
        height: 273,
    }

})

