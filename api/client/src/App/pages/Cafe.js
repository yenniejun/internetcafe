import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import NumClients from "./components/numClients"

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
      <div className="App">
        { 
          !!this.state.cafe && 
          (
            <div>
              {/*<h1>Welcome {this.state.username} to Cafe {this.state.cafe.cafename}!</h1>*/}
              <p>Cafe Id: {this.state.cafe.id} | Cafe Location: {this.state.cafe.location}</p>
              <NumClients 
                cafe={this.state.cafe} 
                clientsInRoom={this.state.clientsInRoom}
              />
            </div>
          )
        }
      
      <Link to={'/'} onClick={this.logout}>
        <h3> Leave the cafe</h3>
      </Link>

    </div>
    );
  }
}
export default Cafe;