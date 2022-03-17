
import { StyleSheet, Text, View, Image } from 'react-native';
import { MovieComponentProps } from '../MoviesList/MoviesList';
import {format} from 'date-fns';
import { COLORS } from '../../colors';

export function MovieListComponent({title, release_date, rating, poster_path} : MovieComponentProps) {
    const date = format(new Date(release_date), 'dd MMM yyyy')
    console.log(`https://image.tmdb.org/t/p/w500/${poster_path}`)
    return(
    <View style={styles.movieComponent}>

            <Image 
            source={{uri: `https://image.tmdb.org/t/p/w500/${poster_path}`}}
            style={{width: 400, height: 400}}
            />
        <View style={styles.poster}>
        </View>
        <View >
            <Text style={styles.content}>{title}</Text>
            <View>
                <Text style={styles.content}>Release Date:</Text>
                <Text>{date}</Text>
            </View>
            <View>
                <Text style={styles.content}>Average Rating</Text>
                <Text style={styles.content}>{rating}</Text>
            </View>
        </View>
        <View style={styles.statistics}>

            <Text>{rating}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    movieComponent: {
        
    },
    poster: {

    },
    content: {
        color: COLORS.text,
    },
    statistics: {

    }
  });
  