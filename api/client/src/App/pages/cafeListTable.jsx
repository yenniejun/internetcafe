import React from 'react';
import './CafeList.css';
import './Modal.css';
import classNames from 'classnames';


function renderTableHeader(tableHeaders) {
	return tableHeaders.map((key, index) => {
	   return <th key={index}>{key.toUpperCase()}</th>
	});
}

function renderTableData(cafes) {
  return cafes.map((cafe, index) => {
     const { id, cafename, location, capacity } = cafe
     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{cafename}</td>
           <td>{location}</td>
           <td>{capacity}</td>
        </tr>
     )
  })
}

function CafeListTable(props) {

	const tableHeaders = ["id", "name", "location", "capacity"]
	return (
    <table className={classNames("list-table")}>
      	<tbody>
      		<tr>{renderTableHeader(tableHeaders)}</tr>
      		{renderTableData(props.cafes)}
        </tbody>
	</table>
  );
}

export default CafeListTable;