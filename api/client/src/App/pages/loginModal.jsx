import React from 'react';
import './LoginModal.css';
import LoginButton from './loginButton'
import classNames from 'classnames';
import beansLogo from './../img/espresso-beans.png';


function LoginModal(props) {
	return (
	    <div class="modal">
	    	<div className="login-title-container">
    	      	
 	       		<h1 className="login-title"><img class="beanslogo" src={beansLogo} alt="espresso beans logo" /> Internet Cafe</h1>
       		</div>


       		<form onSubmit={props.handleSubmit} style={{
	          display:'grid', padding:'0.5rem'
	        }}>
	          <label class="input-text">
	            Room ID:
	            <input style={{margin:"0.5rem"}} type="text" name="cafe_id" value={props.cafe.cafe_id} onChange={props.handleChange} />
	          </label>
	          <label class="input-text">
	            Display Name:
	            <input style={{margin:"0.5rem"}} type="text" name="username" value={props.cafe.username} onChange={props.handleChange} />
	          </label>
	          <input className={classNames("button-login","button-text")} type="submit" value="Find a seat" align="middle" style={{width:"20%",margin:"2rem",padding:"0.5rem"}}/>
	        </form>
	    	<LoginButton text="Create cafe" to={'./Create'}/>
	    	<LoginButton text="List cafes" to={'./List'}/>
	    </div>
  );
}

export default LoginModal;