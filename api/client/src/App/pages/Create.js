import React, { Component } from 'react';
import CafeForm from './components/cafeForm'
import socketIOClient from "socket.io-client";


const MAX_CAPACITY = 6;
const MAX_NAME_LENGTH = 30;

const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

var socket = socketIOClient(socketURL);

class CreateCafe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'cafe_name':'',
      'cafe_location': '',
      'cafe_capacity': '',
      'cafeId':'',
      'socketId':'',
      'username': this.props.location.state.username,
      'fireRedirect':false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async createCafe() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        cafeName: this.state.cafe_name,
        location: this.state.cafe_location,
        capacity: this.state.cafe_capacity,
        isPrivate: false
      })
    };

    const response = await fetch('/api/cafe', requestOptions)
    if (response.status !== 201) throw Error(response);

    const body = await response.json();

    this.setState({ cafeId: body.id })
    return response;
  };

  readyToCreate() {
    console.log("ready to create", this.state)
    if (!this.state.cafe_name || !this.state.cafe_location || !this.state.cafe_capacity) {
      alert("Please fill out all of the details.") ;
      return false;
    }
    else if (this.state.cafe_name.length >= MAX_NAME_LENGTH) {
      alert(`Cafe name must be fewer than ${MAX_NAME_LENGTH} characters.`)
      return false;
    }
    else if (this.state.cafe_location.length >= MAX_NAME_LENGTH) {
      alert(`Cafe location name must be fewer than ${MAX_NAME_LENGTH} characters.`)
      return false;
    } 
    else if (parseInt(this.state.cafe_capacity) >= MAX_CAPACITY) {
      alert (`Cafe capacity must be fewer than ${MAX_CAPACITY} people.`)
      return false;
    }
    else {
      return true;
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    socket.on('me_joined', (emission) => {
      // console.log("ME JOINED", emission.socketId)
      this.setState({ 
        socketId: emission.socketId,
        })
    });
  }

  componentWillUnmount() {
    socket.off("cafe_login_with_cafeid")
    socket.off("me_joined");
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.readyToCreate()) {
      this.createCafe()
        .then(() => {
          socket.emit('cafe_login_with_cafeid', {
            cafeId: this.state.cafeId, 
          })
      })
    } 
  }


  render() {
    return (
    <div className="App">
      <CafeForm handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                cafe_name={this.state.cafe_name}
                cafe_location={this.state.cafe_location}
                cafe_capacity={this.state.cafe_capacity}
                cafeId={this.state.cafeId}
                socketId={this.state.socketId}
                username={this.state.username}
      />

    </div>
    );
  }
}
export default CreateCafe;