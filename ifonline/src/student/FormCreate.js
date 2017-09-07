import React from 'react';
import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';


const Form = t.form.Form;

const Objeto = t.struct({
  Nome: t.String,
  Senha: t.String,
  //nick: t.String,  apelido pode ser o login
  //registration: t.String,  remover esse campo no model
  name: t.String,
  //age: t.String,  remover idade no model
  birthDate: t.Date,
  email: t.String,
});

let formatDate = (format, date) => {
  return moment(date).format(format);
}

const options = {
  fields: {
    Nome: {
      label:'Usuário: ',
      help:'nome que será usado para fazer login'
    },
    Senha: {
      label:'Senha: ',
      help:'digite a senha do usuário'
    },
    nick: {
      label:'Apelido: ',
      help:'digite um apelido para o usuário'
    },
    name: {
      label:'Nome Completo: ',
      help:'digite seu nome completo'
    },
    birthDate: {
      label:'Data Nascimento: ',
      help:'digite a data de nascimento',
      config:{
        format: (date) =>  formatDate("DD-MM-YYYY", date)
      }
    },
    email: {
      label:'E-mail: ',
      help:'digite o email do usuário'
    }
  }
};

export default class FormCreateUserAndStudent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false
    }
  }

  create() {
    const value = this.refs.form.getValue();
    console.log("VALOR ENVIADO NO FORM: ",value);
    // http://darkSide:3000
    // https://ifonline.herokuapp.com
    if(value) {
      this.setState({isLoading:true});
      fetch('https://ifonline.herokuapp.com/user',{
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
      .then(user => {
        fetch('https://ifonline.herokuapp.com/student',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            name: value.name,
            birthDate: value.birthDate,
            email:value.email, 
            user:user._id
          })
        })
        .then(response => response.json())
        .then(student => {
          this.setState({isLoading:false});
          this.props.navigation.navigate('Login');
        })
      }) 
      .catch(error => console.log("ERROR"+error))
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
              type={Objeto}
              options={options}
            />
          </View>  
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.create.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Login')} underlayColor='#99d9f4'>
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