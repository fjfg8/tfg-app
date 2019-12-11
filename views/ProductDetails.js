import React from "react";
import { View, Text, StyleSheet, Image, Button } from 'react-native';
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás



class ProductDetails extends React.PureComponent {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        
        this.state = {
            product: navigation.getParam('item', [])
            }
    }

    static navigationOptions = {
        title: 'Detalles'
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
            
            <Button title="Añadir"></Button> 
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