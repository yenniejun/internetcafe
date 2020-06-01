import React from 'react';
import './../styles/Main.css';
import * as avatars from './../../img/avatar-pngs/';

const NUM_AVATARS = 6;

function AvatarModal(props) {
    // const avatar = avatars[`Avatar${index}Img`];

	return (
	    <div className="avatarModal">
            <div className="innerAvatarModal">
                {
                    [...Array(NUM_AVATARS)].map((e, index) => (
                        <div onClick={() => props.handleClick(index+1)} className="meeple-panel" key={index}><img src={avatars[`Avatar${index+1}Img`]} alt="meeple logo" /></div>
                    ))
                }
            </div>
            
            {/* <ModalButton 
                text={"Grab a seat"} 
                to={'./List'} 
                avatar={"Meeple1"}
                username={props.username}
            /> */}
	    </div>
  );
}

export default AvatarModal;

