import React, {Component} from 'react';
import './App.css';
import Matches from './Matches/Matches';

//const WebSocket = require("ws");
const URL = 'ws://localhost:3031'

class App extends Component {

  ws = new WebSocket(URL)

  componentDidMount(){
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('socket connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      console.log(evt.data);
    }

    this.ws.onclose = () => {
      console.log('sockect disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

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
