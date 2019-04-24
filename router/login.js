const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//login
router.get('/login',(req,res)=>{
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



//register
router.post('/register',(req,res)=>{
  //浏览器发送的数据
  //console.log(req.body);
  var obj=req.body;
  //验证表单提交的内容是否为空
  //验证用户名为空
  var $uname=obj.uname;
  if($uname==''){
    res.send({code:401,msg:'uname required'});
	return;//终止函数中的代码继续执行
  }
  //验证密码为空
  var $upwd=obj.upwd;
  if($upwd==''){
    res.send({code:402,msg:'upwd required'});
    return;
  }
  //以上验证都通过了，执行插入数据库操作
  var sql='INSERT INTO zp_user VALUES(NULL,?,?)';
  pool.query(sql,[$uname,$upwd],(err,result)=>{
    if(err) throw err;
    //如何判断插入成功————affectedRows
	if(result.affectedRows>0){
	  res.send({code:200,msg:'reg success'});
	}else{
	  res.send({code:301,msg:'reg error'})
	}
  }); 
});


//selectUname
router.get("/selectUname",(req,res)=>{
  var $uname=req.query.uname;
  if(!$uname){
    res.send("用户名不能为空");
	return;
  }
  var sql="select * from zp_user where uname=?";
  pool.query(sql,[$uname],(err,result)=>{
    if(err) throw err;
	if(result.length>0){
	  res.send("1");
	  console.log(7548397)//用户名已被注册
	}else{
	  res.send("0")//用户名可以使用
	}
  });
});


module.exports=router;