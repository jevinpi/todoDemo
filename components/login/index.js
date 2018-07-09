import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import commonStyle from './../../config/styles';

export default class LoginView extends Component{
  static navigationOptions = {
    title: '注册登陆',
    header: null,
    headerStyle: {
      backgroundColor: '#1296db',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerBackTitle: null,
    headerTruncatedBackTitle: null
  };
  constructor(props) {
    super(props);
  
    this.state = {
      password: '',
      username: '',
      isValid: true,
      inValidInfo: ''
    };
    this._login = this._login.bind(this);
    this.removeFocus = this.removeFocus.bind(this);
  }
  componentWillMount(){
  }
  _login(){
    let username = this.state.username;
    let password = this.state.password;
    if (username && password) {
      storage.save({
        key: 'loginState',
        data: {
          username,
          password
        }
      })
      this.props.navigation.navigate('Home');
    }else{
      this.setState({
        isValid: false,
        inValidInfo: '请输入用户名和密码'
      });
      this.removeFocus();
    }
  }
  removeFocus(){
    this.refs.input1.blur();
    this.refs.input2.blur();
  }
  render(){
    return (
      <View style={commonStyle.container}>
        <TouchableWithoutFeedback 
          style={{backgroundColor: 'red',height: '100%'}}
          onPress={this.removeFocus}
        >
          <View style={{height: '100%'}}>
            <View style={styles.person}>
              <Image source={require('./../../assets/logo.png')} style={styles.person_img} />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              underlineColorAndroid="transparent"
              keyboardType="default"
              placeholder="请输入账户名称"
              placeholderTextColor='#1296db'
              ref="input1"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              underlineColorAndroid="transparent"
              keyboardType="default"
              secureTextEntry={true}
              placeholder="请输入密码"
              placeholderTextColor='#1296db'
              ref="input2"
            />
            <Text style={[styles.warnInfo,{height: this.state.isValid ? 0 : 30}]}>{this.state.inValidInfo}</Text>
            <TouchableHighlight style={styles.subBtn} activeOpacity={1} underlayColor="#1296db" onPress={this._login}>
              <Text style={styles.subBtnText}>登陆</Text>
            </TouchableHighlight >
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  person: {
    height: 300,
    borderWidth: 0,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    padding: 0,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    paddingLeft: 5
    // borderWidth: 1,
    // borderColor: '#1296db'
  },
  warnInfo: {
    color: 'red',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 10
  },
  subBtn:{
    height: 50,
    backgroundColor: '#1296db'
  },
  subBtnText:{
    color: '#fff',
    fontSize: 24,
    lineHeight: 50,
    textAlign: 'center'    
  }
})