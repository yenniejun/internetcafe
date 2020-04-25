import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cupLogo from './../img/hot-espresso.png';

function ModalButton(props) {

  return (
    <Link style={{ textDecoration: 'none' }} to={props.to}>
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
