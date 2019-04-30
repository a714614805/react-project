const express=require('express');
const bodyParser=require('body-parser');
const user=require('./router/login.js');
const pool=require('./pool.js');

//1.构建web服务器
var app=express();
//监听端口2000
app.listen(2000);
//2.托管静态资源
app.use(express.static('./src'));

//跨域配置
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
  });
  app.use(bodyParser.json());//数据JSON类型
  //使用body-parser中间件
  app.use(bodyParser.urlencoded({
    extended: false
  }));
    // 登录的后台接口
      app.get('/login',(req,res)=>{
        //获取浏览器请求的数据
        var obj=req.query;
        var $uname=obj.uname;
        if(!$uname){//如果用户名为空
          res.send("用户名不能为空");
          return;
        }
        var $upwd=obj.upwd;
        if(!$upwd){
          res.send("密码不能为空");
          return;
        }
        //执行判断是否登录成功——用户名和密码同时正确
        //查询数据，查询的结果中，要有对应的记录
        var sql='SELECT * FROM by_users WHERE users_account=? AND user_password=?';
        pool.query(sql,[$uname,$upwd],(err,result)=>{
          if(err) throw err;
        if(result.length>0){
          res.send(result);
        }else{
          res.send('登录失败，请核对您的账号密码');
        }
        });
      });
      //获取所有的图书信息
      app.get('/index',(req,res)=>{
        const sql = 'SELECT * FROM books';
        pool.query(sql,(err,result)=>{
          if(err) throw err;
          res.send(result);
          return
        })
      })

      //注册的后台接口
      app.post('/register',(req,res)=>{
        const uname = req.body.uname;
        const upwd = req.body.upwd;
        const phoneNumber = req.body.phoneNumber;
        const nickName = req.body.nickName;
        const identity = req.body.identity;   //0为管理员   1为用户
        var sql='SELECT * FROM by_users WHERE users_account=?';
        pool.query(sql,[uname],(err,result)=>{
          if(err) throw err;
          if(result.length>0){
            res.send({code:301,msg:'用户名已被注册'});
            return ;
          }else{
            var sql = 'INSERT INTO by_users VALUES(NULL,?,?,?,?,?)'
            pool.query(sql,[uname,phoneNumber,upwd,nickName,identity],(err,result)=>{
              if(err) throw err;
              if(result.affectedRows>0){
                res.send('注册成功');
              }
            })
          }
        })

        
      })

//使用路由器
//把用户路由器挂载到/user下
app.use('/login',user);