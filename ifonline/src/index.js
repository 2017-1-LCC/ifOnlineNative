import React from "react";
import {AppRegistry} from 'react-native';
import Profile from "./student/Profile.js";
import Grupos from './studygroup/Grupos.js';
import CreateUser from './student/FormCreate.js';
import OneGroup from './studygroup/OneGroup.js';
import NewGroup from './studygroup/NewGroup.js';
import Login from './login/Login.js';
import SideBar from "./sidebar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const Router = DrawerNavigator(
  {
    Login: { screen: Login },
    Profile: { screen: Profile },
    Grupos: { screen: Grupos },
    OneGroup: { screen: OneGroup },
    CreateUser: { screen: CreateUser },
    NewGroup: { screen: NewGroup }
  },
  {
    contentComponent: props => <SideBar {...props}/>
  }
);

export default class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router screenProps={this.props}/>
    )
  }
}
