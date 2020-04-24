import React from 'react';
import './CafeList.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

function CafeListTable(props) {

	const tablebody = props.cafes.map(function (item, i) {
    	return (
	        <tr key={item.id}>
	           <td >{item.id}</td>
	           <td>{item.cafename}</td>
	           <td>{item.location}</td>
	           <td>{item.capacity}</td>
	           {console.log(item.isprivate)}
	           <td>{item.isprivate ? "private" : "public"}</td>
	           <td>{item.created_timestamp}</td>
	        </tr>
	      )
	  });

  return (
    <table className="list-table">
     	<thead>
      	</thead>
      	<tbody>
       		<tr>
				<td style={{}}>Id</td>
				<td>Name</td>
				<td>Location</td>
				<td>Capacity</td>
				<td>Private?</td>
				<td>Time created</td>
			</tr>
			{tablebody}
        </tbody>
	</table>
  );
}

export default CafeListTable;
