import React, { Component } from 'react';
import 'antd/lib/date-picker/style/css';
import 'antd/dist/antd.css';
import axios from 'axios';
import './main.scss';


class Index extends Component {
    state={
        books :[],
    }

    componentWillMount(){
        console.log(this.props.location.search.split('=')[1])   //取到地址栏传参的用户id
        const id = this.props.location.search.split('=')[1];
        axios.get(`/index?id=${id}`).then(res=>{
            console.log(res);
            this.setState({
                books : res.data
            })
        })
    }
    render(){
        return(<div>
            this is index Page {this.state.books.map((item)=>{
                return <div key={item.bid}><img src={item.url} alt='无法显示图片'></img></div>
            })}
        </div>)
    }
}

export default Index