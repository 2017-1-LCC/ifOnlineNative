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
      group:this.props.navigation.state.params.group,
      user:this.props.navigation.state.params.user
    }
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
              <Title>Grupo</Title>
          </Body>
          <Right />
          </Header>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>Disciplina: { this.state.group.discipline } </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Turma: { this.state.group.academicClass }</Text>

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

