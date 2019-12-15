import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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
    pvp: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
        
    },
    photo: {
        height: 60,
        width: 60,
    },
    container_button: {
        flexDirection: 'column',
        //marginLeft: 12,
        justifyContent: 'center',
    },
    buttonS: {
       // height: 50,
       // width: 50,
       // alignSelf: "center",
    },
});
/*import { FontAwesome } from '@expo/vector-icons';

const myButton = (
  <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={}>
    
  </FontAwesome.Button>
);*/
const CustomRowVertical = ({userid, id, title, image_url, pvp }) => (
    <View style={styles.container}>
        
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title} 
            </Text>
            <Text style={styles.pvp}>
                {pvp} € 
            </Text>
        </View>
        <View style={styles.container_button}>
        <Icon name="md-add-circle" size={40} color="#369fe0" onPress={()=>{}} />  
        </View>
        
          
    </View>
);

export default CustomRowVertical;