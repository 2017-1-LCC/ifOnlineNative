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







export default class Profile extends React.Component {

    componentWillMount() {
        console.log("CRIADO COMPONENT PROFILE");
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

    </Content>
</Container>
        );
    }
}