import React, { Component } from 'react';
import 'antd/lib/date-picker/style/css';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
  Form, Icon, Input, Button, Checkbox,message
} from 'antd';
import './login.scss';
class LoginForm extends Component {
  state={
    userData : [],
  }

  handlePushRegister = ()=>{
    this.props.history.push('/register');
  }
  handleSubmit =()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);   //表单里面的数据，json形式..
      }
      axios.get(`/login?uname=${values.uname}&upwd=${values.upwd}`).then(res=>{
        console.log(res)
        if(res.data[0].user_password  && res.data[0].user_identity == 1)
        this.props.history.push(`/index?id=${res.data[0].tid}`)
        else if(res.data[0].user_identity == 0){
          this.props.history.push(`/management`)
        }else{
          message.error(res.data);
        }
      })
    });
  } 
  render() {
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 3,
        },
      },
    };
    return (
      <div className="body">
        <div className='loginBox'>
          <div className='form'>
            <Form {...formItemLayout}>
              <Form.Item label="用户名">
                {getFieldDecorator('uname', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('upwd', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住我</Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" style={{width:'260px',marginLeft:'60px'}} onClick={this.handleSubmit}>
                    登录
                </Button>
              </Form.Item>
            </Form>
            <div style={{marginTop:'20px',textAlign:'center',cursor:'pointer',color:'#1890ff'}}><span onClick={this.handlePushRegister}>立即注册</span></div>
          </div>
        </div>
      </div>
    );
  }
}
const Loginform = Form.create()(LoginForm);
export default Loginform;