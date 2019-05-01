import React, { Component } from 'react';
import 'antd/lib/date-picker/style/css';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Button, Modal, Form, Input, Select, message } from 'antd';
import './management.scss';
import Axios from 'axios';

const Option = Select.Option;
class management extends Component {

    state={
        data:[],
        show : false,
    }

    componentDidMount(){
        this.handleGetAll();
    }
    handleGetAll = ()=>{
        Axios.get('/index').then(res=>{
            this.setState({
                data:res.data
            })
        })
    }
    handleDelete = (record)=>{
        const that = this;
        Axios.get(`/delete-books?id=${record.bid}`).then(res=>{
            if(res.data == '删除成功'){
                message.success('删除成功');
                that.handleGetAll();
            }else{
                message.error('删除失败');
            }
        })
    }
    handleCancle = ()=>{
        this.setState({
            show:false
        })
    }
    handleAdd = ()=>{
        this.setState({
            show : true,
        })
    }
    handleOK = ()=>{
        this.props.form.validateFieldsAndScroll((error,value)=>{
            if(error){console.log(error)}else{
                Axios.post('/management',value).then(res=>{
                    if(res.data == '添加成功'){
                        message.success('添加成功');
                        this.handleGetAll();
                        this.setState({show : false})
                    }else{
                        message.error('添加失败')
                    }
                })
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 10 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const columns = [{
            title:'书名',
            dataIndex:'book_name',
            align:'center',
            width:100,
        },{
            title:'作者',
            dataIndex:'book_author',
            align:'center',
            width:100,
        },{
            title:'价格',
            dataIndex:'book_price',
            align:'center',
            width:100,
        },{
            title:'描述',
            dataIndex:"description",
            align:'left',
            width:300,
        },{
            title:'图片地址',
            dataIndex:'url',
            align:'center',
            width:150,
            render : (text,record)=>{
                return(<a href={record.url} target='_blank'>点击查看</a>)
            }
        },{
            title:'操作',
            dataIndex:'operation',
            align:'center',
            width:50,
            render:(text,record)=>{
                return(<div><Popconfirm title="确定要删除此书籍么？" okText="确定" cancelText="取消" onConfirm={this.handleDelete.bind(this,record)}>
                <span style={{cursor:'pointer',color:'#5B00FF'}}>删除</span>
              </Popconfirm>,</div>)
            }
        }]
        return(<div>
            <div style={{fontSize:'33px',color:'black',textShadow:'5px 5px 5px #888',textAlign:'center',fontWeight:'400'}}>后台管理系统</div>
            <div style={{marginTop:"20px",marginLeft:'50px'}}>
                <Button type="danger" onClick={this.handleAdd}>添加书籍</Button>
            </div>
            <Table columns={columns} dataSource={this.state.data} style={{marginTop:'30px'}} rowKey={record => record.bid}></Table>
            <div>
                <Modal title="添加书籍" destroyOnClose visible={this.state.show} onCancel={this.handleCancle} onOk={this.handleOK}>
                    <Form {...formItemLayout}>
                        <Form.Item label="书名">
                            {getFieldDecorator('bname', {
                            rules: [{ required: true, message: 'Please input book name' }],
                            })(
                            <Input placeholder="书名" />
                            )}
                        </Form.Item>
                        <Form.Item label="作者">
                            {getFieldDecorator('author', {
                            rules: [{ required: true, message: "Please input book's author" }],
                            })(
                            <Input placeholder="作者" />
                            )}
                        </Form.Item>
                        <Form.Item label="价格">
                            {getFieldDecorator('price', {
                            rules: [{ required: true, message: "Please input book's price" }],
                            })(
                            <Input placeholder="价格" />
                            )}
                        </Form.Item>
                        <Form.Item label="描述">
                            {getFieldDecorator('description', {
                            rules: [{ required: true, message: "Please input book description" }],
                            })(
                            <Input placeholder="描述" />
                            )}
                        </Form.Item>
                        <Form.Item label="图片地址">
                            {getFieldDecorator('url', {
                            rules: [{ required: true, message: 'Please input book picture url' }],
                            })(
                            <Input placeholder="图片地址" />
                            )}
                        </Form.Item>
                        <Form.Item label="图书类别">
                            {getFieldDecorator('kind', {
                            rules: [{ required: true, message: 'Please select the kind of the books' }],
                            })(
                            <Select>
                                <Option value='1'>文学</Option>
                                <Option value='2'>社科</Option>
                                <Option value='3'>少儿</Option>
                                <Option value='4'>艺术</Option>
                                <Option value='5'>生活</Option>
                            </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>)
    }
}
const Management = Form.create()(management);
export default Management