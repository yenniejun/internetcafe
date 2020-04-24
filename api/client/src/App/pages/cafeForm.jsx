// May need to reuse components from login page if it's gonna look the same

import React from 'react';
import './CafeList.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import { FaBeer } from 'react-icons/fa';


function CafeForm(props) {

  return (
    <div className="cafe-form">
      	<h1>Create a cafe</h1>
    	<form onSubmit={props.handleSubmit}>
          <label>
            Cafe Name:
            <input type="text" name="cafe_name" value={props.cafe_name} onChange={props.handleChange} />
          </label>
          <label>
            Cafe Location:
            <input type="text" name="cafe_location" value={props.cafe_location} onChange={props.handleChange} />
          </label>
          <label>
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

		<Link to={'/'}>
			<h3>Return to login page <FaBeer/></h3>
		</Link>
    </div>
  );
}

export default CafeForm;
