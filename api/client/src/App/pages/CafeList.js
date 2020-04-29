import React, { Component } from 'react';
import CafeListTable from './components/cafeListTable'
import ModalButton from './components/modalButton'
import './styles/CafeList.css';
import socketIOClient from "socket.io-client";


const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

var socket = socketIOClient(socketURL);

class CafeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.location.state.username,
      cafeClientList: [],
      clientToNameMapping: {},
      socketId: ''
    };
    console.log(this.props.location.state)

  }

  async getCafes() {
    const response = await fetch(`/api/cafe`);
    console.log("STATUS", response.status)
    if (response.status !== 200) throw Error(response);
    const body = await response.json();
    console.log("get cafes", body)
    return body;
  };

  componentDidMount() {
    socket.emit('cafe_list');

    this.getCafes()
      .then(cafes => this.setState({cafes: cafes}))

    socket.on('capacity', (emission) => {
        this.setState({
          cafeClientList: emission.roomsList,
          socketId: emission.socketId,
          clientToNameMapping: emission.clientToNameMapping
        });
      });

    socket.on('joined', (emission) => {
      this.setState({
        cafeClientList: emission.roomsList
      });
    })

    socket.on('leaving', (emission) => {
      this.setState({
        cafeClientList: emission.roomsList
      });
    })
  }

  componentWillUnmount() {
    socket.off("cafe_list")
    socket.off("capacity");
    socket.off("joined")
    socket.off("leaving")
  }

  convertIsPrivateBoolean(isPrivate) {
    if (isPrivate === true) {
      return "private"
    } else {
      return "public"
    }
  }

  render() {
    return (
    <div className="modal">
      <div className="modal-title-container">
        <h1 className="modal-title">Available Cafes</h1>
      </div>
      <div className="modal-table">
        {
          !!this.state.cafes && this.state.cafes.length > 0 && 
            <CafeListTable 
              cafes={this.state.cafes} 
              username={this.state.username} 
              cafeClientList={this.state.cafeClientList}
              socketId={this.state.socketId}
              clientToNameMapping={this.state.clientToNameMapping}
            />
        }
      </div>

      <ModalButton text={"Return to Login"} to={'/'}/>
      <ModalButton text={"Create a Cafe"} to={'./Create'}/>

    </div>
    );
  }
}
export default CafeList;