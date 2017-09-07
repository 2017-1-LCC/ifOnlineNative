import React from 'react';
import t from 'tcomb-form-native';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const STORAGE_KEY = 'TOKEN';
const STORAGE_USER = 'ID_USER';
const STORAGE_TYPE_USER = "TYPE_USER";

const Form = t.form.Form;

const User = t.struct({
  Nome: t.String,
  Senha: t.String
})

const options = {};

export default class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    }
    if(this.props.screenProps.isAuth) {
      this.props.navigation.navigate('Profile');
    }
  }

  async _addInStorage(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ',error.message);
    } 
  };

  cancel() {

  }

  singUp() {
    const value = this.refs.form.getValue();
    if(value) {
      this.setState({isLoading:true});
      fetch('https://ifonline.herokuapp.com/login',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name: value.Nome,
          password: value.Senha
        })
      })
      .then(response => response.json())
      .then(token => {
        this._addInStorage(STORAGE_KEY,token.token);
        this._addInStorage(STORAGE_USER,token.idUser);
        this._addInStorage(STORAGE_TYPE_USER,token.typeUser);
      })
      .then(() => {
        this.setState({isLoading:false});
        this.props.navigation.navigate('Profile');
      })
      .done()
    }
  };

  render() {
      if(!this.state.isLoading) {
       return( <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>IF ONLINE</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref="form"
              type={User}
              options={options}
            />
          </View>  
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.singUp.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('CreateUser')} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Novo Usuário</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.cancel.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableHighlight>
          </View>
        </View> );
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.isLoading} color="white" overlayColor="green"/>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#006400',
    borderColor: '#006400',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
})