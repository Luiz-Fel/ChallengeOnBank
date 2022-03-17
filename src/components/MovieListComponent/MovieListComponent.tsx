import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS } from '../../colors';
import React from 'react';

 interface MovieComponentProps {
    id: number,
    title: string,
    voteAverage: number,
    posterPath: string,
    overview: string,
    genreIds: number[],
    categoriesList: {
        id: number,
        name: string,
    }[],
}


export function MovieListComponent({title, voteAverage, posterPath, overview, genreIds, categoriesList} : MovieComponentProps) {
    
    const rating = (Math.round(voteAverage / 2 * 10) / 10).toFixed(1)


    const categories = (categoriesList.filter((category) => {
        return genreIds.includes(category.id) 
    }
    ).map((selectedGenres) => {
        return selectedGenres.name
    })
    ).join(',')


    const overviewText = (overview.length >= 160) 
    ? overview.slice(0, 160) + '...'
    : overview


    return(
    <View style={styles.movieComponent}>

        <View style={styles.poster}>
            <Image 
            source={{uri: `https://image.tmdb.org/t/p/w500/${posterPath}`}}
            style={styles.poster}
            />
        </View> 
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{rating}</Text>
                <Icon name="star" size={22} color={COLORS.stars} />
            </View>
            <View> 
                <Text style={styles.categories}>{categories}</Text>
            </View>
            <View>
                
                <Text style={styles.overview}>{overviewText}</Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    movieComponent: {
        display: 'flex',
        flexDirection: 'row',
        flex: 2,
        paddingBottom: 20, 
    },
    titleContainer : {
        display: 'flex',
        paddingLeft: 16,
        maxWidth: 180,
    },
    title: {
        color: COLORS.text,
        fontSize: 24,
    },
    ratingContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    poster: {
        width: 182, 
        height: 273,
        borderRadius: 15,
    },
    rating: {
        fontSize: 24,
        color: COLORS.text,
        paddingRight: 8,
    },
    categories: {
        paddingTop: 12,
        color: COLORS.text,
        paddingBottom: 10,
    },
    overview: {
        color: COLORS.subText,
    }
    
  });
  