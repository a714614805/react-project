import React, { Component } from 'react';
import './App.css';
import Loginform from './components/login'
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className='beforeLoad'>毕业设计，贼NB</div> */}
        <div className='introduce'>
          <div className='intTop'>
            this is the top of introduce
          </div>
          <Loginform></Loginform>
        </div>
      </div>
    );
  }
}

export default App;
