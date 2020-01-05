import React from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


class CustomRow extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            value: 1
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
               cantidad: this.state.value
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
                <Text numberOfLines={1} style={styles.title}>
                    {this.props.title} 
                </Text>
            </View>
            <View style={styles.container_text}>
                <Text style={styles.pvp}>
                    {this.props.pvp} € 
                </Text>
            </View>
            <View style={styles.container_buttons}>
                <NumericInput value={this.state.value} onChange={value => this.setState({value})} rounded textColor='#2a92d1' 
                    iconStyle={{ color: 'white' }} 
                    rightButtonBackgroundColor='#369fe0' 
                    leftButtonBackgroundColor='#74bce8'
                    minValue={1}
                    totalHeight={35}/>
                    <TouchableOpacity onPress={() => {this.addProductCart()}}>
                    <FontAwesome5 name="cart-plus" size={35} color="#369fe0"  />
                    </TouchableOpacity>
                
                {/* <Button title="Añadir" onPress={() => {this.addProductCart()}}></Button>  */}

            </View>
            
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
        width: 200
        
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
    container_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});

export default CustomRow;