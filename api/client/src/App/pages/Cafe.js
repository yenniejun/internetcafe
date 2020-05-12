import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import CafeBackground from "./components/cafeBackground"
import {Teacup} from "./components/cafe-elements/beverages"
import {Plant1, Plant2, CounterPlant1} from "./components/cafe-elements/plants"
import {Laptop} from "./components/cafe-elements/workmediums"
import {CashRegister, EspressoMachine, ShelfMachines, ExtraCups} from "./components/cafe-elements/appliances"
import {Donut1, Donut2, Cookiejar, Croissants1, Croissants2, Cupcakes} from "./components/cafe-elements/snacks"

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
      windowHeight:window.outerHeight,
      windowWidth:1440*window.outerHeight/1024
    };
  }

  componentDidUpdate() {
    window.onpopstate  = (e) => 
      this.handleLogout();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));

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
    window.removeEventListener("resize", this.updateDimensions.bind(this));

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

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    console.log("UPDATE dimensions")
    if (window.outerHeight !== this.state.windowHeight) {
      this.setState({ 
        windowHeight:window.outerHeight,
        windowWidth:1440*window.outerHeight/1024
      })
    }
  }

  handleLogout = () => {
    document.body.classList.remove('cafepage'); 
    this.send_socket()
  }

  render() {
    document.body.classList.add('cafepage');

    console.log(window.outerWidth +' x '+ window.outerHeight);
    console.log("HI", this.state.windowWidth, this.state.windowHeight)

    return (
      <div className="Cafe">
      <CafeBackground 
          height={this.state.windowHeight}
          width={this.state.windowWidth}
          username={this.state.username}
          handleLogout={this.handleLogout}
          clientsInRoom={this.state.clientsInRoom}
          cafe={this.state.cafe}
          behindLightbulb={[ShelfMachines]}
          extra={[Teacup, Laptop, Plant1, Plant2, CounterPlant1, CashRegister, EspressoMachine, ExtraCups]}
        />
        <CafeBackground 
          height={this.state.windowHeight}
          width={this.state.windowWidth}
          extra={[Plant1, Plant2, CounterPlant1]}
          food={[Donut1, Donut2, Cookiejar, Croissants1, Croissants2, Cupcakes]}
        />
        <CafeBackground 
          height={this.state.windowHeight}
          width={this.state.windowWidth}
          extra={[Plant1, Plant2, CounterPlant1]}
        />

        { 
          // !!this.state.cafe && 
          // (
          //   <CafeView
          //     username={this.state.username}
          //     cafe={this.state.cafe}
          //     handleLogout={this.logout}
          //     clientsInRoom={this.state.clientsInRoom}
          // />
          // )

        }
    </div>
    );
  }
}
export default Cafe;