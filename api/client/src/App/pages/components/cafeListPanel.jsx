import React from 'react';
import './../styles/Modal.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import capacityLogo from './../../img/capacity-icon.svg';
// import castleIcon from './../../img/cafe-icons/castle.svg';
// import icons from './../../img/cafe-icons/cafe13.svg';

import * as icons from './../../img/cafe-icons/';


function CafeListPanel(props) {
	const icon = icons[`Cafe${props.icon}Icon`];

	return (
		<div className="cafeListPanelContainer">
			<div className="cafeListPanelInnerContainer">
			    <div className="cafeListCafeIcon">
			    	<img className="cafe-icon" src={icon} alt="cafe icon" />
			    </div>
			    <div>
					<div className="cafeListCafeName">{props.cafename}</div>
					<div className="cafeListCafeLocation">{props.location}</div>
			    </div>
			    <div className="cafeListCafeCapacity">
			    	<div><img className="capacity-logo" src={capacityLogo} alt="capacity logo" /></div>
					<div>{props.clientsInRoom.length}/{props.capacity}</div>
			    </div>
			</div>
		</div>
	)
}


/*
	      <Link to={{
	        pathname: './cafe',
	        state: {
	          cafe: props.cafe,
	          username: props.username,
	          socketId: props.socketId,
	          numClients:props.clientsInRoom.length,
	          clientsInRoom: props.clientsInRoom,
	          }
	        }}>

*/



export default CafeListPanel;