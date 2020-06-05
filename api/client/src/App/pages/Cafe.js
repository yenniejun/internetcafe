import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import CafeBackground from "./components/cafeBackground"
import {Teacup} from "./components/cafe-elements/beverages"
import {Plant1, Plant2, CounterPlant1} from "./components/cafe-elements/plants"
import {CashRegister, EspressoMachine, ShelfMachines, ExtraCups} from "./components/cafe-elements/appliances"
import {Donut1, Donut2, Cookiejar, Croissants1, Croissants2, Cupcakes} from "./components/cafe-elements/snacks"
// import {ReactComponent as Meeple1} from "./../img/avatars/meeple1.svg"

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
  // console.log("CAFE PROPS", props.location.state)
    this.state = {
      cafe: this.props.location.state.cafe,
      username: this.props.location.state.username,
      avatar: this.props.location.state.avatar,
      socketId: '',
      clientsInRoom: this.props.location.state.clientsInRoom ?? [],
      roomsList: [],
      windowHeight:window.outerHeight,
      windowWidth:1440*window.outerHeight/1024,
      redirectHome: false
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
      username:this.state.username,
      avatar:this.state.avatar
    })

    socket.on('me_joined', (emission) => {
      this.setState({ 
        socketId: emission.socketId
        })
    });

    socket.on('joined', (emission) => {
      this.setState({ 
        clientsInRoom: JSON.parse(emission.clientsInRoom),
        roomsList: emission.roomsList
      })
      // console.log("JOINEDD", this.state.clientsInRoom, "my name:", this.state.username)
    });

    socket.on('leaving', (emission) => {

      console.log("Socket Leaving", emission)
      if (emission.clientName) {
        this.setState({ 
          clientsInRoom: JSON.parse(emission.clientsInRoom)
        })

        if (this.state.clientsInRoom.length === 0) {
          this.setState({
            redirectHome: true
          })
        }
      }
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
    socket.off("leaving");
  }


  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    // console.log("UPDATE dimensions")
    if (window.outerHeight !== this.state.windowHeight) {
      this.setState({ 
        windowHeight:window.outerHeight,
        windowWidth:1440*window.outerHeight/1024
      })
    }
  }

  handleLogout = () => {
    document.body.classList.remove('cafepage'); 
    socket.emit('cafe_logout', { 
      'cafe': this.state.cafe, 
      'socketId': this.state.socketId,
      'username': this.state.username,
      'avatar:': this.state.avatar
    }) 
  }

  getFriendsToRender = () => {
    return this.state.clientsInRoom.filter(
      x => 
        x.username !== this.state.username 
        && x.roomname === this.state.cafe.id
        && !!x.avatar
      )
  }

  render() {
    document.body.classList.add('cafepage');

    // console.log(this.state.roomsList, this.state.clientsInRoom)

    const friends = this.getFriendsToRender();

    // console.log("FRIENDS?", friends ?? friends[0]['avatar'])
    // console.log("My name: ", this.state.username)


    // console.log(window.outerWidth +' x '+ window.outerHeight);
    // console.log("HI", this.state.windowWidth, this.state.windowHeight)

    return (
      <div className="Cafe">

        {this.state.redirectHome && <Redirect to={'/'}/>}

        <CafeBackground 
            height={this.state.windowHeight}
            width={this.state.windowWidth}
            username={this.state.username}
            avatar={this.state.avatar}
            handleLogout={this.handleLogout}
            clientsInRoom={this.state.clientsInRoom}
            cafe={this.state.cafe}
            behindLightbulb={[ShelfMachines]}
            extra={[Teacup, Plant1, Plant2, CounterPlant1, CashRegister, EspressoMachine, ExtraCups]}
            work={"laptop"}
            friends = {friends ? friends.slice(0,2) : null}
            // friends={["Meeple1", "Meeple2"]}
          />
          <CafeBackground 
            height={this.state.windowHeight}
            width={this.state.windowWidth}
            extra={[Plant1, Plant2, CounterPlant1]}
            food={[Donut1, Donut2, Cookiejar, Croissants1, Croissants2, Cupcakes]}
            friends = {friends ? friends.slice(2,5) : null}
            // friends={["Meeple3", "Meeple4"]}
          />
          <CafeBackground 
            height={this.state.windowHeight}
            width={this.state.windowWidth}
            extra={[Plant1, Plant2, CounterPlant1]}
            friends = {friends ? friends.slice(5,8) : null}
            // friends={["Meeple5", "Meeple6"]}
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