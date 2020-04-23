import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import socketIOClient from "socket.io-client";
import NumClients from "./numClients"

// TODO: If there is NO CONTEXT (i.e. no props) (i.e. we just load /cafe)
// then REDIRECT back to to the login page
const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

var socket = socketIOClient(socketURL);
// var socket = socketIOClient('http://localhost:3001');

class Cafe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cafe: this.props.location.state.cafe,
      username: this.props.location.state.username,
      socketId: this.props.location.state.socketId,
      guestNumber: this.props.location.state.numClients,
      numClients:this.props.location.state.numClients,
      endpoint: 'http://localhost:3001'
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    socket.off("cafe_logout")
  }

  send_socket = () => {
    socket.emit('cafe_logout', { 'cafe': this.state.cafe, 'socketId': this.state.socketId}) 
  }


  logout = () => {
    this.send_socket()
  }

  render() {
    return (
      <div className="App">
        { 
          !!this.state.cafe && 
          (
            <div>
              <h1>Welcome {this.state.username} to Cafe {this.state.cafe.cafename}!</h1>
              <p>Cafe Id: {this.state.cafe.id} | Cafe Location: {this.state.cafe.location}</p>
              {/*<p>{this.state.numClients} / {this.state.cafe.capacity}</p>*/}
              <NumClients cafe={this.state.cafe} initial={this.state.guestNumber}/>
            </div>
          )
        }
      
      <Link to={'/'} onClick={this.logout}>
        <h3> Leave the cafe <FaBeer/></h3>
      </Link>

    </div>
    );
  }
}
export default Cafe;