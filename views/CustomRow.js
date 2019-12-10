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
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        //flex: 1,
        flexDirection: 'column',
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
});

const CustomRow = ({ title, image_url }) => (
    <View style={styles.container}>
        <TouchableOpacity>
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
        </TouchableOpacity>
        <Button title="Añadir"></Button> 
    </View>
);

export default CustomRow;