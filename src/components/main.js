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
                <div className='title'>用户页面</div>
                <div className='content'>
                    {this.state.books.map((item)=>{
                        return (<div key={item.bid} className='every'>
                            <img src={item.url} alt='无法显示图片' style={{width:'180px',height:'200px'}}></img>
                            <div className='right'>
                                <div className='rightText'>{item.book_name}</div>
                                <div className='price'>￥{item.book_price}</div>
                                <div className='desc'>{item.description}</div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>)
    }
}

export default Index