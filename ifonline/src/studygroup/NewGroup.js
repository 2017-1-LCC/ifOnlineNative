import React from 'react';
import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native';

const Form = t.form.Form;

const Objeto = t.struct({
  discipline:t.String,
  academicClass:t.String,
  dateStart:t.Date,
  dateEnd:t.Date
});

let formatDate = (format, date) => {
  return moment(date).format(format);
}

const options = {
  fields: {
    discipline: {
      label:'Disciplina: ',
      help:'Disciplina foco do grupo'
    },
    academicClass: {
      label:'Turma: ',
      help:'Turma da disciplina'
    },
    dateStart: {
      label:'Data de início: ',
      help:'Data em que começou o semestre',
      config:{
        format: (date) =>  formatDate("DD-MM-YYYY", date)
      }
    },
    dateEnd: {
      label:'Data de termino: ',
      help:'Data em que termina o semestre',
      config:{
        format: (date) =>  formatDate("DD-MM-YYYY", date)
      }
    }
  }
};

export default class FormCreateStudyGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      dados:this.props.navigation.state.params.dados,
      idTeacher:this.props.navigation.state.params.idTeacher
    }
  }

  create() {
    const value = this.refs.form.getValue();
    if(value) {
      this.setState({isLoading:true});
      fetch('https://ifonline.herokuapp.com/studygroup',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + this.props.navigation.state.params.dados.token
        },
        body:JSON.stringify({
          admin:this.state.idTeacher,
          discipline:value.discipline,
          academicClass:value.academicClass,
          dateStart:value.dateStart,
          dateEnd:value.dateEnd
        })
      })
      .then(response => response.json())
      .then(group => {
        this.setState({isLoading:false});
        this.props.navigation.navigate('Profile',{dados:this.state.dados});
      })
      .catch(error => console.log("Error:",error))
    }
  }

  render() {
      if(!this.state.isLoading) {
       return( <ScrollView 
       style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Novo Grupo</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref="form"
              type={Objeto}
              options={options}
            />
            <TouchableHighlight style={styles.button} onPress={this.create.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Profile',{dados:this.state.dados})} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableHighlight>
          </View>
        </ScrollView> );
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