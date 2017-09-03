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

export default class Grupo extends React.Component {

  constructor(props) {
    super(props);
    console.log("props em onegruop: ",this.props);
  }

  componentWillMount() {
    console.log("CRIADO COMPONENT ONE GRUPOS");
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