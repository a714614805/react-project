import React, { Component } from 'react';
import 'antd/lib/date-picker/style/css';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Button, Modal, Form } from 'antd';
import './management.scss';
import Axios from 'axios';


class Management extends Component {

    state={
        data:[],
        show : false,
    }

    componentDidMount(){
        Axios.get('/index').then(res=>{
            this.setState({
                data:res.data
            })
        })
    }
    handleDelete = (record)=>{
        console.log(record.bid);
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
    render(){
        let { form } = this.props;
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
            <Table columns={columns} dataSource={this.state.data} style={{marginTop:'30px'}}></Table>
            <div>
                <Modal title="添加书籍" destroyOnClose visible={this.state.show} onCancel={this.handleCancle}>
                    <Form>
                        <Form.Item label="书名"></Form.Item>
                        <Form.Item label="作者"></Form.Item>
                        <Form.Item label="价格"></Form.Item>
                        <Form.Item label="描述"></Form.Item>
                        <Form.Item label="图片地址"></Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>)
    }
}

export default Management