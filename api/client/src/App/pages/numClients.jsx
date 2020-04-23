import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

function NumClients(props) {
  const [response, setResponse] = useState(props.initial);
  
  useEffect(() => {    
    const socketURL =
      process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'http://localhost:3001';

    var socket = socketIOClient(socketURL);

    socket.on('joined', (emission) => {
      setResponse(emission.numClients);
    });

    socket.on('leaving', (emission) => {
      setResponse(emission.numClients);
    });

    return () => {
      console.log("Turning socket off")
      socket.off("joined");
      socket.off("leaving");
    };
  }, [props.cafe.id]);

  return (
    <div>
      Number of people in room {response} / {props.cafe.capacity}
    </div>
  );
}

export default NumClients;