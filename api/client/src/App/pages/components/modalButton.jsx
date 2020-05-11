import React from 'react';
import './../styles/Main.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import * as icons from './../../img/cafe-icons/';

function ModalButton(props) {
  const icon = icons[`EspressoCupIcon`];

  return (
    <Link style={{ textDecoration: 'none'}} to={{
      pathname: props.to,
      state: {
        username:props.username
      }
    }}>
      <div className={classNames("modal-button", props.styles)}>
      	{props.showLogo && (
      		<img className="modal-button-logo" src={icon} alt="espresso cup logo" />
  		)}
        <span >{props.text}</span>
      </div>
    </Link>

  );
}

export default ModalButton;
