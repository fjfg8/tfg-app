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
    ScrollView
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import CustomRowVertical from "./CustomRowVertical";
import {SearchBar} from 'react-native-elements';



class Products extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token:"",
            productsList: [],
            loading: true,
            search: ''}
        this.arrayholder = []
        this.arrayInicial = []
    }

    static navigationOptions = {
        title: 'Productos'
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
          this.arrayholder = responseJson
          this.arrayInicial = responseJson
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }


    searchFilterFunction = text => {    


        const newData = this.arrayholder.filter(item => {      
          const itemData = `${item.nombre.toUpperCase()}`
          
           const textData = text.toUpperCase()
            
           return itemData.indexOf(textData) > -1    
        })
        
        this.setState({ productsList: newData,
            search: text
         });  
    }
    
    filterByCategoryFunction(cat) {
        if (cat != 0) {
            var filtradosCategoria = this.arrayholder.filter(item =>{
                return item.id_categoria == cat
            })
            this.arrayholder = filtradosCategoria
            this.setState({
                productsList: filtradosCategoria,
                search: ''
            })
        } else {
            this.arrayholder = this.arrayInicial
            this.setState({
                productsList: this.arrayInicial,
                search:''
            })
        }
        
    }
    
    renderHeaderBar = () => {
    return (      
        <SearchBar        
            placeholder="Buscar productos.."        
            lightTheme        
            round        
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.search}            
        />    
        )
    }

    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        return <TouchableOpacity onPress={() => {navigate('ProductDetails', {item})}}>
        <CustomRowVertical id={data.item.producto_id} title={data.item.nombre} image_url={data.item.image_uri} pvp={data.item.precio}/>
        </TouchableOpacity>
    }
    render() {
        if(!this.state.loading) {
            return (
                    <ScrollView>
                    <FlatList
                    
                    //ItemSeparatorComponent={()=><View style={{width: 5}}/>} 
                    data={this.state.productsList}
                    renderItem={item=> this.renderItem(item)}
                    keyExtractor={(item) => item.producto_id.toString()}
                    ListHeaderComponent={this.renderHeaderBar} 
                    enableEmptySections
                    />
                    <Button 
                          onPress={()=>{this.filterByCategoryFunction(2)}}
                          title="Categoria"
                      />
                    <Button 
                          onPress={()=>{this.filterByCategoryFunction(0)}}
                          title="All"
                      />
                    </ScrollView>
                    )
                     
        } else {
            return <ActivityIndicator />
        }
        
    }
}

export default (Products);