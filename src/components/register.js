import React, { Component } from 'react';
import 'antd/lib/date-picker/style/css';
import 'antd/dist/antd.css';
import axios from 'axios';
import './login.scss';
import {
  Form, Icon, Input, Button, Select, message
} from 'antd';


const Option = Select.Option;
class Register extends Component {

  handlePushLogin = ()=>{
    console.log(this.props);
    this.props.history.push('/login')
  }
  handleSubmit = ()=>{
    const that = this;
    that.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err)console.log('Absolutely Right')
      //验证手机号码是否全为数字
      if(/^[0-9]+$/.test(values.phoneNumber)){
        //验证手机号码是否为11位
        if(values.phoneNumber.length == 11 ){
          const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if(reg.test(values.phoneNumber)){
            //验证两次密码是否一致
            if(values.confirm == values.upwd){
              //验证密码长度是否为7位以上
              if(values.upwd.length > 7){
                console.log(values);
                axios.post(`/register`,values).then(res=>{
                  if(res.data.code == 301){
                    message.error(res.data.msg)
                  }
                  if(res.data == '注册成功'){
                    message.success('注册成功');
                    that.props.history.push('/login');
                  }
                })
              }else{
                message.error('密码长度必须大于7位')
              }
            }else{
              message.error('两次密码输入不一致')
            }
          }else{
            message.error('手机号格式不正确');
          }
        }else{
          message.error('手机号必须为11位数字')
        }
      }else{
        message.error('请输入正确的手机号')
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

      return (<div className='body'>
                <div className='loginBox'>
                  <div className='registerForm'>
                    <Form {...formItemLayout}>
                      <Form.Item label="用户名">
                        {getFieldDecorator('uname', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                      </Form.Item>
                      <Form.Item label="手机号">
                        {getFieldDecorator('phoneNumber', {
                          rules: [{ required: true, message: 'Please input your Phone Number' }],
                        })(
                          <Input type="text" placeholder="请输入您的手机号" />
                        )}
                      </Form.Item>
                      <Form.Item label="昵称">
                        {getFieldDecorator('nickName', {
                          rules: [{ required: true, message: 'Please input your nickName' }],
                        })(
                          <Input type="text" placeholder="请输入您的昵称" />
                        )}
                      </Form.Item>
                      <Form.Item label="密码">
                        {getFieldDecorator('upwd', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                      </Form.Item>
                      <Form.Item label="确认密码">
                        {getFieldDecorator('confirm', {
                          rules: [{ required: true, message: 'Please comfirm your Password' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                        )}
                      </Form.Item>
                      <Form.Item label="身份选择">
                        {getFieldDecorator('identity', {
                          rules: [{ required: true, message: 'Please choose your identity' }],
                        })(
                          <Select>
                            <Option value='1'>学生</Option>
                            <Option value='0'>管理员</Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" style={{width:'250px',marginLeft:'67px'}} onClick={this.handleSubmit}>
                            立即注册
                        </Button>
                      </Form.Item>
                    </Form>
                    <div style={{marginTop:'20px',textAlign:'center',cursor:'pointer',color:'#1890ff'}}><span onClick={this.handlePushLogin}>去登录</span></div>
                  </div>
                </div>
      </div>)
  }
}
const Registerform = Form.create()(Register);
export default Registerform;