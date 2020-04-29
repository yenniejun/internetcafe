import React from 'react';  
import './../styles/Modal.css';
import { Link } from 'react-router-dom';


function Popup (props) {  
	console.log("POPUP", props)
	return (  
		<div className='popup'>  
			<div className='popup-inner'>  
				<div className="popup-text">{props.text}</div> 
				<div className="popup-cafename">{props.cafename}</div> 
				<div className="popup-button">
					<div onClick={props.closePopup}><a>Go back</a></div>
					<div>
						<Link to={{
						pathname: props.to,
						state: props.state
					}}>
						Enter
						</Link>
					</div>
				</div>
			</div>  
		</div>  
	);  
}  


export default Popup;
