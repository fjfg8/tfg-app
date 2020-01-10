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
import { withNavigationFocus } from 'react-navigation';


class Orders extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token:"",
            orderList: [],
            loading: true,
            userid:"",
            fecha: ""
            }
    }

    static navigationOptions = {
        title: 'Pedidos',
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
        this.getOrders()
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.getOrders()
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

    getOrders() {
        const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/pedidos'

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
           loading: false,
           orderList: responseJson
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        
        return <TouchableOpacity activeOpacity={0.8} onPress={() => {navigate('ProductOrders', {item})}}>
        <Text style={styles.title}>{data.item.nombre}</Text>
        </TouchableOpacity>
    }

    renderEmptySection() {
        return <Text>
            No has hecho ningún pedido.
        </Text>
    }

    renderFooter() {
      return <Button title='Comprar' onPress= {() => {this.buyProducts()}}></Button>
    }

    render() {
        if(!this.state.loading) {

            return (
                    <View>
                    <FlatList
                    
                    data={this.state.orderList}
                    renderItem={item=> this.renderItem(item)}
                    keyExtractor={(item) => item.pedido_id.toString()}
                    ListEmptyComponent = {this.renderEmptySection()}
                    //ListFooterComponent = {this.renderFooter()}
                    
                    />
                    </View>
                    )
                     
        } else {
            return <ActivityIndicator />
        }
        
    }
}

const styles = StyleSheet.create({
  title: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
      marginLeft: 8
  },
});
export default withNavigationFocus(Orders);