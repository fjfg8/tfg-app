import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native'
import { ExpoScanner } from './ExpoScanner';

class ScannerScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  static navigationOptions = {
    title: 'Bar Scanner',
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

  componentDidMount() {
    this.focusListner = this.props.navigation.addListener(
      'didFocus',
      () => this.setState({ isFocused: true }),
    );
    this.blurListner = this.props.navigation.addListener(
      'willBlur',
      () => this.setState({ isFocused: false }),
    );
  }
  componentWillUnmount() {
    this.focusListner.remove();
    this.blurListner.remove();
  }

  render() {
    if (!this.state.isFocused) {
      return (
        <View contentContainerStyle={styles.container} style={styles.spinner}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return (<ExpoScanner navigation={this.props.navigation} />);
  }
}

const styles = {
  container: {
    flexGrow: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
        
export default ScannerScreen;