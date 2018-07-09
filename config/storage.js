import {
  AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: function(){
  	console.warn('没有找到啊');
  }
});
global.storage = storage;
