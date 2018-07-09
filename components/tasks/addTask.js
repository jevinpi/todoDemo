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
import SQLite from './../../config/SQLite';
let sqLite = new SQLite();
let db, is_edit;
export default class AddView extends Component{
  static navigationOptions = {
    title: '待办详情',
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
    const { navigation } = this.props;
    const id = navigation.getParam('id', null);
    const desc = navigation.getParam('desc', '');
    const date = navigation.getParam('date', '');
    is_edit = navigation.getParam('is_edit', false);
    this.state = {
      desc: desc,
      date: date,
      isValid: true,
      inValidInfo: ''
    };
    this._save = this._save.bind(this);
    this.removeFocus = this.removeFocus.bind(this);
  }
  compennetDidUnmount(){
    //关闭数据库
    sqLite.close();
  }
  componentWillMount(){
    if(!db){
      db = sqLite.open();
    } 
  }
  _save(){
    let desc = this.state.desc;
    if (desc) {
      let taskData = [];
      let task = {};
      task.create_time = this.state.date;
      task.desc = this.state.desc;
      task.user_id = 1;
      task.complete = 0;
      taskData.push(task);
      if (is_edit) {
        sqLite.updateTask()
      }else{
        //插入数据
        sqLite.insertData(taskData,() => {
          this.props.navigation.navigate('Home');
        });        
      }
      
    }else{
      this.setState({
        isValid: false,
        inValidInfo: '请输入待办事项'
      });
      this.removeFocus();
    }
  }
  removeFocus(){
    this.refs.input1.blur();
  }
  render(){
    return (
      <View style={commonStyle.container}>
        <TouchableWithoutFeedback 
          style={{backgroundColor: 'red',height: '100%'}}
          onPress={this.removeFocus}
        >
          <View style={{height: '100%'}}>
            <Text>日期： {this.state.date}</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(desc) => this.setState({desc})}
              value={this.state.desc}
              underlineColorAndroid="transparent"
              multiline={true}
              keyboardType="default"
              placeholder="请输入待办事项"
              placeholderTextColor='#1296db'
              ref="input1"
            />
            <Text style={[styles.warnInfo,{height: this.state.isValid ? 0 : 30}]}>{this.state.inValidInfo}</Text>
            <TouchableHighlight style={styles.subBtn} activeOpacity={1} underlayColor="#1296db" onPress={this._save}>
              <Text style={styles.subBtnText}>保存</Text>
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
    height: 300,
    width: '100%',
    padding: 0,
    marginBottom: 20,
    lineHeight: 24,
    backgroundColor: '#f5f5f5',
    paddingLeft: 5,
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
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