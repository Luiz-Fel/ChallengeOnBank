import React from 'react';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../colors';
import { Creators, DataProps } from '../../store/ducks/data';
import { MovieListComponent } from '../MovieListComponent/MovieListComponent';



export function MoviesList() {


    const dispatch = useDispatch()
    const  { data } = useSelector((state : DataProps)  => state) 
    const genres = data.genres
    const movies = data.popularMovies.results
    async function getMovies() {
    
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a5d3a44d547cd3cf6e6da81cacc136ef&language=en-US&page=1', {
            method: 'GET',
        }).then(response => response.json())
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
                    movies
                &&
                    movies.map((movie) => {

                        const categoriesList = (genres.filter((genre) => 
                            movie.genre_ids.includes(genre.id)
                        ).map((curr) => curr.name)
                        ).join(',')

                        return(<MovieListComponent
                            key={movie.id} 
                            id={movie.id}  
                            title={movie.title} 
                            overview={movie.overview}
                            genreIds={movie.genre_ids}
                            voteAverage={movie.vote_average} 
                            posterPath={movie.poster_path}
                            categories= {categoriesList}
                            />)
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

