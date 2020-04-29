import React from 'react';
import './../styles/CafeList.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';


function CafeListPanel(props) {

	return (
      <div className="cafeListPanelContainer">
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
				<div className="cafeListPanelInnerContainer">
				    <div className="cafeListCafeIcon">
				    </div>
				    <div>
						<div className="cafeListCafeName">{props.cafename}</div>
						<div className="cafeListCafeLocation">{props.location}</div>
				    </div>
				    <div className="cafeListCafeCapacity">
						<span>{props.clientsInRoom.length} / {props.capacity}</span>
				    </div>
				</div>
    		</Link>
		</div>
	)
}



export default CafeListPanel;