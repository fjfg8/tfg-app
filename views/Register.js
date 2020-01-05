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

class Register extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            nick: '',
            password: '',
            password2: '',
            nombre:'',
            apellidos: '',
            email: '',
            token:'',
            id:''}
    }

    static navigationOptions = {
        title: 'Register',
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

    //pet.body.nick == undefined || pet.body.password == undefined ||
   // pet.body.nombre == undefined || pet.body.apellidos == undefined ||
   // pet.body.email == undefined

    register() {

        if(this.state.password===this.state.password2) {
        
            fetch('https://tfg-apirest.herokuapp.com/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nick: this.state.nick,
                    password: this.state.password,
                    nombre: this.state.nombre,
                    apellidos: this.state.apellidos,
                    email: this.state.email
                }),
            })//then((resp)=>{ return resp.text() }).then((text)=>{ console.log(text) })
            .then((response)=>{
                if(!response.ok){
                    return response.text()
                }
                else{
                    this.props.navigation.navigate('Login')
                    return response.text()
                }})
                .then((responsetext)=> {       
                    Alert.alert(responsetext)
                    })
            .catch((error) => {
                console.error(error);
            });
        } else {
            Alert.alert('Las contraseñas no coiciden')
        }
    }


    render() {
        return (
            <View style={{padding: 20}}>
                
                <TextInput
                    value={this.state.user}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText={(nick) => this.setState({ nick })}
                    placeholder={'Nick'}
                    returnKeyType="next"
                    onSubmitEditing={this.nextFieldFocus}
                    
                />
                <TextInput
                    ref={input => {this.field2 = input}}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Contraseña'}
                    secureTextEntry={true}
                    returnKeyType="next"
                    onSubmitEditing={() => {this.field3.focus()}}
                    
                />
                <TextInput
                    ref={input => {this.field3 = input}}
                    value={this.state.password2}
                    onChangeText={(password2) => this.setState({ password2 })}
                    placeholder={'Repite la contraseña'}
                    secureTextEntry={true}
                    returnKeyType="next"
                    onSubmitEditing={() => {this.field4.focus()}}
                    
                />
                <TextInput
                    ref={input => {this.field4 = input}}
                    value={this.state.nombre}
                    autoCapitalize='words' 
                    autoCorrect={false}
                    onChangeText={(nombre) => this.setState({ nombre })}
                    placeholder={'Nombre'}
                    returnKeyType="next"
                    onSubmitEditing={() => {this.field5.focus()}}
                    
                />
                <TextInput
                    ref={input => {this.field5 = input}}
                    value={this.state.apellidos}
                    autoCapitalize='words' 
                    autoCorrect={false}
                    onChangeText={(apellidos) => this.setState({ apellidos })}
                    placeholder={'Apellidos'}
                    returnKeyType="next"
                    onSubmitEditing={() => {this.field6.focus()}}
                    
                />
                <TextInput
                    ref={input => {this.field6 = input}}
                    value={this.state.email}
                    autoCapitalize="none" 
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'E-mail'}
                    returnKeyType="go"
                    onSubmitEditing={this.register.bind(this)}
                    
                />
                <View style={{margin:7}} />
                <Button 
                          onPress={this.register.bind(this)}
                          title="Registrarse"
                      />
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

export default (Register);