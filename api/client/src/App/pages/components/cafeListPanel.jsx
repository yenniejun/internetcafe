import React from 'react';
import './../styles/Main.css';
import * as icons from './../../img/cafe-icons/';


function CafeListPanel(props) {
	const icon = icons[`Cafe${props.icon}Icon`];

	return (
		<div className="cafeListPanelContainer">
			<div className="cafeListPanelInnerContainer">
			    <div className="cafeListCafeIcon">
			    	<img className="cafe-icon" src={icon} alt="cafe icon" />
			    </div>
			    <div className="cafeListCafeWords">
					<div className="cafeListCafeName">{props.cafename}</div>
					<div className="cafeListCafeLocation">{props.location}</div>
			    </div>
			    <div className="cafeListCafeCapacity">
			    	<div><img className="capacity-logo" src={icons['CapacityIcon']} alt="capacity logo" /></div>
					<div className="cafeListCafeCapacityNumber">{props.clientsInRoom.length}/{props.capacity}</div>
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