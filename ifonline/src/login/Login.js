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

let STORAGE_KEY = 'TOKEN';

const Form = t.form.Form;

const User = t.struct({
  Nome: t.String,
  Senha: t.String
})

const options = {};

export default class Login extends React.Component {

  async _addToken(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ',error.message);
    } 
  };

  async _logout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  };

  cancel() {
    console.log("fecha aplicativo");
  }

  singUp() {
    const value = this.refs.form.getValue();
    if(value) {
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
        this._addToken(STORAGE_KEY,token.token);
      })
      .done()
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require('./logo.png')}
          />
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
          <TouchableHighlight style={styles.button} onPress={this.cancel.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);