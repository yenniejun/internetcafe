import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import CafeView from "./components/cafeView"

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
    console.log("CAFE PROPS", props.location.state)
    this.state = {
      cafe: this.props.location.state.cafe,
      username: this.props.location.state.username,
      socketId: '',
      clientsInRoom: this.props.location.state.clientsInRoom ?? [],
    };
  }

  componentDidMount() {
    this.state.clientsInRoom.push(this.state.username)
    socket.emit('cafe_login', {
      cafe: this.state.cafe, 
      username:this.state.username
    })

    socket.on('me_joined', (emission) => {
      this.setState({ 
        socketId: emission.socketId
        })
    });

    if (this.state.clientsInRoom.length > this.state.cafe.capacity) {
        alert("ROOMFULL!")
        this.setState({
            cafe: undefined
        })
        window.location = './'
    }
  }

  componentWillUnmount() {
    socket.off("me_joined")
    socket.off("joined")
    socket.off("cafe_logout")
  }

  send_socket = () => {
    socket.emit('cafe_logout', { 
      'cafe': this.state.cafe, 
      'socketId': this.state.socketId,
      'username': this.state.username
    }) 
  }

  logout = () => {
    this.send_socket()
  }

  render() {
    return (
      <div className="Cafe">
        { 
          !!this.state.cafe && 
          (
            <CafeView
              username={this.state.username}
              cafe={this.state.cafe}
              handleLogout={this.logout}
              clientsInRoom={this.state.clientsInRoom}
          />
          )
        }
    </div>
    );
  }
}
export default Cafe;