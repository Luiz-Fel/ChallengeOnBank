import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { COLORS } from "../../colors";
import { Creators, DataProps } from "../../store/ducks/data";

export function Categories({ navigation }: NativeStackScreenProps<RootStackParamList, 'Categories'>) {
    const dispatch = useDispatch()
    const { data } = useSelector((state : DataProps) => state) 
    const selectedCategory = data.selectedCategoryId

    const categories = data.genres
    return(
        <ScrollView style={{
            backgroundColor: '#000000',
            
          }}>
              {categories.map((currentCategory) => {
                  return(
                      <Pressable key={currentCategory.id} onPress={() => {
                        dispatch(Creators.selectCategory(currentCategory.id))
                        const filteredMovies = data.popularMovies.results.filter((movie) => movie.genre_ids.includes(currentCategory.id))
                        if(filteredMovies.length < 10) {
                            //LOAD MORE
                        }
                        navigation.navigate('AllMovies')
                        
                      }}>
                          <View  >


                          {selectedCategory === currentCategory.id 
                            ? <View style={styles.categorySection}>
                                <Text style={styles.categoryNameSelected}>{currentCategory.name}</Text>
                                <Icon name="right" size={22} color={COLORS.red} />
                            </View>
                            : <View style={styles.categorySection}>
                                <Text style={styles.categoryName}>{currentCategory.name}</Text>
                                <Icon name="right" size={22} color={COLORS.text} />
                            </View>
                          }
                        
                          </View>
                      </Pressable>
                  )
              })}
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    categorySection : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 16,
    },
    categoryName: {
        color: COLORS.text,
        fontSize: 32,
        padding: 16,

    },
    categoryNameSelected: {
        color: COLORS.red,
        fontSize: 32,
        padding: 16,

    }
})