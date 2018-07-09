global.userinfo = {
	loginState: false,
	userData: ''
}
storage.load({
  key: 'loginState',
  autoSync: true,
}).then(ret => {
	if (ret.username) {
	  global.userinfo.loginState = true;
	  global.userinfo.userData = ret;		
	}
}).catch(err => {
  global.userinfo.loginState = false;
  global.userinfo.userData = '';
});