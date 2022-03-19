import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Pressable, BackHandler } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { COLORS } from "../../colors";
import { Creators, DataProps } from "../../store/ducks/data";
 
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
        categoriesList: {
            name: string,
            id: number,
        }[],

}

export function Movie({ navigation, route } : NativeStackScreenProps<RootStackParamList, 'Movie'>) {
    const { id } = route.params
    
    const [movieParams, setMovieParams] = useState< MovieProps >()
    const  { data } = useSelector((state : DataProps)  => state)
    const dispatch = useDispatch()

    const genres = data.genres



    useEffect(() => {
        const params = data.movies.find((movie) => movie.id === id) as unknown as MovieProps
        setMovieParams( {
            ...params,
            formattedDate: format(new Date(params!.release_date), 'dd MMM yyyy'),
            categoriesList : (genres.filter(
                (genre) => params.genre_ids.includes(genre.id))) 
            
        }
             ) 
            
            BackHandler.addEventListener("hardwareBackPress", () =>{
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
                dispatch(Creators.reset())
                return true
            })
        },[])
    
    



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
                <View style={styles.categoryContainer}>
                    <ScrollView horizontal={true}>
                    {movieParams.categoriesList.map((category) => {
                        return(
                                <Pressable key={category.id} onPress={() => {
                                    dispatch(Creators.selectCategory(category.id))
                                    
                                    navigation.navigate('AllMovies')

                                }}>
                                    <View style={styles.category}>
                                        <Text style={[styles.content, styles.categoryText]}>
                                            {category.name}
                                        </Text>
                                    </View>
                                </Pressable>
                        )
                    })}
                    </ScrollView>
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
        fontSize: 16,

    },

    categoryContainer: {
        marginTop: 18,
        marginBottom: 18,
        flexDirection: 'row',

    },
    category: {
        margin: 8,
        padding: 8,
        paddingRight: 12,
        paddingLeft: 12,
        backgroundColor: COLORS.red,
        borderRadius: 24,
    },
    categoryText: {
        fontSize: 18,
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

