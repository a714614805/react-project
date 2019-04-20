const express=require('express');
const bodyParser=require('body-parser');
const user=require('./router/user.js');


//1.构建web服务器
var app=express();
app.listen(2000);
//2.托管静态资源
app.use(express.static('./src'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({
  extended: false
}));
//使用路由器
//把用户路由器挂载到/user下
app.use('/user',user);