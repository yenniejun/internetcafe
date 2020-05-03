import React from 'react';
import './../styles/CafeList.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import capacityLogo from './../../img/capacity-icon.png';
import castleIcon from './../../img/cafe-icons/castle.svg';

function CafeListPanel(props) {

	return (
		<div className="cafeListPanelContainer">
			<div className="cafeListPanelInnerContainer">
			    <div className="cafeListCafeIcon">
			    	<img className="cafe-icon" src={castleIcon} alt="cafe icon" />
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