import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from './components/Header/Header';
import { MoviesList } from './components/MoviesList/MoviesList';

export default function App() {
  return (
    <ScrollView style={{
    backgroundColor: '#000000',

    }}>
    <Header />
    <View style={styles.container}>
      <MoviesList />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    margin: 16,
  },
});

