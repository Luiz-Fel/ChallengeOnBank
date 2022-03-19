import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/pages/HomeScreen';
import { AllMovies } from './src/pages/AllMovies';
import store from './src/store';
import { Categories } from './src/pages/Categories';
import { Movie } from './src/pages/Movie/Movie';
import { COLORS } from './src/colors';


const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  HomeScreen: undefined;
  AllMovies: undefined;
  Categories: undefined;
  Movie: {
    id: number,
  };
};





export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>

    <Stack.Navigator>
      <Stack.Screen 
      name='Home'
      component={HomeScreen}
      options={{
        title: 'Movie App',
        headerStyle: {
          backgroundColor: COLORS.red,
        },
        headerTintColor: COLORS.text
      }}
      />
       <Stack.Screen 
      name='AllMovies'
      component={AllMovies}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: COLORS.red,
        },
        headerTintColor: COLORS.text
    }}

      />
      <Stack.Screen 
      name='Categories'
      component={Categories}
      options={{
        headerStyle: {
          backgroundColor: COLORS.red,
        },
        headerTintColor: COLORS.text
    }}
      />
      <Stack.Screen 
      name='Movie'
      component={Movie}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: COLORS.red,
        },
        headerTintColor: COLORS.text,
       
    }}
      />
    </Stack.Navigator>
   
    </NavigationContainer>
      </Provider>
  );
}

