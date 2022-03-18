import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { COLORS } from '../../colors';
import { Creators, DataProps } from '../../store/ducks/data';
import { MovieListComponent } from '../MovieListComponent/MovieListComponent';



export function MoviesList({ navigation }: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) {


    const dispatch = useDispatch()
    const  { data } = useSelector((state : DataProps)  => state) 
    const genres = data.genres
    const movies = data.movies.slice(0, 10)
    async function getMovies() {
    
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a5d3a44d547cd3cf6e6da81cacc136ef&language=en-us&page=1')
        .then(response => response.json())
        .then(response => dispatch(Creators.getMovies(response)))
    
        

        await fetch('http://api.themoviedb.org/3/genre/movie/list?api_key=a5d3a44d547cd3cf6e6da81cacc136ef')
        .then(response => response.json())
        .then(response =>  dispatch(Creators.getGenres(response)))
    
       
    }
    useEffect(() => {  
        getMovies()  
    }, []) 


    return(   
        <> 
            <View>

                <View style={styles.moviesContainer}>

                {
                    movies.length > 0
                &&
                    movies.map((movie) => {

                        const categoriesList = (genres.filter((genre) => 
                            movie.genre_ids.includes(genre.id)
                        ).map((curr) => curr.name)
                        ).join(',')

                        return(
                            <Pressable onPress={() => {
                                navigation.navigate('Movie', {
                                    id: movie.id,
                                })
                            }}
                            key={movie.id}>

                        <MovieListComponent
                             
                            id={movie.id}  
                            title={movie.title} 
                            overview={movie.overview}
                            genreIds={movie.genre_ids}
                            voteAverage={movie.vote_average} 
                            posterPath={movie.poster_path}
                            categories= {categoriesList}
                            />

                            </Pressable>
                            )
                        })}

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    moviesContainer: {
        display: 'flex',

    }
})

