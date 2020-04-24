import React from 'react';
import './LoginModal.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


function LoginButton(props) {

  return (
    <Link style={{ textDecoration: 'none' }} to={props.to}>
      <div className={classNames("button-other","button-text")}>
        <span >{props.text}</span>
      </div>
    </Link>

  );
}

export default LoginButton;
