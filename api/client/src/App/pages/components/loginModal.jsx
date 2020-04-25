import React from 'react';
import './../styles/Modal.css';
import ModalButton from './modalButton'
import classNames from 'classnames';
import beansLogo from './../../img/espresso-beans.png';


function LoginModal(props) {
	return (
	    <div className="modal">
	    	<div className="modal-title-container">
 	       		<h1 className="modal-title"><img className="beans-logo" src={beansLogo} alt="espresso beans logo" /> Internet Cafe</h1>
       		</div>

       		<form className="modal-form" onSubmit={props.handleSubmit}>
	          	<label className="modal-input-label">
	            Room ID:
          			<input type="text" name="cafe_id" value={props.cafe.cafe_id} onChange={props.handleChange} />
	          	</label>
	          	<label className="modal-input-label">
	         		Display Name:
	            	<input type="text" name="username" value={props.cafe.username} onChange={props.handleChange} />
	          	</label>
	          	<input className={classNames("modal-button", "modal-input-label", "modal-find-seat-button")} type="submit" value="Find a seat" align="middle"/>
	        </form>
	    	<ModalButton text="Create cafe" to={'./Create'} showLogo={true}/>
	    	<ModalButton text="Find a cafe" to={'./List'} showLogo={true}/>
	    </div>
  );
}

export default LoginModal;