import { StyleSheet, Text, View } from 'react-native';


export function Header() {

    return(
        <View style={styles.header}>    
            <Text>Filmes</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 30,
    }
})