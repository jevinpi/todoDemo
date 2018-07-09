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
  }
  componentWillMount(){
    sqLite.getData().then((res) =>{
      this.setState({
        currentData : res
      });
    });
  }
  render(){
    return (
      <View style={{height: '100%'}}>
        <TaskListView data={this.state.currentData}></TaskListView>
      </View>
    )
  }
}