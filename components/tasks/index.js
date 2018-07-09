import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TaskListView from './taskList.js';

export default class TasksView extends Component{  
  constructor(props) {
    super(props);
    this.state = {
      currentData: {
        "completed":[],
        "uncompleted":[]
      }
    };
    this.changeData = this.changeData.bind(this);
  }
  componentWillMount(){
    sqLite.getData().then((res) =>{
      this.setState({
        currentData : res
      });
    });
  }
  changeData(data){
    this.setState({
      currentData : data
    });   
  }
  render(){
    return (
      <View style={{height: '100%'}}>
        <TaskListView dataChange={this.changeData} data={this.state.currentData}></TaskListView>
      </View>
    )
  }
}