//SQLite.js
import React, { Component } from 'react';
import {
    ToastAndroid,
} from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "test.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "MySQLite";
var database_size = -1;
var db;

export default class SQLite extends Component {
    componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
    }
    componentWillMount(){
    	console.warn('open database')
    }
    open(){
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                this._successCB('open');
            },
            (err)=>{
                this._errorCB('open',err);
            });
        return db;
    }
    createTable(){
        if (!db) {
            this.open();
        }
        //创建用户表
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS UNCOMING(' +
                'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
                'create_time DATE,'+
                'desc VARCHAR,' +
                'user_id INTEGER,' +
                'edit_time DATE,' +
                'complete BOOLEAN default 0)'
                , [], ()=> {
                    this._successCB('executeSql');
                }, (err)=> {
                    this._errorCB('executeSql', err);
                });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, ()=> {
            this._successCB('transaction');
        })
    }
    deleteData(){
        if (!db) {
            this.open();
        }
        db.transaction((tx)=>{
            tx.executeSql('delete from UNCOMING',[],()=>{

            });
        });
    }
    dropTable(){
        db.transaction((tx)=>{
            tx.executeSql('drop table UNCOMING',[],()=>{

            });
        },(err)=>{
            this._errorCB('transaction', err);
        },()=>{
            this._successCB('transaction');
        });
    }
    insertData(data, fn){
      let len = data.length;
      if (!db) {
          this.open();
      }
      this.createTable();
      db.transaction((tx)=>{
          for(let i=0; i<len; i++){
              var _data = data[i];
              let create_time= _data.create_time;
              let desc = _data.desc;
              let user_id = _data.user_id;
              let complete = _data.complete;
              let sql = "INSERT INTO UNCOMING(create_time, desc, user_id, complete)"+
                  "values(?,?,?,?)";
              tx.executeSql(sql,[create_time, desc, user_id, complete],()=>{
                  },(err)=>{
                      console.log(err);
                  }
              );
          }
      },(error)=>{
          this._errorCB('transaction', error);
      },()=>{
          fn();
      });
    }
    updateData(id, status, fn){
    	/**
    	 * @desc 更新id的状态是否完成
    	 * @param {int} id 更新的id
    	 * @param {int} status 更新的状态，1-已完成，0-未完成
    	 * @param {function} fn 更新完成回调函数
    	 */
			if (!db) {
          this.open();
      }
      this.createTable();
      db.transaction((tx)=>{
        let sql = "update UNCOMING complete=? where id=?";
        tx.executeSql(sql,[status, id],()=>{
            },(err)=>{
                console.log(err);
            }
        );
      },(error)=>{
          this._errorCB('transaction', error);
      },()=>{
          fn();
      });
    }
	  getData(date){
	  	/**
    	 * @desc 查找当前用户的数据
    	 * @param {int} date 日期
    	 * @return {Object} 返回所有数据
    	 */
			let sql;
			if (date) {
				sql = "select * from UNCOMING where create_time='" + date + "' and user_id=1";
			}else {
				sql = "select * from UNCOMING where complete=0 and user_id=1";
			};
    	return new Promise((resolve, reject) => {
		    db.transaction((tx)=>{
		      tx.executeSql(sql, [],(tx,results)=>{
		          let len = results.rows.length;
		          let data = {
		            "completed": [],
		            "uncompleted": []
		          };
		          for(let i=0; i<len; i++){
		            let u = results.rows.item(i);
		            if (u.complete == 1) {
		              data.completed.push(u);
		            }else{
		              data.uncompleted.push(u);
		            };
		          };
		          resolve(data);
		      });
		    },(error)=>{
		        console.warn(error);
		    });    		
    	})
	  }
	  endTask(id, type){
			let sql;
			sql = "update UNCOMING set complete=? where id=?";
    	return new Promise((resolve, reject) => {
		    db.transaction((tx)=>{
		      tx.executeSql(sql, [type, id],(tx,results)=>{
		          resolve(results);
		      });
		    },(error)=>{
		        console.warn(error);
		    });    		
    	})
	  }
    deleteTask(id, type){
      let sql;
      sql = "DELETE FROM  UNCOMING where id=?";
      return new Promise((resolve, reject) => {
        db.transaction((tx)=>{
          tx.executeSql(sql, [id],(tx,results)=>{
              resolve(results);
          });
        },(error)=>{
            console.warn(error);
        });       
      })
    }
	  updateTask(id, desc){
	  	let sql;
			sql = "update UNCOMING set complete=0,desc="+desc+" where id=" + id;
    	return new Promise((resolve, reject) => {
		    db.transaction((tx)=>{
		      tx.executeSql(sql, [],(tx,results)=>{
		          resolve(results);
		      });
		    },(error)=>{
		        console.warn(error);
		    });    		
    	})
	  }
    close(){
        if(db){
            this._successCB('close');
            db.close();
        }else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }
    _successCB(name){
        // console.warn("SQLiteStorage "+name+" success");
    }
    _errorCB(name, err){
        console.warn("SQLiteStorage "+name);
        console.warn(err);
    }
    render(){
    		console.warn(userinfo.userData)
        return null;
    }
}