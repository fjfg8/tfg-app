import React from "react";
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import {ScrollView,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";

class Login extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            token:''}
    }

    botonCambiar = (texto) => {
        this.setState({hola: texto})
    }
    onLogin() {
        
         fetch('https://tfg-apirest.herokuapp.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nick: this.state.user,
                password: this.state.password,
            }),
        })
        .then((response)=>{
            if(!response.ok){
                Alert.alert('Usuario o contraseña incorrectos')
            }
            else{
                this.state.token  = response.headers.get('Authorization')
                console.log(this.state.token) //Quitar
                this.props.navigation.navigate('Home')
            }})
        .catch((error) => {
            console.error(error);
          });
        }


    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput
                    value={this.state.user}
                    onChangeText={(user) => this.setState({ user })}
                    placeholder={'Username'}
                    
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    
                />
                <View style={{margin:7}} />
                <Button 
                          onPress={this.onLogin.bind(this)}
                          title="Login"
                      />
                  </View>
            )
        /*return (
            <View style={{ flex: 1 }}>
                <Text >
                    {this.state.hola}
                </Text>
                <TouchableOpacity
                    onPress={() => { this.botonCambiar("Ya te he saludado") }}>
                    <Text>
                        Cambiar Texto
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { const { navigate } = this.props.navigation;
                    navigate('Pantalla2', {
                    });}}>
                    <Text>
                        Cambiar Texto
                </Text>
                </TouchableOpacity>
            </View>
        )*/
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#ecf0f1',
    },
    input: {
     // width: 200,
     // height: 44,
     // padding: 10,
     // borderWidth: 1,
     // borderColor: 'black',
     // marginBottom: 10,
    },
  });

export default (Login);