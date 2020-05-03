import React, { Component } from 'react';
import CafeListTable from './components/cafeListTable'
import ModalButton from './components/modalButton'
import Popup from './components/popup'
import './styles/CafeList.css';
import './styles/Modal.css';
import socketIOClient from "socket.io-client";
import homeIcon from './../img/home-button.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';



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
      socketId: '',
      showPopup: false,
      'selectedCafe':{},
      'selectecClientsInRoom':[]
    };
    // console.log("CAFE LIST", this.props.location.state)
    this.handleClick = this.handleClick.bind(this);

  }

  handleChange() {

  }


  handleClick(cafe, clientsInRoom) {
    console.log(cafe)
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

  async getCafes() {
    const response = await fetch(`/api/cafe`);
    if (response.status !== 200) throw Error(response);
    const body = await response.json();
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
    <div className={classNames("modal", "cafe-list-modal")}>
      <div className={classNames("modal-title-container")}>
        <Link to={'/'}><img className="home-icon" src={homeIcon} alt="home icon" /></Link>
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
              clientsInRoom:this.state.selectecClientsInRoom
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