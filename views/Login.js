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

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            token:'',
            id:''}
    }

    static navigationOptions = {
        title: 'Login',
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

    nextFieldFocus = () => {
        this.field2.focus();
    }

    async _setToken() {
        try {
            SecureStore.setItemAsync("token",this.state.token)
            } catch(e) {
            console.error(e);
            }
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
                SecureStore.setItemAsync("token", response.headers.get('Authorization'))
                SecureStore.setItemAsync("id",response.headers.get('id'))
                 
                this.props.navigation.navigate('Home')
            }})
        .catch((error) => {
            console.error(error);
          });
        }


    render() {
        return (
            <View style={styles.container}>
                
                <Input
                    value={this.state.user}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText={(user) => this.setState({ user })}
                    placeholder='Username'
                    returnKeyType="next"
                    onSubmitEditing={this.nextFieldFocus}
                    //underlineColorAndroid = '#369fe0'
                    leftIcon={
                        <FontAwesome5
                          name='user'
                          size={25}
                          color='#369fe0'
                        />
                    }
                    leftIconContainerStyle = {{marginRight: 10}}
                    containerStyle = {styles.input}
                />
                <Input 
                    ref={input => {this.field2 = input}}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    returnKeyType="go"
                    onSubmitEditing={this.onLogin.bind(this)}
                    //underlineColorAndroid = '#369fe0'
                    leftIcon={
                        <FontAwesome5
                          name='lock'
                          size={25}
                          color='#369fe0'
                        />
                    }
                    leftIconContainerStyle = {{marginRight: 10}}
                    containerStyle = {styles.input}
                    
                />
                <View style={styles.container_button}>
                    <FontAwesome5.Button name="sign-in-alt"  backgroundColor = '#369fe0' onPress={this.onLogin.bind(this)}>
                        <Text style={styles.text_button}>
                        Iniciar Sesión 
                        </Text>
                    </FontAwesome5.Button>
                    </View>
                    <View style={styles.container_button}>
                    <FontAwesome5.Button name="user-plus" backgroundColor = '#369fe0'
                        onPress={() => {this.props.navigation.navigate('Register')}}>
                            <Text style={styles.text_button}>
                                Registrarse
                            </Text>
                    </FontAwesome5.Button>
                </View>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
      //backgroundColor: '#ecf0f1',
    },
    input: {
     // width: 200,
     // height: 44,
      padding: 10,
     // borderWidth: 1,
     // borderColor: 'red',
      marginBottom: 15,
    },
    text_button: {
        fontSize: 15,
        color: 'white',
        
    },
    container_button: {
        marginBottom: 10,
        width: 200
    }
  });

export default (Login);