import React, { Component } from 'react';
import CafeListTable from './components/cafeListTable'
import ModalButton from './components/modalButton'
import Popup from './components/popup'
import './styles/Main.css';
import socketIOClient from "socket.io-client";
import meepleIcon from './../img/cafe-icons/meeple-button.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

const socketURL =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:3001';

var socket = socketIOClient(socketURL);

class CafeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props?.location?.state?.username ?? '',
      avatar: this.props?.location?.state?.avatar ?? '',
      cafeClientList: [],
      clientToNameMapping: {},
      socketId: '',
      showPopup: false,
      selectedCafe:{},
      selectedClientsInRoom:[],
      redirectHome: !this.props?.location?.state?.username
    };
    // console.log("cafelist", this.state)

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(cafe, clientsInRoom, event) {
    if (event.shiftKey) {
      var answer = window.confirm("Delete cafe?")
      if (answer) {
          console.log("Deleting confirmation 1")
          var answer2 = window.confirm("Are you super sure?")
          if (answer2) {
            console.log("Fine")
            this.deleteCafe(cafe.id)
              .then(() => this.getCafes())
              .then(cafes => this.setState({cafes: cafes}))
              .catch(err => this.setState({redirectHome: true}));
          }
      }
      else {
          console.log("Not deleting")
          // Nothing happens
      }
    }
    this.setState({
      selectedCafe: cafe,
      selectecClientsInRoom: clientsInRoom,
      showPopup: true 
    })
  }

  closePopup() {  
    this.setState({  
       showPopup: !this.state.showPopup  
    });  
   }  

  async deleteCafe(id) {
    const response = await fetch(`/api/cafe/${id}`, {
      method: `DELETE`
    });

    console.log("Delete Cafe response code", response.status)
    if (response.status !== 202) {
      throw Error;
    }
  }

  async getCafes() {
    const response = await fetch(`/api/cafe`);

    console.log("Get Cafes response code", response.status)
    if (response.status !== 200) {
      throw Error;
    }
    const body = await response.json();
    console.log("cafes", body)
    return body;
  };

  componentDidMount() {
    socket.emit('cafe_list');

    this.getCafes()
      .then(cafes => this.setState({cafes: cafes}))
      .catch(err => this.setState({redirectHome: true}))

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
    <div className={classNames("modal", "cafe-list-modal")}>
      
      {this.state.redirectHome && 
        <Redirect to={'/'}/>
      }

      <div className={classNames("modal-title-container")}>
        <Link to={{
          pathname: '/avatar',
          state: {username: this.state.username}
        }}>
          <img className="home-icon" src={meepleIcon} alt="meeple icon" />
        </Link>

        <h1 className={classNames("modal-title", "modal-title-cafelist")}>Available Cafes</h1>
      </div>

      {this.state.showPopup ?
          <Popup  
            text='Enter Cafe'  
            closePopup={this.closePopup.bind(this)} 
            cafename={this.state.selectedCafe.cafename}
            to={'./cafe'}
            state={{
              cafe:this.state.selectedCafe,
              username:this.state.username,
              socketId:this.state.socketId,
              numClients:this.state.selectecClientsInRoom.length,
              clientsInRoom:this.state.selectecClientsInRoom,
              avatar:this.state.avatar
            }}
          />  
          : null  
        }  


      <div className="modal-table">
        {
          !!this.state.cafes && this.state.cafes.length > 0 && 
            <CafeListTable 
              cafes={this.state.cafes} 
              username={this.state.username} 
              cafeClientList={this.state.cafeClientList}
              socketId={this.state.socketId}
              clientToNameMapping={this.state.clientToNameMapping}
              onClickHandler={this.handleClick}
            />
        }
      </div>

      <hr/>

      <div className="cafe-list-text">
        Don't see one you like?
      </div>

      <ModalButton 
        text={"+ Create a Cafe"} 
        to={'./Create'} 
        username={this.state.username}
      />

    </div>
    );
  }
}


// Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
// Need to include this somewhere

export default CafeList;