import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";


function NumClients(props) {
  const [numClients, setNumClients] = useState(props.initial);
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
      setNumClients(emission.numClients);
      setClientsInRoom(emission.clientsInRoom)
      setNewClient(emission.newClientName)
    });

    socket.on('leaving', (emission) => {
      if (emission.clientName) {
        setNumClients(emission.numClients);
        setClientsInRoom(emission.clientsInRoom)
        setByeClient(emission.clientName)
      }
    });

    return () => {
      console.log("Turning socket off")
      socket.off("joined");
      socket.off("leaving");
    };
  }, [props.cafe.id]);

  return (
    <div>
      <div>
        Number of people in room {numClients} / {props.cafe.capacity}
      </div>
      <div>
        {clientsInRoom.map((client, key) =>
          <div key={key}>{client}</div>)}
      </div>
      {newClient && (<div>Welcome: {newClient}</div>)}
      {byeClient && (<div>Bye: {byeClient}</div>)}
    </div>
  );
}

export default NumClients;