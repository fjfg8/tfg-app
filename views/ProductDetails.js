import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import * as SecureStore from 'expo-secure-store';



class ProductDetails extends React.PureComponent {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        
        this.state = {
            product: navigation.getParam('item', []),
            token: "",
            userid: ""
            }
    }

    static navigationOptions = {
        title: 'Detalles'
    }

    async componentDidMount() {
        await this._getToken()
    }

    async _getToken() {
        try {
            this.state.token = await SecureStore.getItemAsync("token");
            this.state.userid = await SecureStore.getItemAsync("id") 
          } catch(e) {
            console.error(e);
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
                   userid: this.state.userid,
                   productid: this.state.product.producto_id,
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
    
    render() {
        return (
            <View style={styles.container}>
        
            <Image source={{ uri: this.state.product.image_uri }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {this.state.product.nombre} 
                </Text>
            </View>
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {this.state.product.precio} 
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
        fontSize: 16,
        color: '#000',
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
        height: 200,
        width: 200,
    },
});


export default (ProductDetails);