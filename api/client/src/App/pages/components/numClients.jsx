import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";


function NumClients(props) {
  const [clientsInRoom, setClientsInRoom] = useState(props.clientsInRoom)
  const [newClient, setNewClient] = useState("")
  const [byeClient, setByeClient] = useState("")
  
  useEffect(() => {    
    const socketURL =
      process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'http://localhost:3001';

    var socket = socketIOClient(socketURL);

    socket.on('joined', (emission) => {
      setClientsInRoom(emission.clientsInRoom)
      setNewClient(emission.newClientName)
    });

    socket.on('leaving', (emission) => {
      if (emission.clientName) {
        setClientsInRoom(emission.clientsInRoom)
        setByeClient(emission.clientName)
      }
    });

    return () => {
      socket.off("joined");
      socket.off("leaving");
    };
  }, [props.cafe.id]);

  return (
    <div style={{backgroundColor:"white"}}>
      <div>
        Number of people in room {clientsInRoom.length} / {props.cafe.capacity}
      </div>
      <div>
        {clientsInRoom.map((client, key) =>
          <div key={key}>{client}</div>)}
      </div>
      {/*newClient && (<div>Welcome: {newClient}</div>)}
      {byeClient && (<div>Bye: {byeClient}</div>)*/}
    </div>
  );
}

export default NumClients;