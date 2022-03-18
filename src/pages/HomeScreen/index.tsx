import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParamList } from "../../../App";
import { Header } from "../../components/MovieListComponent/Header/Header";
import { MoviesList } from "../../components/MoviesList/MoviesList";

export function HomeScreen({navigation, route} : NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) {
    return(
     
    <ScrollView style={{
        backgroundColor: '#000000',
        
      }}>
    <Header navigation={navigation} route={route}/>
    <View style={styles.container}>
      <MoviesList />
    </View>

    </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
      margin: 16,
    },
  });
  
  