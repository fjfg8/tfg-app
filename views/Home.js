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
    StyleSheet
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import CustomRow from "./CustomRow"
import { ScrollView } from "react-native-gesture-handler";



class Home extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token:"",
            userid:"",
            productsList: [],
            loading: true}
    }

    static navigationOptions = {
        title: 'Recomendaciones',
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
        this.getProducts()
    }

    async _getToken() {
        try {
            this.state.token = await SecureStore.getItemAsync("token");
            this.state.userid = await SecureStore.getItemAsync("id") 
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
        const { navigate } = this.props.navigation
        var item = data.item
        return <TouchableOpacity activeOpacity={0.8} onPress={() => {navigate('ProductDetails', {item})}} style={styles.itemflatlist}>
        <CustomRow userid={this.state.userid} id={data.item.producto_id} title={data.item.nombre} image_url={data.item.image_uri} pvp={data.item.precio}/>
        </TouchableOpacity>        
            
    }
    render() {
        if(!this.state.loading) {
            return (
                <ScrollView>
                    <View>
                        <Text style={styles.TitleListText}>Productos más comprados</Text>
                    
                    <FlatList
                    horizontal
                    
                    //ItemSeparatorComponent={()=><View style={{width: 5}}/>} 
                    data={this.state.productsList}
                    keyExtractor={(item) => item.producto_id.toString()}
                    renderItem={item=> this.renderItem(item)}
                     
                    />
                    </View>
                    <View>
                        <Text style={styles.TitleListText}>Productos comprados recientemete</Text>
                    
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

const styles = StyleSheet.create({
    TitleListText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#369fe0',
        paddingLeft: 8,
        
    },
})

export default (Home);