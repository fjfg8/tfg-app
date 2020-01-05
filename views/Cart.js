import React from "react";
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Button,
    Alert,
    ScrollView,
    DrawerLayoutAndroid
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { withNavigationFocus } from 'react-navigation';
import CustomRowCart from "./CustomRowCart";

class Cart extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token:"",
            productsList: [],
            loading: true,
            userid:""
            }
            this.updateProducts = this.updateProducts.bind(this)
    }

    static navigationOptions = {
        title: 'Carrito',
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
        this.getCartProducts()
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.getCartProducts()
        }
      }

    async _getToken() {
        try {
            this.state.token = await SecureStore.getItemAsync("token")
            this.state.userid = await SecureStore.getItemAsync("id")
            
          } catch(e) {
            console.error(e); 
          }
    }

    getCartProducts() {
        const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/cart'

        fetch(url)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           productsList: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    updateProducts() {
        const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/cart'

        fetch(url)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            productsList: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }


    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        return <TouchableOpacity onPress={() => {navigate('ProductDetails', {item})}}>
        <CustomRowCart updateCart={this.updateProducts} userid={this.state.userid} id={data.item.producto_id} title={data.item.nombre} image_url={data.item.image_uri} pvp={data.item.precio} amount={data.item.cantidad}/>
        </TouchableOpacity>
    }

    renderEmptySection() {
        return <Text>
            El carrito está vacío. Ve a la pestaña productos y añade los productos que desea comprar.
        </Text>
    }

    render() {
        if(!this.state.loading) {

            return (
                    <View>
                    <FlatList
                    
                    data={this.state.productsList}
                    renderItem={item=> this.renderItem(item)}
                    keyExtractor={(item) => item.producto_id.toString()}
                    ListEmptyComponent = {this.renderEmptySection()}
                    />
                    </View>
                    )
                     
        } else {
            return <ActivityIndicator />
        }
        
    }
}
export default withNavigationFocus(Cart);