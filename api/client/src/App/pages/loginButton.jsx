import React from 'react';
import './LoginModal.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cupLogo from './../img/hot-espresso.png';

function LoginButton(props) {

  return (
    <Link style={{ textDecoration: 'none' }} to={props.to}>
      <div className={classNames("button-other","button-text")}>
      	<img class="cuplogo" src={cupLogo} alt="espresso cup logo" />
        <span >{props.text}</span>
      </div>
    </Link>

  );
}

export default LoginButton;
