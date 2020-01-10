import React from 'react';
import { View, Text, StyleSheet, Image, Button,Alert,TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

class CustomRowOrders extends React.PureComponent {

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
               'token': this.props.token,
               'userid': this.props.userid
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

    delProductCart() {
        fetch('https://tfg-apirest.herokuapp.com/cart/del', {
           method: 'DELETE',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'token': this.props.token,
               'userid': this.props.userid
           },
           body: JSON.stringify({
               userid: this.props.userid,
               productid: this.props.id,
           }),
       })
       .then((response)=>{
           if(!response.ok){
               Alert.alert('Error al eliminar el producto')
           }
           this.props.updateCart()

        }).catch((error) => {
           console.error(error);
         });
    }

    //const CustomRowVertical = ({userid, id, title, image_url, pvp }) => 
    

    render() {
        var total = this.props.pvp*this.props.amount
        return(
        <View style={styles.container}>
            
            <Image source={{ uri: this.props.image_url }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {this.props.title} 
                </Text>
                <Text style={styles.pvp}>
                    
                    {this.props.pvp}€ x {this.props.amount}ud/s = {total.toFixed(2)}€
                </Text>
            </View>
            
        </View>)
    }

}

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

export default CustomRowOrders;