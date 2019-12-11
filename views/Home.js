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
import { ScrollView } from "react-native-gesture-handler";



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
    
    renderHeader = () => {
        return <Text>Productos más comprados</Text>;
      };
    
    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        return <TouchableOpacity onPress={() => {navigate('ProductDetails', {item})}}>
        <CustomRow id={data.item.producto_id} title={data.item.nombre} image_url={data.item.image_uri} pvp={data.item.precio}/>
        </TouchableOpacity>        
            
    }
    render() {
        if(!this.state.loading) {
            return (
                <ScrollView>
                    <View>
                        <Text>Productos más comprados</Text>
                    
                    <FlatList
                    horizontal
                    //ItemSeparatorComponent={()=><View style={{width: 5}}/>} 
                    data={this.state.productsList}
                    keyExtractor={(item) => item.producto_id.toString()}
                    renderItem={item=> this.renderItem(item)}
                     
                    />
                    </View>
                    <View>
                        <Text>Productos comprados recientemete</Text>
                    
                    <FlatList
                    horizontal
                    //ItemSeparatorComponent={()=><View style={{width: 5}}/>} 
                    data={this.state.productsList}
                    keyExtractor={(item) => item.producto_id.toString()}
                    renderItem={item=> this.renderItem(item)}
                     
                    />
                    </View>
                </ScrollView>
                    )
        } else {
            return <ActivityIndicator />
        }
        
    }
}

export default (Home);