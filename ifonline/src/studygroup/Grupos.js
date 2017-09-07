import React from "react";
import { StatusBar } from "react-native";
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

export default class Grupos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      group:{}
    }
  }

  componentWillMount() {
    console.log("CRIADO COMPONENT GRUPOS");
    fetch('https://ifonline.herokuapp.com/studygroup',{
      'method':'GET',
      'headers':{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + this.props.screenProps.token
      }
    })
    .then(response => response.json())
    .then(group => this.setState({group:group}))
  };

  render() {
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
              <Title>Grupos</Title>
          </Body>
          <Right />
          </Header>
          <Content padder>

          </Content>
      </Container>
    )
  }

}