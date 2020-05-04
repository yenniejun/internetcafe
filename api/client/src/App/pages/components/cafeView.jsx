import React from 'react';
import { Link } from 'react-router-dom';
import NumClients from "./numClients"


function CafeView(props) {
	return (
		<div className="cafe-view">
            <div >
	          <h1>Hi {props.username}! Welcome to {props.cafe.cafename}.</h1>
	          <div className="cafe-information">
	          	<div>Cafe ID: {props.cafe.id}</div>
	          	<div>Location: {props.cafe.location}</div>
				<NumClients 
				  cafe={props.cafe} 
				  clientsInRoom={props.clientsInRoom}
				/>
	          </div>
	        </div>
	      <Link 
	      	to={{
	            pathname: './list',
	            state: {
	              username: props.username,
	            }
	          }} 
	          onClick={props.handleLogout}>
	        <h3> Leave the cafe</h3>
	      </Link>
		</div>
	)
}

export default CafeView;