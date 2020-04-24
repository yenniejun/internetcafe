// May need to reuse components from login page if it's gonna look the same

import React from 'react';
import './CafeList.css';
import './Modal.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import ModalButton from './modalButton'



function CafeForm(props) {
  return (
    <div className="modal">
      <div className="modal-title-container">
        <h1 className="modal-title">Create a cafe</h1>
        </div>
    	<form class="modal-form" onSubmit={props.handleSubmit}>
          <label class="modal-input-label">
            Cafe Name:
            <input type="text" name="cafe_name" value={props.cafe_name} onChange={props.handleChange} />
          </label>
          <label class="modal-input-label">
            Cafe Location:
            <input class="input-text" type="text" name="cafe_location" value={props.cafe_location} onChange={props.handleChange} />
          </label>
          <label class="modal-input-label">
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
          props.post_id && 
          <h2>Your new cafe ID is {props.post_id}</h2>
        }           

      <ModalButton text={"Return to Login"} to={'/'}/>

    </div>
  );
}

export default CafeForm;
