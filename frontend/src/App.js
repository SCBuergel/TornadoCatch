import React, {Component} from 'react';
import './App.css';
import Matches from './Matches/Matches';

class App extends Component {

  render() {
    return (
      
      <div className='container'>
        <h1>Matches</h1>
        <Matches />
      </div>
    );
  }
}

export default App;
