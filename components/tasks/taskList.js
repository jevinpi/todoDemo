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
  RefreshControl
} from 'react-native';
import {LocaleConfig, Agenda, Calendar } from 'react-native-calendars';
import { SwipeListView } from 'react-native-swipe-list-view';
import NavigationService from './../../config/NavigationService';

// 单个事项
class TodoCard extends Component{
  render(){
    let data = this.props.data;
    let isCompleted = this.props.isCompleted;
    return (
      <View style={styles.todoCard}>
        <CheckBox style={styles.todoInfoCheck} value={isCompleted ? true : false} key={data.id}></CheckBox>
        <Text style={styles.todoInfoDetail}>{data.desc}</Text>
      </View>
    )
  }
}
// 事项列表
class TodoCardList extends Component{
  constructor(props) {
    super(props);  
    this.state = {
      data: this.props.data
    };
  }
  componentWillMount(){
  }
  deleteRow(val){
    let id = val.item.id;
    let index = val.index;
    sqLite.deleteTask(id).then(() =>{
      sqLite.getData(this.props.date).then((res) => {
        this.props.carryOut(res)
      })
    });
  }
  doneRow(val){
    let id = val.item.id;
    let status = val.item.complete ? 0 : 1;
    sqLite.endTask(id, status).then(() =>{
      sqLite.getData(this.props.date).then((res) => {
        this.props.carryOut(res)
      })
    });
  }
  showDetail(val){
    let id = val.item.id;
    let desc = val.item.desc;
    let date = val.item.create_time;
    NavigationService.navigate('AddNew',{id, desc, date, is_edit: true});
  }
  render(){
    let data = this.props.data;
    let isCompleted = this.props.isCompleted;
    return (
      <View>
          {
            data.length > 0 ? (<View>
              {this.props.children}            
              <SwipeListView
                useFlatList
                data={data}
                keyExtractor={(data, index) => index.toString()}
                renderItem={ (data, rowMap) => (
                    <Text numberOfLines={1} style={[styles.rowFront,styles.todoInfoDetail]} onPress={_ => this.showDetail(data)}>{data.item.desc}</Text>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text style={[styles.rowBackText, styles.rowBackTextLeft]} onPress={ _ => this.doneRow(data)}>{data.item.complete ? '未完成' : '完成'}</Text>
                        <Text style={styles.rowBackText} onPress={ _ => this.deleteRow(data)}>删除</Text>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
              />
            </View>) : <Text></Text>
          }        
      </View>
    )
  }
}
export default class TaskListView extends Component{
  constructor(props) {
    super(props);  
    this.state = {
      currentData: this.props.data,
      isRefreshing: false,
      date: this.props.date
    };
    this.carryOut = this.carryOut.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }
  componentWillReceiveProps(next){
    this.setState({
      currentData: next.data 
    })
  }
  componentWillMount(){
  }
  carryOut(res){
    this.setState({
      currentData: res
    });
    this.props.dataChange(res);
  }
  _onRefresh(){
    sqLite.getData(this.state.date).then((res) => {
      this.setState({
        currentData: res
      });
      this.props.dataChange(res);
    })
  }
  render(){
    return (
      <ScrollView 
        style={{overflow: 'scroll'}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#fff"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#1296db"
          />
        }
      >
        {
          (this.state.currentData.uncompleted.length == 0 && this.state.currentData.completed.length == 0) ? (
            <Text style={styles.emptyShow}>暂无任务</Text>
          ) : (
            <ScrollView>
              <TodoCardList carryOut={this.carryOut} data={this.state.currentData.uncompleted} isCompleted={false} date={this.props.date}>
                <Text style={styles.todoCardTitle}>待完成</Text>
              </TodoCardList>
              <TodoCardList carryOut={this.carryOut} data={this.state.currentData.completed} isCompleted={true} date={this.props.date}>
                <Text style={styles.todoCardTitle}>已完成</Text>
              </TodoCardList>
            </ScrollView>
          )
        }
      </ScrollView>
    )
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  todoCard: {
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  todoInfoCheck: {
    height: 40,
    borderWidth: 1,
    borderColor: 'red'
  },
  todoInfoDetail: {
    lineHeight: 50,
    paddingLeft: 5,
    height: 50,
    fontSize: 18
  },
  todoCardTitle: {
    height: 40,
    lineHeight: 40,
    color: '#1296db',
    fontSize: 18,
    paddingLeft: 5
  },
  todoCardList:{
    minHeight: 0
  },
  addBtn: {
    position: 'absolute',
    right: 10,
    bottom: 30,
    width: 40,
    zIndex: 2
  },
  emptyShow: {
    height: 30,
    fontSize: 20,
    marginTop: 40,
    color: '#1296db',
    textAlign: 'center'
  },
  rowFront: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomColor: '#1296db',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#1296db',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  rowBackText: {
    color: '#fff',
    fontSize: 18,
  }
})