import React from 'react';
import {AsyncStorage} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Content from './src/index';
import Login from './src/login/Login';

const STORAGE_KEY = 'TOKEN';
const STORAGE_USER = 'ID_USER';
const STORAGE_TYPE_USER = "TYPE_USER";


export default class App extends React.Component {

  constructor() {
    super();
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
/*    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.removeItem(STORAGE_USER);
    await AsyncStorage.removeItem(STORAGE_TYPE_USER);*/
  };

/*  async componentDidMount() {
    const token = await AsyncStorage.getItem(STORAGE_KEY);
    const idUser = await AsyncStorage.getItem(STORAGE_USER);
    const typeUser = await AsyncStorage.getItem(STORAGE_TYPE_USER)  
    if(token) {
      this.setState({ isAuth: true, token:token , idUser:idUser, typeUser:typeUser});
    } else {
      this.setState({ isAuth: false });
    }
  }*/

  render() {
      return <Content/>
  }
}
