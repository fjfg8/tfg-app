import React from "react";
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Button,
    Alert,
    StyleSheet
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
            userid:"",
            fecha: "",
            totalAmount: 0,
            modalVisible: false,
            date: "",
            haciendopedido: false,
            pedidoId: ""
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

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
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

    updateProducts() {
        const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/cart'

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

    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        return <TouchableOpacity activeOpacity={0.8} onPress={() => {navigate('ProductDetails', {item})}}>
        <CustomRowCart updateCart={this.updateProducts}
        userid={this.state.userid}
        id={data.item.producto_id}
        title={data.item.nombre}
        image_url={data.item.image_uri}
        pvp={data.item.precio}
        amount={data.item.cantidad}
        token={this.state.token}/>
        </TouchableOpacity>
    }

    renderEmptySection() {
        return <Text>
            El carrito está vacío. Ve a la pestaña productos y añade los productos que desea comprar.
        </Text>
    }

    renderFooter() {
      return <Text style={styles.total_style}>Subtotal: {this.state.totalAmount}€</Text>
    }

    buyProducts() {
      this.getDate()
      
      this.setModalVisible(true)
      
    }

    getDate() {
      var day = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      this.setState({
        //Setting the value of the date time
        date:
          year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec,
      },()=>{this.createOrder()});
      
    }

    createOrder() {

      const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/pedidos'
      fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': this.state.token,
            
        },
        body: JSON.stringify({
            fecha: this.state.date
        }),
    })
    .then((response)=>{
        if(!response.ok){
            Alert.alert('Error al crear el pedido')
        }
      else {
        this.setState({haciendopedido: true}, () => {this.getIdOrder()})
      }})
    .catch((error) => {
        console.error(error);
      });
    }

    getIdOrder() {
      const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/get-pedido'
      fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': this.state.token,
            'fecha': this.state.date
        },
    })
    .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           pedidoId: responseJson[0].pedido_id
          }, () => {this.addProductsToOrdersAndStats()})
          
        })
        .catch(error=>console.log(error))
    }

    addProductsToOrdersAndStats() {
      
      var list = this.state.productsList
      var tkid = [this.state.token, this.state.userid,this.state.date]
      const url = 'https://tfg-apirest.herokuapp.com/user/' + this.state.userid +'/pedido/' + this.state.pedidoId

      list.forEach(function(item) {

        fetch(url, {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'token': tkid[0],
               
           },
           body: JSON.stringify({
               productid: item.id_producto,
               cantidad: item.cantidad,   
           }),
       })
       .then((response)=>{
        if(!response.ok){
            Alert.alert('Error al añadir el producto a pedidos')
        } else {
          fetch('https://tfg-apirest.herokuapp.com/products/stats', {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               'token': tkid[0],
               'userid': tkid[1]
           },
           body: JSON.stringify({
               userid: item.id_usuario,
               productid: item.id_producto,
               cantidad: item.cantidad,
               fecha: tkid[2]//Metodo de añadir fecha
           }),
       })
       .then((response)=>{
           if(!response.ok){
               Alert.alert('Error al añadir el producto a estadisticas')
           } else {
            
              fetch('https://tfg-apirest.herokuapp.com/cart/del', {
                 method: 'DELETE',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                     'token': tkid[0],
                     'userid': tkid[1]
                 },
                 body: JSON.stringify({
                     userid: item.id_usuario,
                     productid: item.id_producto,
                 }),
             })
             .then((response)=>{
                 if(!response.ok){
                     Alert.alert('Error al eliminar el producto del carrtio')
                 }
                 
              }).catch((error) => {
                 console.error(error);
               });
           }
          })
       .catch((error) => {
           console.error(error);
         });
        }
      })
      .catch((error) => {
          console.error(error);
        });
      }, tkid)
      console.log(this.state.date)
    }

    render() {
        if(!this.state.loading) {

            return (
                    <View style={styles.container}>
                      <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop: 22}}>
                          <View>
                            <Text>Su pedido se ha realizado con exito</Text>

                            <TouchableOpacity
                              onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                this.updateProducts()
                              }}>
                              <Text>Hide Modal</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                      <View style={styles.container_flatlist}>
                        <FlatList
                        
                        data={this.state.productsList}
                        renderItem={item=> this.renderItem(item)}
                        keyExtractor={(item) => item.producto_id.toString()}
                        ListEmptyComponent = {this.renderEmptySection()}
                        ListFooterComponent = {this.renderFooter()}
                        ListFooterComponentStyle = {styles.footerContainer}
                        />
                      </View>
                      <View>
                        <Button title='Comprar' onPress= {() => {this.buyProducts()}}></Button>
                      </View>
                    </View>
                    
                    )
                     
        } else {
            return <ActivityIndicator />
        }
        
    }
}

const styles = StyleSheet.create({
  navBarLeftButton: {
      //width: 200,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  container: {

      flex: 1,
      flexDirection: 'column'

  },
  footerContainer: {
    alignItems: 'flex-end',
    marginRight: 8
  },
  container_flatlist: {

      flex: 8,

  },
  total_style: {
    fontSize: 20,
      color: '#fc7672',
      fontWeight : 'bold'
  }
})

export default withNavigationFocus(Cart);