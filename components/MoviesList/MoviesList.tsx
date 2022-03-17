import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MovieListComponent } from '../MovieListComponent/MovieListComponent';

export interface MovieComponentProps {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    release_date: string,
}


export function MoviesList() {
    const [movies, setMovies] = useState<MovieComponentProps[]>([])

    async function getMovies() {
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=a5d3a44d547cd3cf6e6da81cacc136ef&language=en-US&page=1', {
            method: 'GET',
        }).then(response => response.json())
        .then(response => setMovies(response.results))

       const categories = await fetch('http://api.themoviedb.org/3/genre/movie/list?api_key=a5d3a44d547cd3cf6e6da81cacc136ef')
        .then(response => response.json())

        
        console.log(categories)  
    } 

    useEffect(() => {
        getMovies() 
    }, [])

    return(
        <>
            <View>
                <Text>Filmes</Text>
                <View style={styles.moviesContainer}>

                {movies.map((movie) => {
                    
                    return(<MovieListComponent
                        key={movie.id} 
                        id={movie.id}  
                        title={movie.title} 
                        vote_average={movie.vote_average} 
                        poster_path={movie.poster_path} 
                        release_date={movie.release_date} />)
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