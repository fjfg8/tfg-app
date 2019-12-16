import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';

class CustomRow extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            }

        
    }

    addProductCart() {
        
        fetch('https://tfg-apirest.herokuapp.com/cart/add', {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               userid: this.props.userid,
               productid: this.props.id,
               cantidad: "1"
           }),
       })
       .then((response)=>{
           if(!response.ok){
               Alert.alert('Error al añadir el producto')
           }})
       .catch((error) => {
           console.error(error);
         });
       
}

//const CustomRow = ({ id, title, image_url, pvp }) => 
    render() {
        return(
        <View style={styles.container}>
            
            <Image source={{ uri: this.props.image_url }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {this.props.title} 
                </Text>
            </View>
            <View style={styles.container_text}>
                <Text style={styles.pvp}>
                    {this.props.pvp} € 
                </Text>
            </View>
            
            <Button title="Añadir" onPress={() => {this.addProductCart()}}></Button> 
        </View>
        )
    }
}

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

export default CustomRow;