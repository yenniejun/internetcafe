// May need to reuse components from login page if it's gonna look the same

import React from 'react';
import './../styles/Modal.css';
import ModalButton from './modalButton'
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import homeIcon from './../../img/home-button.png';


function get_cafe(props) {
  const cafe = {
    id: props.cafeId,
    cafename: props.cafe_name,
    location: props.cafe_location,
    capacity: props.cafe_capacity
  }
  return cafe
}

function CafeForm(props) {

  return (
    <div className={classNames("modal", "cafe-list-modal")}>
      <div className={classNames("modal-title-container")}>
        <Link to={'/'}><img className="home-icon" src={homeIcon} alt="home icon" /></Link>
        <h1 className={classNames("modal-title", "modal-title-cafelist")}>Create a cafe</h1>
      </div>
    	<form className="modal-form" onSubmit={props.handleSubmit}>
          <label className="modal-input-label">
            Cafe Name:
            <input type="text" name="cafe_name" value={props.cafe_name} onChange={props.handleChange} />
          </label>
          <label className="modal-input-label">
            Cafe Location:
            <input className="input-text" type="text" name="cafe_location" value={props.cafe_location} onChange={props.handleChange} />
          </label>
          <label className="modal-input-label">
            Capacity:
            <input  type="number" name="cafe_capacity" value={props.cafe_capacity} onChange={props.handleChange} />
          </label>
          {/*<label>
            Is Private:
            <input style={{margin:"0.5rem"}} type="checkbox" name="is_private" value={this.state.is_private} onChange={this.handleChange} />
          </label>*/}
          <input className="create-button" type="submit" value="Create" align="middle"/>
          
        </form>

        {
          props.cafeId && 
            <Redirect 
              to={{
                pathname:'./cafe',
                state: {
                  cafe: get_cafe(props),
                  username: props.username,
                  numClients: 1,
                  clientsInRoom: []
                }
              }}
            /> 
        }           

    </div>
  );
}

export default CafeForm;
