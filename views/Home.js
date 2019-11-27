import React from "react";
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

class Login extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { hola: "Estamos en la pantalla 2" }
    }

    botonCambiar = (texto) => {
        this.setState({hola: texto})
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text >
                    {this.state.hola}
                </Text>
                <TouchableOpacity
                    onPress={() => { this.botonCambiar("Ya te he saludado") }}>
                    <Text>
                        
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
        )
    }
}

export default (Login);