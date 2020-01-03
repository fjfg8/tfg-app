import React from "react";
//import { withNavigationFocus } from "react-navigation"; //Para manejar el boton de atrás
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
    StyleSheet
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import CustomRowVertical from "./CustomRowVertical";
import {SearchBar} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {
    MenuProvider,
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    renderers
  } from 'react-native-popup-menu';
const {SlideInMenu} = renderers;




class Products extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token:"",
            userid:"",
            productsList: [],
            loading: true,
            search: '',
            categoriesList: []}

        this.arrayholder = []
        this.arrayInicial = []

    }

    /*static navigationOptions = {
        title: 'Productos'
    }*/

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state
        return {
            title: 'Productos',
        };
      };

    async componentDidMount() {

        await this._getToken()
        this.getProducts()
        this.getCategories()

    }

    // openMenu = () => {
    //     console.log(this.drawopen)
    //     if(!this.drawopen) {
    //         this._drawer.openDrawer()
    //         //this.drawopen=true
    //     }
    //     else {
    //         this._drawer.closeDrawer()
    //         //this.drawopen=false
    //     }

    //    // Alert.alert('Boton apretado')
    // }

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
          this.arrayholder = responseJson
          this.arrayInicial = responseJson
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    getCategories() {
        fetch('https://tfg-apirest.herokuapp.com/categories')
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           categoriesList: responseJson
          })
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

        this.arrayholder = this.arrayInicial
            this.setState({
                productsList: this.arrayInicial,
                search:''
            })

        if (cat != 0) {
            var filtradosCategoria = this.arrayholder.filter(item =>{
                return item.id_categoria == cat
            })
            this.arrayholder = filtradosCategoria
            this.setState({
                productsList: filtradosCategoria,
                search: ''
            })
        }

    }

    renderHeaderBar = () => {
    return (
        <View>

        <SearchBar
            placeholder="Buscar productos.."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.search}
        />

        </View>
        )
    }

    renderItem(data) {
        const { navigate } = this.props.navigation
        var item = data.item
        return <TouchableOpacity onPress={() => {navigate('ProductDetails', {item})}}>
        <CustomRowVertical userid={this.state.userid} id={data.item.producto_id} title={data.item.nombre} image_url={data.item.image_uri} pvp={data.item.precio}/>
        </TouchableOpacity>
    }

    renderCategoryItem(data) {

        var item = data.item
        return <TouchableOpacity onPress={() => {this.filterByCategoryFunction(data.item.categoria_id),this.openMenu()}}>
        <Text>{data.item.nombre}</Text>
        </TouchableOpacity>
    }

    renderCategoryItemPop(data) {
        var item = data.item
        return <MenuOption onSelect={() => this.filterByCategoryFunction(data.item.categoria_id)} text={data.item.nombre} />
    }


    render() {
        if(!this.state.loading) {

            // var navigationView = (
            //     <View style={{flex: 1, backgroundColor: '#fff'}}>
            //         <TouchableOpacity onPress={() => {this.filterByCategoryFunction(0),this.openMenu()}}>
            //             <Text>Todos los productos</Text>
            //         </TouchableOpacity>
            //       <FlatList
            //         data={this.state.categoriesList}
            //         renderItem={item=> this.renderCategoryItem(item)}
            //         keyExtractor={(item) => item.categoria_id.toString()}

            //         enableEmptySections
            //         />
            //     </View>
            //   )

            return (
                <MenuProvider>

                    <View style={styles.container}>
                        <View style={styles.navBarLeftButton}>

                            <SearchBar
                                // inputStyle={{backgroundColor: 'white'}}
                                 containerStyle={{width: '85%'}}
                                // leftIconContainerStyle={{backgroundColor: 'white'}}
                                // rightIconContainerStyle={{backgroundColor: 'white'}}
                                platform='android'
                                placeholder="Buscar productos.."
                                //lightTheme
                                //round
                                onChangeText={text => this.searchFilterFunction(text)}
                                autoCorrect={false}
                                value={this.state.search}
                            />
                            <Menu renderer={SlideInMenu}/*renderer={Popover} rendererProps={{ preferredPlacement: 'left' }}*/>
                            <MenuTrigger /*text='Filtrar por categoría'*/ triggerTouchable={{activeOpacity: 1}}>
                            <FontAwesome5 name="filter" size={25} color="#369fe0" style={{marginLeft: 10}} />
                            </MenuTrigger>
                            <MenuOptions>
                            <FlatList
                                data={this.state.categoriesList}
                                renderItem={item=> this.renderCategoryItemPop(item)}
                                keyExtractor={(item) => item.categoria_id.toString()}
                                enableEmptySections
                                />
                                </MenuOptions>
                            </Menu>

                        </View>
                        <View style={styles.container_flatlist}>
                        <FlatList

                        //ItemSeparatorComponent={()=><View style={{width: 5}}/>}
                        data={this.state.productsList}
                        renderItem={item=> this.renderItem(item)}
                        keyExtractor={(item) => item.producto_id.toString()}
                        //ListHeaderComponent={this.renderHeaderBar}
                        enableEmptySections
                        />
                        </View>
                    </View>
                </MenuProvider>
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
    container_flatlist: {

        flex: 8,

    },
    searchbar: {
        minWidth:'600',

        paddingLeft: '5'
    },
    pvp: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {

        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',

    },
    photo: {
        height: 60,
        width: 60,
    },
    container_button: {
        flexDirection: 'column',
        //marginLeft: 12,
        justifyContent: 'center',
    },
    buttonS: {
       // height: 50,
       // width: 50,
       // alignSelf: "center",
    },
});

export default (Products);