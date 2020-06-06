import React from 'react';
import './../styles/Main.css';
import classNames from 'classnames';
import CafeListPanel from './cafeListPanel'


function renderTableData(props) {
  return props.cafes && props.cafes.map((cafe, index) => {
     const { id, cafename, location, capacity } = cafe
     // const numClientsInRoom = props.cafeClientList[id]?.length ?? 0

     var clientsInRoom = []
     if (!!props.cafeClientList){
        for (var key in props.cafeClientList[id]) { 
          var clientId = props.cafeClientList[id][key]
          clientsInRoom.push(props.clientToNameMapping[clientId])
        }
     } 

     return (
        <tr key={id} onClick={(event) => props.onClickHandler(cafe, clientsInRoom, event)}>
           <td>
              {(clientsInRoom.length == 0 || clientsInRoom.length < capacity)?
                  <CafeListPanel 
                    cafename={cafename}
                    location={location}
                    capacity={capacity}
                    username={props.username}
                    cafe={cafe}
                    socketId={props.socketId}
                    clientsInRoom={clientsInRoom}
                    icon={index % 26}
                  />
                :
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