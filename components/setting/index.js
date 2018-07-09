import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions 
} from 'react-native';
import commonStyle from './../../config/styles';
import NavigationService from './../../config/NavigationService';


var {width} = Dimensions.get('window');
export default class SettingView extends Component{
  constructor(props) {
    super(props);
  
    this.state = {};
    this.jumpLogin = this.jumpLogin.bind(this);
  }
  jumpLogin(){
    storage.save({
      key: 'loginState',
      data: {
        username: '',
        password: ''
      }
    })
    NavigationService.navigate('Login');
  }
  render(){
    return (
      <View style={commonStyle.container}>
        <View style={styles.person}>
          <Image source={require('./../../assets/man.png')} style={styles.person_img} />
          <Text style={styles.personName}>{userinfo.userData.username}</Text>
          <Text style={styles.personName}>jianyun.pi@geteck.com</Text>
        </View>
        <View>
          <View style={styles.personOperateBox}>
            <Text style={styles.operateName}>消息通知</Text>
            <Text style={styles.operateArrow}>></Text>
          </View>
          <View style={styles.personOperateBox}>
            <Text style={styles.operateName}>修改资料</Text>
            <Text style={styles.operateArrow}>></Text>
          </View>
        </View>
        <TouchableHighlight style={styles.subBtn} activeOpacity={1} underlayColor="#1296db" onPress={this.jumpLogin}>
          <Text style={styles.subBtnText}>退出登陆</Text>
        </TouchableHighlight >
      </View>
    )
  }
}

const styles = StyleSheet.create({
  person: {
    height: 260,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  person_img: {
    width: 80, 
    height: 80,
  },
  personName: {
    lineHeight: 30,
    fontSize: 16
  },
  personOperateBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 20
  },
  operateName: {
    fontSize: 18,
    lineHeight: 50,
    alignItems: 'flex-end'
  },
  operateArrow: {
    fontSize: 18,
    lineHeight: 50,
    textAlign: 'center'
  },
  btn: {
    textAlign: 'center',
    lineHeight: 34,
    fontSize: 18,
    color: '#1296db'
  },
  subBtn:{
    height: 50,
    marginTop: 40,
    backgroundColor: '#1296db'
  },
  subBtnText:{
    color: '#fff',
    fontSize: 22,
    lineHeight: 50,
    textAlign: 'center'    
  }
})