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
        title: 'Login'
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
            <View style={{padding: 20}}>
                
                <TextInput
                    value={this.state.user}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText={(user) => this.setState({ user })}
                    placeholder={'Username'}
                    returnKeyType="next"
                    onSubmitEditing={this.nextFieldFocus}
                    
                />
                <TextInput
                    ref={input => {this.field2 = input}}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    returnKeyType="go"
                    onSubmitEditing={this.onLogin.bind(this)}
                    
                />
                <View style={{margin:7}} >
                    <Button 
                        onPress={this.onLogin.bind(this)}
                        title="Login"
                    />
                    <Button 
                        onPress={() => {this.props.navigation.navigate('Register')}}
                        title="Register"
                    />
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