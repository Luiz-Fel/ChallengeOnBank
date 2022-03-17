import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../colors';


export function Header() {

    return(
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Popular</Text>
            <Pressable style={styles.headerButton}>
                <Text style={styles.buttonText}>SEE MORE</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 48,
        color: COLORS.text,
        padding: 16,
        marginRight: 'auto',
    },
    headerButton: {
 
        paddingRight: 20,
    },
    buttonText: {
        color: COLORS.red,
        fontSize: 18,
    }
})