import React from 'react';
import './../styles/Main.css';
import classNames from 'classnames';
import beansLogo from './../../img/espresso-beans.png';
// import cupLogo from './../../img/hot-espresso.png';


function LoginModal(props) {
	return (
	    <div className="modal">
	    	<div className="modal-title-container">
 	       		<h1 className={classNames("modal-title", "modal-title-home")}><img className="beans-logo" src={beansLogo} alt="espresso beans logo" /> Internet Cafe</h1>
       		</div>

       		<form className="modal-form" onSubmit={props.handleSubmit}>
	          	<label className="modal-input-label">
	         		Nickname:
	            	<input type="text" name="username" value={props.cafe.username} onChange={props.handleChange} />
	          	</label>
	          	<label className="modal-input-label">
	            Cafe ID:
          			<input type="text" name="cafe_id" placeholder="Optional" value={props.cafe.cafe_id} onChange={props.handleChange} />
	          	</label>
          		<input className={classNames("modal-button")} type="submit" value="Grab a seat" align="middle"/>
	        </form>
	    </div>
  );
}

export default LoginModal;