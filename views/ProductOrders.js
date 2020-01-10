import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert,TouchableOpacity } from 'react-native';
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import * as SecureStore from 'expo-secure-store';
import NumericInput from 'react-native-numeric-input'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomRowOrders from "./CustomRowOrders";
import { symbol } from "prop-types";



class ProductOrders extends React.PureComponent {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        
        this.state = {
            pedido: navigation.getParam('item', []),
            token: "",
            userid: "",
            productsList: [],
            loading: true,
            totalAmount: 0
            }
    }

    static navigationOptions = {
        title: 'Detalles del pedido',
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#369fe0',
            borderWidth: 0,
            borderBottomWidth: 2,
            borderBottomColor: 'black'
        },headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white'
        },
    }

    async componentDidMount() {
        await this._getToken()
        this.getOrderProducts()
    }

    async _getToken() {
        try {
            this.state.token = await SecureStore.getItemAsync("token");
            this.state.userid = await SecureStore.getItemAsync("id") 
          } catch(e) {
            console.error(e);
          }
    }

    getOrderProducts() {
        
        const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/pedido/' + this.state.pedido.pedido_id

        fetch(url, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'token': this.state.token
          },
      })
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: true,
           productsList: responseJson
          })
        })
        .then(()=>{
            this.getTotalAmount()
            this.setState({loading: false})
          })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    getTotalAmount() {
        var list = this.state.productsList
        var total = 0
        
        //console.log(list.item.userid)
        list.forEach(function(item) {
          total += item.cantidad*item.precio
          
        }, total)
        return this.state.totalAmount = total.toFixed(2)
        
      }

    renderEmptySection() {
        return <Text>
            El pedido no contiene productos. Esto es imposible de que pase.
        </Text>
    }

    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        
        return <TouchableOpacity activeOpacity={0.8} onPress={() => {navigate('ProductDetails', {item})}}>
        <CustomRowOrders updateCart={this.updateProducts}
        userid={this.state.userid}
        id={data.item.producto_id}
        title={data.item.nombre}
        image_url={data.item.image_uri}
        pvp={data.item.precio}
        amount={data.item.cantidad}
        token={this.state.token}/>
        </TouchableOpacity>
        
        
    }
    renderFooter() {
        return <Text style={styles.total_style}>Subtotal: {this.state.totalAmount}€</Text>
      }

    render() {

        if(!this.state.loading) {
            return (
            
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.title_style}>
                            Pedido con fecha: {this.state.pedido.nombre}
                        </Text>
                    </View>
                    
                    <View style={styles.container_flatlist}>
                        <FlatList
                        
                        data={this.state.productsList}
                        renderItem={item=> this.renderItem(item)}
                        keyExtractor={(item) => item.linped_id.toString()}
                        ListEmptyComponent = {this.renderEmptySection()}
                        ListFooterComponent = {this.renderFooter()}
                        ListFooterComponentStyle = {styles.footerContainer}
                        />
                    </View>
                </View>
            )
        }
        else {
            return <ActivityIndicator />
        }
        
    
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    container_flatlist: {
        flex: 8,
    },
    footerContainer: {
        alignItems: 'flex-end',
        marginRight: 8
      },
      total_style: {
        fontSize: 20,
          color: '#fc7672',
          fontWeight : 'bold'
      },
      title_style: {
        fontSize: 20,
          color: '#369fe0',
          fontWeight : 'bold'
      }
  })


export default (ProductOrders);