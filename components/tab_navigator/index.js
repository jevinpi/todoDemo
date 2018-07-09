/**
 * 底部Tab切换
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import TasksView from './../tasks/';
import TaskListView from './../tasks/taskList.js';
import CalendarView from './../calendar/';
import SettingView from './../setting/';
let titleName;
export default class TabNavigatorView extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    titleName = navigation.getParam('otherParam', '全部待办')
    return {
      title: titleName,
      header: null,
	    headerStyle: {
	      backgroundColor: '#1296db',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	      alignSelf:'center'
	    },
	    headerMode: 'screen',
      headerTruncatedBackTitle: null
    };
  };
  constructor(props) {
    super(props);  
    this.state = {selectedTab: 'calendar'};
  }
  render() {
    return (
      <View style={{height: '100%'}}>
        <Text style={styles.titleName}>{titleName}</Text>
        <TabNavigator style={{paddingBottom: 0}} tabBarStyle={{height: 60}}>
          <TabNavigator.Item
            titleStyle={{fontSize: 14}} 
            title="全部待办"
            selected={this.state.selectedTab === 'index'}
            renderIcon={() => <Image source={require('./../../assets/icon-upcoming1.png')} />} 
            renderSelectedIcon={() => <Image source={require('./../../assets/icon-upcoming2.png')} />}
            onPress={() => {
            	this.props.navigation.setParams({otherParam: '全部待办'});
            	this.setState({ selectedTab: 'index' })
            }}>
            <TasksView />
          </TabNavigator.Item>
          <TabNavigator.Item
            titleStyle={{fontSize: 14}}
            title="日历"
            selected={this.state.selectedTab === 'calendar'}
            renderIcon={() => <Image source={require('./../../assets/icon-calendar1.png')} />}
            renderSelectedIcon={() => <Image source={require('./../../assets/icon-calendar2.png')} />}
            onPress={() => {
            	this.props.navigation.setParams({otherParam: '日历'});
            	this.setState({ selectedTab: 'calendar' });
            }}>
            <CalendarView />
          </TabNavigator.Item>
          <TabNavigator.Item 
            titleStyle={{fontSize: 14}} 
            title="我的"
            selected={this.state.selectedTab === 'set'}  
            renderIcon={() => <Image source={require('./../../assets/icon-set1.png')} />} 
            renderSelectedIcon={() => <Image source={require('./../../assets/icon-set2.png')} />}
            onPress={() => {
            	this.props.navigation.setParams({otherParam: '我的'});
            	this.setState({ selectedTab: 'set' });
          	}}>
            <SettingView />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleName: {
    height: 55,
    backgroundColor: '#1296db',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 55,
    fontSize: 20,
    textAlign: 'center',
    borderTopWidth: 1
  }
});