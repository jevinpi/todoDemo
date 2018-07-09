import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  CheckBox,
  FlatList,
  ScrollView,
  TouchableHighlight 
} from 'react-native';
import {LocaleConfig, Agenda, Calendar } from 'react-native-calendars';
import { SwipeListView } from 'react-native-swipe-list-view';
import NavigationService from './../../config/NavigationService';

import TaskListView  from './../tasks/taskList';
let currentDay, currentData;
const mockData = require('./../../mock/data1.json');
// 切换月份箭头
class Arrow extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    let direction = this.props.d;
    return (
      <View>
        <Text style={{fontSize: 24}}>{ direction === 'left' ? '<' : '>' }</Text>
      </View>
    )    
  }
}
export default class CalendarView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDay:  this.timeToString(new Date()),
      currentData: {
        "completed":[],
        "uncompleted":[]
      }
    };
    this.addNewTask = this.addNewTask.bind(this);
    this._selectDay = this._selectDay.bind(this);
    this.dataChange = this.dataChange.bind(this);
  }
  componentWillMount(){
    sqLite.getData(this.state.currentDay).then((res) =>{
      this.setState({
        currentData : res
      });
    });
  }
  _selectDay(day){
    let _date = this.timeToString(day.timestamp);
    sqLite.getData(_date).then((res) =>{
      this.setState({
        currentData : res,
        currentDay : _date
      });
    });
  }
  dataChange(data){
    this.setState({
      currentData: data
    })
  }
  addNewTask(){
    NavigationService.navigate('AddNew',{date: this.state.currentDay});
  }
  render(){
    return (
      <View style={{height: '100%'}}>
        <Calendar
          current={this.state.currentDay}
          markedDates={{[this.state.currentDay]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}          
          theme={{todayTextColor: 'red',selectedDayTextColor: '#fff'}}
          selectedDayBackgroundColor={'green'}
          todayTextColor='#ffffff'
          minDate={'2000-07-01'}
          maxDate={'2200-07-07'}
          onDayPress={(day) => {this._selectDay(day)}}
          onDayLongPress={(day) => {console.warn('selected day', day)}}
          monthFormat={'yyyy-MM'}
          onMonthChange={(month) => {console.log('month changed', month)}}
          hideArrows={false}
          renderArrow={(direction) => (<Arrow d={direction} />)}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        />
        <TaskListView dataChange={this.dataChange} data={this.state.currentData} date={this.state.currentDay} />
        <TouchableHighlight style={styles.addBtn} onPress={this.addNewTask}>
          <Image source={require('./../../assets/add.png')}/>
        </TouchableHighlight>
      </View>
    )
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    width: 40,
    zIndex: 2
  }
})