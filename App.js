/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavigationService from './config/NavigationService';
/**
 * 全局存储对象
*/
import storage from './config/storage.js';
import loginState from './config/login_state';
/**
 * 主页面
 */
import  TabNavigatorView  from './components/tab_navigator/';
/**
 * 主页面
 */
import  LoginView  from './components/login/';
import  Splash  from './components/login/';
import  AddView  from './components/tasks/addTask.js';
import SplashScreen from 'rn-splash-screen';
import SQLite from './config/SQLite';
global.sqLite = new SQLite();
global.db;
//开启数据库
db = sqLite.open();
class StartView extends Component{
  componentDidMount(){
    this.timer = setTimeout(() => {
      if (userinfo.loginState) {
        this.props.navigation.navigate('Home')
      }else{
        this.props.navigation.navigate('Login')
      }
      SplashScreen.hide();
    }, 3000);
  }
  componentWillMount(){
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render(){
    return (<View></View>)
  }
}
const RootStack = createStackNavigator(
  {
    Start: {
      screen: StartView
    },
    Login: {
      screen: LoginView
    },
    Home: {
      screen: TabNavigatorView,
      navigationOptions:{
        headerTruncatedBackTitle: null
      }
    },
    AddNew: {
      screen: AddView
    },
    Welcome: {
      screen: Splash
    }
  },{
    initialRouteName: 'Start'
  }
);

export default class App extends Component {
  componentWillMount(){
  }
  constructor(props) {
    super(props);  
    this.state = {};
  }
  render() {
      return <RootStack ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef); }}/>;
  }
}