import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from './components/Header/Header';
import { MoviesList } from './components/MoviesList/MoviesList';

export default function App() {
  return (
    <ScrollView >
    <Header />
    <View style={styles.container}>
      <MoviesList />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

