import React from 'react';
import './../styles/Main.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cupLogo from './../../img/hot-espresso.png';

function ModalButton(props) {

  return (
    <Link style={{ textDecoration: 'none'}} to={{
      pathname: props.to,
      state: {
        username:props.username
      }
    }}>
      <div className={classNames("modal-button", props.styles)}>
      	{props.showLogo && (
      		<img className="modal-button-logo" src={cupLogo} alt="espresso cup logo" />
  		)}
        <span >{props.text}</span>
      </div>
    </Link>

  );
}

export default ModalButton;
