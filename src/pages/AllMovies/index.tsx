import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View,Text, Pressable, Image, NativeScrollEvent } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { COLORS } from "../../colors";
import { Creators, DataProps } from "../../store/ducks/data";


export function AllMovies({ navigation }: NativeStackScreenProps<RootStackParamList, 'AllMovies'>) {

    const [page, setPage] = useState(1)

    
    const { data } = useSelector((state : DataProps) => state) 
    //Api cache not working correctly so its sending repeated movies.
    const [lastPageIDs, setLastPageIDs] = useState(data.movies.map((movie) => movie.id)) 
    const dispatch = useDispatch()
    const movies = data.movies
    const selectedCategory = data.selectedCategoryId
    const category = data.genres.filter((genre) => selectedCategory === genre.id).map((curr) => curr.name)

    async function loadMoreMovies() {
        await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a5d3a44d547cd3cf6e6da81cacc136ef&language=en-US&page=${page + 1}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then((response => {
            if (response.ok === false) {
                return
            }else {
                //Api cache not working correctly so its sending repeated movies.
                const results : DataProps['data']['movies'] = response.results
                setLastPageIDs(results.map((movie) => movie.id))
                dispatch(Creators.loadMoreMovies(results.filter((movie) => {
                    console.log(!lastPageIDs.includes(movie.id))
                   return !lastPageIDs.includes(movie.id)
                } )))
                setPage(page + 1)
            }
        }))
      
     
    }

    
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize} : NativeScrollEvent) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


    return(
        <>
        <ScrollView 
        onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                loadMoreMovies()
            }
          }}
          scrollEventThrottle={400}
        style={{backgroundColor: '#000000',}}>
          <View style={styles.header}>
              <Text style={styles.headerText}>
                  {
                      selectedCategory === -1 
                      ? 'All movies'
                      : category
                  }
              </Text>
                  <Pressable onPress={() => {
                navigation.navigate('Categories')
            }}>
                      <View style={styles.filterContainer}>
                        <Text style={styles.filterText}>
                            Filter
                        </Text>
                        <Icon name="filter" size={22} color={COLORS.red} />
                      </View>
                  </Pressable>
          </View>
            <View style={styles.allMoviesContainer}>

                {movies.map(({poster_path, id, title, genre_ids}) => {
                    if (selectedCategory === -1 || genre_ids.includes(selectedCategory)) {
                        
                        return(
                            <Pressable key={id}>
                        <View  style={styles.movieContainer}>
                            <Image 
                            source={{uri: `https://image.tmdb.org/t/p/w500/${poster_path}`}}
                            style={styles.poster}
                            />
                            <Text style={styles.title}>{title}</Text>
                        </View> 
                        </Pressable>
                    )
                }
                })}
            </View>
            <Pressable onPress={loadMoreMovies}>
                <View style={styles.loadMoreContainer}>
                    <Text style={styles.loadMoreButton}>
                        Load More
                    </Text>
                </View>
            </Pressable>
        </ScrollView>
        </>
        
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerText: {
        color: COLORS.red,
        fontSize: 36,
        padding: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        paddingRight: 4,
        fontSize: 20,
        color: COLORS.text
    },
    allMoviesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    movieContainer: {
        maxWidth: 182,
        margin: 7,
        marginBottom: 10,
    },
    poster: {
        width: 182, 
        height: 273,
        borderRadius: 15,
        flexDirection: 'column',
    },
    title: {
        color: COLORS.text,
        fontSize: 20,
    },
    loadMoreButton: {
        color: COLORS.text,
        fontSize: 24,
    },
    loadMoreContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,

    }
})