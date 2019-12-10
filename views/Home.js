import React from "react";
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Button 
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import CustomRow from "./CustomRow"


class Home extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token:"",
            productsList: [],
            loading: true}
    }
    
    componentDidMount() {
        this._getToken()
        this.getProducts()
    }

    async _getToken() {
        try {
            this.state.token = await SecureStore.getItemAsync("token"); 
          } catch(e) {
            console.error(e);
          }
    }

    getProducts() {
        fetch('https://tfg-apirest.herokuapp.com/products')
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           productsList: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }
    
    
    renderItem(data) {

        return <CustomRow title={data.item.nombre} image_url={data.item.image_uri}/>
    }
    render() {
        if(!this.state.loading) {
            return (
                    <View>
                        <Text>Todos los productos</Text>
                    
                    <FlatList
                    horizontal
                    //ItemSeparatorComponent={()=><View style={{width: 5}}/>} 
                    data={this.state.productsList}
                    renderItem={item=> this.renderItem(item)}
                    keyExtractor={(item) => item.producto_id.toString()} 
                    />
                    </View>)
        } else {
            return <ActivityIndicator />
        }
        
    }
}

export default (Home);