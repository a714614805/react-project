import React, { Component } from 'react';
import './App.css';
class App extends Component {
  componentDidMount(){
    
  }
  handleInto = ()=>{
    window.location.href = 'http://localhost:3000/login'
  }
  render() {
    return (
      <div className="App">
        {/* <div className='beforeLoad'>毕业设计，贼NB</div> */}
        <div className='introduce'>
          <div className='intTop'>
            欢迎来到我的项目
          </div>
          <div onClick={this.handleInto}>点击进入</div>
        </div>
      </div>
    );
  }
}

export default App;
