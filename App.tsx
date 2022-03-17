import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/pages/HomeScreen';
import { AllMovies } from './src/pages/AllMovies';
import store from './src/store';

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  HomeScreen: undefined;
  AllMovies: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>

    <Stack.Navigator>
      <Stack.Screen 
      name='Home'
      component={HomeScreen}
      options={{title: 'Welcome'}}
      />
       <Stack.Screen 
      name='AllMovies'
      component={AllMovies}
      options={{title: 'All movies'}}
      />
    </Stack.Navigator>
   
    </NavigationContainer>
      </Provider>
  );
}

