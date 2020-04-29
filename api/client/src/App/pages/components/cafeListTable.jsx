import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/CafeList.css';
import './../styles/Modal.css';
import classNames from 'classnames';


function renderTableData(props) {
  return props.cafes.map((cafe, index) => {
     const { id, cafename, location, capacity } = cafe
     // const numClientsInRoom = props.cafeClientList[id]?.length ?? 0

     var clientsInRoom = []
     for (var key in props.cafeClientList[id]) { 
        var clientId = props.cafeClientList[id][key]
        clientsInRoom.push(props.clientToNameMapping[clientId])
     }

     return (
        <tr key={id} >
           <td>
              {clientsInRoom.length < capacity ?
                <Link to={{
                    pathname: './cafe',
                    state: {
                      cafe: cafe,
                      username: props.username,
                      socketId: props.socketId,
                      numClients:clientsInRoom.length,
                      clientsInRoom: clientsInRoom,
                      }
                    }}>
                  {cafename}, {location} ... {clientsInRoom.length} / {capacity}
                </Link> :
                <div>{cafename}, {location} ... Room FULL</div>
              }
              
            </td>
        </tr>
     )
  })
}

function CafeListTable(props) {

	return (
    <table className={classNames("list-table")}>
      	<tbody>
      		{renderTableData(props)}
        </tbody>
	</table>
  );
}

export default CafeListTable;