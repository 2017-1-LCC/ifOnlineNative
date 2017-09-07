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
  Right,
  ListItem,
  List
} from "native-base";


class ListStudents extends React.Component {

  constructor(props) {
    super(props);
    console.log("props listStudents: ",props);
  };

  render() {
    return(
          <ListItem>
            <Text>{this.props.student.info.name}</Text>
          </ListItem>
    )
  }
}

export default class Grupo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      group:{students:[]}
    }
  }

  componentWillMount() {
    console.log("CRIADO COMPONENT ONE GRUPOS");
    fetch('https://ifonline.herokuapp.com/studygroup/'+this.props.navigation.state.params.idGroup,{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + this.props.screenProps.token
      }
    })
    .then(response => response.json())
    .then(group => this.setState({group:group}))
    .then(() => console.log("grup: ",this.state.group))
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
              <Title>Grupo </Title>
          </Body>
          <Right />
          </Header>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>Disciplina: { this.state.group.matter } </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Cidade: { this.state.group.local }</Text>

                </Body>
              </CardItem>
              <CardItem footer>
                <Text>footer</Text>
              </CardItem>
          </Card>
          <List>
            <ListItem itemDivider>
              <Text>Alunos do Grupo</Text>
            </ListItem>
            {
              this.state.group.students.map(student => <ListStudents key={student._id} student={student} /> )
            }                    
          </List>

          </Content>
      </Container>
    )
  }

}

