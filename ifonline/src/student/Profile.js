import React from "react";
import { 
    StatusBar, 
    TouchableHighlight, 
    AsyncStorage, 
    StyleSheet,
    View,
    Image
} from "react-native";

import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";

const STORAGE_KEY = 'TOKEN';
const STORAGE_USER = 'ID_USER';
const STORAGE_TYPE_USER = "TYPE_USER";

class GroupProfile extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
        <TouchableHighlight 
        onPress={() => this.props.navigation.navigate("OneGroup",{group:this.props.group})} underlayColor='#99d9f4'>
          <Card>
            <CardItem header>
              <Text>Grupo de: {this.props.group.discipline} </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Turma: {this.props.group.academicClass} </Text>
                <Text>Inicio: {this.props.group.dateStart} </Text>
                <Text>Termino: {this.props.group.dateEnd} </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Text>Alunos: {this.props.group.students.length}</Text>
                </Button>
              </Left>
            </CardItem>
         </Card>
        </TouchableHighlight>
        );
    }
}

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{groups:[],user:{}},
            dados:this.props.navigation.state.params.dados,
            idTeacher:null
        }
    };

    componentWillMount() {
        console.log("WILL MOUNT PROFILE ");
        // SE O TYPE USER FOR STUDENT REQUEST NA API DE STUDENT SE NÃO REQUEST NA API DE TEACHER
        if(this.props.navigation.state.params.dados.typeUser === 'STUDENT') {
            fetch('https://ifonline.herokuapp.com/findstudentbyuser/'+this.props.navigation.state.params.dados.idUser,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.navigation.state.params.dados.token
                }
            })
            .then(response => response.json())
            .then(user => {
                this.setState({user:user});
            })
            .catch(error => console.log(error));
        } else {
            fetch('https://ifonline.herokuapp.com/findteacherbyuser/'+this.props.navigation.state.params.dados.idUser,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.navigation.state.params.dados.token
                }
            })
            .then(response => response.json())
            .then(user => {
                console.log("TEACHER NO THEN: ",user);
                this.setState({idTeacher:user._id});
                this.setState({user:user});
            })
            .catch(error => console.log(error));
        }
    };

/*
    async _logout() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            await AsyncStorage.removeItem(STORAGE_USER);
            await AsyncStorage.removeItem(STORAGE_TYPE_USER);
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    };
*/
    render(){
        if(this.state.user.user.typeUser === 'TEACHER') {
 return(
            <Container>
                <Header>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
                </Header>
                <Content padder>

                    <View style={styles.geral}>

                        <View style={styles.detalhesUsuario}>
                            <View style={styles.fotoUsuario}>
                                <Image
                                style={{ height: 100, width: 100 }}
                                source={require('../imgs/profile/Linux_Tux_852.png')}
                                />
                            </View>
                            <View style={styles.infoUsuaro}>
                                <Text style={styles.textInfoUsuario}>Nome: {this.state.user.name}</Text>
                                <Text style={styles.textInfoUsuario}>E-mail: {this.state.user.email}</Text>
                                <Text style={styles.textInfoUsuario}>Nick: {this.state.user.user.username}</Text>
                                <Text style={styles.textInfoUsuario}>Tipo: {this.state.user.user.typeUser}</Text>
                                
                            </View>
                        </View>
                    </View>
                    
                    <View>
                        <Button 
                        title="Novo Grupo"
                        onPress={() => this.props.navigation.navigate("NewGroup",{dados:this.state.dados,idTeacher:this.state.idTeacher})}/>
                    </View>

                    <View style={styles.grupos}>
                        {
                            this.state.user.groups.map(group => <GroupProfile key={group._id} group={group} 
                             navigation={this.props.navigation}/>)
                        }
                    </View>
    
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("Login")} underlayColor='#99d9f4'>
                        <Text >logout</Text>
                    </TouchableHighlight>

                </Content>
            </Container>
        );
        } else {
 return(
            <Container>
                <Header>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
                </Header>
                <Content padder>

                    <View style={styles.geral}>

                        <View style={styles.detalhesUsuario}>
                            <View style={styles.fotoUsuario}>
                                <Image
                                style={{ height: 100, width: 100 }}
                                source={require('../imgs/profile/Linux_Tux_852.png')}
                                />
                            </View>
                            <View style={styles.infoUsuaro}>
                                <Text style={styles.textInfoUsuario}>Nome: {this.state.user.name}</Text>
                                <Text style={styles.textInfoUsuario}>E-mail: {this.state.user.email}</Text>
                                <Text style={styles.textInfoUsuario}>Nick: {this.state.user.user.username}</Text>
                                <Text style={styles.textInfoUsuario}>Tipo: {this.state.user.user.typeUser}</Text>
                                
                            </View>
                        </View>
                    </View>

                    <View style={styles.grupos}>
                        {
                            this.state.user.groups.map(group => <GroupProfile key={group._id} group={group} 
                            user={this.state.user} navigation={this.props.navigation}/>)
                        }
                    </View>
            
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("Login")} underlayColor='#99d9f4'>
                        <Text >logout</Text>
                    </TouchableHighlight>

                </Content>
            </Container>
        );
        }
    }
}

const styles = StyleSheet.create({
  geral: {
    flex: 1,
    alignSelf: 'stretch'
  },
  detalhesUsuario:{
    flex:1,
    flexDirection:'row',
    paddingTop:5
  },
  fotoUsuario:{
    width:100,
    height:100,
    borderRadius:25,
    backgroundColor:'white',
    paddingTop:2
  },
  infoUsuaro:{
    paddingTop:10,
    paddingLeft:20,
    paddingBottom:20
  },
  textInfoUsuario:{
    fontSize:20
  },
  grupos:{
    padding:5,
    backgroundColor:'#E3F2FD'
  }
})