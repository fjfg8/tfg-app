import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginLeft:8,
        marginRight:8,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    container_text: {
        //flex: 1,
        //flexDirection: 'column',
        alignSelf: "center",
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        alignSelf: "center",
        height: 60,
        width: 60,
    },
    pvp: {
        fontSize: 16,
        color: '#000',
    },
});

const CustomRow = ({ id, title, image_url, pvp }) => (
    <View style={styles.container}>
        
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title} 
            </Text>
        </View>
        <View style={styles.container_text}>
            <Text style={styles.pvp}>
                {pvp} € 
            </Text>
        </View>
        
        <Button title="Añadir"></Button> 
    </View>
);

export default CustomRow;