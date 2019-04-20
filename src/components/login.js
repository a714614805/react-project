import React, { Component } from 'react';
import 'antd/lib/date-picker/style/css';
import 'antd/dist/antd.css';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import './login.scss';
class LoginForm extends Component {

  handlePushRegister = ()=>{
    this.props.history.push('/register');
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
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="用户名">
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
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
            </Form>
            <Button type="primary" htmlType="submit" size="large" style={{width:'250px',marginLeft:'10px'}}>
                  登录
            </Button>
            <div style={{marginTop:'20px',}}><a  onClick={this.handlePushRegister}>立即注册</a></div>
          </div>
        </div>
      </div>
    );
  }
}
const Loginform = Form.create()(LoginForm);
export default Loginform;