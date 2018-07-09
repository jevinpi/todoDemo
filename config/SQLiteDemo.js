import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
} from 'react-native';
import SQLite from './../config/SQLite';
var sqLite = new SQLite();
var db;
export default class SQLiteDemo extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    compennetDidUnmount(){
      //关闭数据库
      sqLite.close();
    }
    componentWillMount(){
        //开启数据库
        if(!db){
            db = sqLite.open();
        }       

        //模拟数据
        var taskData = [];
        var task = {};
        task.create_time = "2018-07-05";
        task.desc = "测试是否保存";
        task.user_id = 1;
        task.complete = 0;
        taskData.push(task);
        //插入数据
        // sqLite.insertData(taskData);
        //查询
        db.transaction((tx)=>{
            tx.executeSql("select * from UNCOMING where create_time='2018-07-05'", [],(tx,results)=>{
                var len = results.rows.length;
                for(let i=0; i<len; i++){
                    var u = results.rows.item(i);
                    // console.warn(u)
                }
            });
        },(error)=>{
            console.log(error);
        });
    }
    render(){
        return (
            <View>
            </View>
        );
    }
}