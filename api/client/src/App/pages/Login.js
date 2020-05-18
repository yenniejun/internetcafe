import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import LoginModal from "./components/loginModal"

const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

var socket = socketIOClient(socketURL);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      cafe_id: '', 
      goToCafe: false,
      goToChooseAvatar: false,
      createCafe: false,
      cafe: '',
      socketId: '',
      numClients:'',
      clientsInRoom: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getCafe(cafeId) {
    const response = await fetch(`/api/cafe/${cafeId}`);

    if (response.status === 404) {
      alert(`Cafe with ID ${cafeId} does not exist`)
      return
    }

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    if (response.status === 200) {
      console.log(body)
      return body;
    }
  };

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    socket.on("roomfull", (msg) => {
      alert(`Sorry, the cafe ${msg.cafe.cafename} with ID ${msg.cafe.id} is at capacity. Please try again later.`)
    });

    socket.on('me_joined', (emission) => {
      this.setState({ 
        socketId: emission.socketId,
        numClients: emission.numClients,
        clientsInRoom: emission.clientsInRoom
        })
    });
  }

  componentWillUnmount() {
    socket.off("me_joined");
    socket.off("roomfull")
  }

  send_socket = () => {
    socket.emit('cafe_login_with_cafeid', {
      cafeId: this.state.cafe.id, 
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.username) {
      alert('Please pick a nickname')
    }

    else if (this.state.username && this.state.cafe_id) {
      this.getCafe(this.state.cafe_id)
        .then(res => {
          this.setState({ cafe: res[0], goToCafe: true })
        })
        .then(() => {
          this.send_socket()
        })
        .catch(err => console.log("error logging into cafe", err))
    }

    // Only has username, no cafe ID
    else if (this.state.username && !this.state.cafe_id) {
        this.setState({ goToChooseAvatar: true })
    }
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { goToCafe, goToChooseAvatar } = this.state

    return (
      <div className="App" >
        { goToCafe && !!this.state.cafe && !!this.state.socketId && (
          <Redirect 
          to={{
            pathname: from || './cafe',
            state: {
              cafe: this.state.cafe,
              username: this.state.username,
              numClients: this.state.numClients,
              clientsInRoom: this.state.clientsInRoom
            }
          }}
          />
        )}

        { goToChooseAvatar && (
          <Redirect 
          to={{
            pathname: from || './avatar',
            state: {
              username: this.state.username,
            }
          }}
          />
        )}
        
        <LoginModal 
          cafe={this.state.cafe} 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}


export default Login;