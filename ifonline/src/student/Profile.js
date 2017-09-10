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

class GroupProfile extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
        <TouchableHighlight onPress={() => this.props.navigation.navigate("OneGroup",{idGroup:this.props.group._id})} underlayColor='#99d9f4'>
          <Card>
            <CardItem header>
              <Text>Grupo de: {this.props.group.matter} </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Cidade: {this.props.group.local} </Text>
                <Text>Máximo: {this.props.group.numMax} </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
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
            user:{groups:[],user:{}}
        }
    };

    componentWillMount() {
        console.log("WILL MOUNT PROFILE ");
        // SE O TYPE USER FOR STUDENT REQUEST NA API DE STUDENT SE NÃO REQUEST NA API DE TEACHER
        if(this.props.screenProps.typeUser === 'STUDENT') {
            fetch('https://ifonline.herokuapp.com/findstudentbyuser/'+this.props.screenProps.idUser,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.screenProps.token
                }
            })
            .then(response => response.json())
            .then(user => {
                console.log("USER NO THEN: ",user);
                this.setState({user:user});
            })
            .catch(error => console.log(error));
        } else {
            fetch('https://ifonline.herokuapp.com/findteacherbyuser/'+this.props.screenProps.idUser,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.screenProps.token
                }
            })
            .then(response => response.json())
            .then(user => {
                console.log("TEACHER NO THEN: ",user);
                this.setState({user:user});
            })
            .catch(error => console.log(error));
        }
    };


    async _logout() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    };

    render(){
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
                            this.state.user.groups.map(group => <GroupProfile key={group._id} group={group} navigation={this.props.navigation}/>)
                        }
                    </View>
            
                    <TouchableHighlight onPress={this._logout.bind(this,false)} underlayColor='#99d9f4'>
                        <Text >logout</Text>
                    </TouchableHighlight>
                </Content>
            </Container>
        );
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
    borderStyle:'solid',
    borderColor:'black'
  },
  textInfoUsuario:{
    paddingLeft:10,
    paddingTop:5,
    fontSize:12
  },
  grupos:{
    padding:5,
    backgroundColor:'black'
  }
})