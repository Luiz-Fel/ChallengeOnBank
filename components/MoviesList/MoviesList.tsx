import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MovieListComponent } from '../MovieListComponent/MovieListComponent';

export interface MovieComponentProps {
    id: number,
    title: string,
    rating: number,
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
        
        console.log(movies) 
    }

    useEffect(() => {
        getMovies() 
    }, [])

    return(
        <>
            <View>
                <Text>Filmes</Text>
                {movies.map((movie) => {

                    return(<MovieListComponent
                        key={movie.id} 
                        id={movie.id}  
                        title={movie.title} 
                        rating={movie.rating} 
                        poster_path={movie.poster_path} 
                        release_date={movie.release_date} />)
                })}
            </View>
        </>
    )
}