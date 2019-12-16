import React from 'react';
import { Alert, View, Text, Vibration, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

export class ExpoScanner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.scannedCode = null;

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      productsList: [],
      loading: true
    };
  }

    componentDidMount() { 
        this.getProducts()  
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

    findProduct(cod) {
        //const getFruit = fruits.find(fruit => fruit.name === 'apples');
        const list = this.state.productsList
        const getProduct = list.find(product => product.codigo == cod)
        return getProduct
    }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await this.setState({hasCameraPermission: status === 'granted'});
    await this.resetScanner();
  }

  renderAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => this.resetScanner() },
      ],
      { cancelable: true }
    );
  }

  onBarCodeRead({ type, data } ) {
    if ((type === this.state.scannedItem.type && data === this.state.scannedItem.data) || data === null) {
      return;
    }

    Vibration.vibrate();
    this.setState({ scannedItem: { data, type } });

    const item = this.findProduct(data)
    
    if(item == undefined) {
        Alert.alert('Producto no disponible')
    }
    else {
        this.props.navigation.navigate('ProductDetails',{item})
    }
    

  }

  renderMessage() {
    if (this.state.scannedItem && this.state.scannedItem.type) {
      const { type, data } = this.state.scannedItem;
      return (
        <Text style={styles.scanScreenMessage}>
          {`Scanned \n ${type} \n ${data}`}
        </Text>
      );
    }
    return <Text style={styles.scanScreenMessage}>Focus the barcode to scan.</Text>;
  }

  resetScanner() {
    this.scannedCode = null;
    this.setState({
      scannedItem: {
        type: null,
        data: null
      }
    });
  }

  render() {

        if(!this.state.loading) {
            const { hasCameraPermission } = this.state;

            if (hasCameraPermission === null) {
                return <Text>Requesting for camera permission</Text>;
            }
            if (hasCameraPermission === false) {
                return <Text>No access to camera</Text>;
            }
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeScanned={this.onBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    />
                    {this.renderMessage()}
                    </View>
                </View>
            );
        }
        else {
            return <ActivityIndicator />
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  scanScreenMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});