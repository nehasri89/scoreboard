import "./App.css";
import React, { useEffect, useState } from "react";

const payLoad = {
  cmd: "start",
  opts: {
    speed: 60,
  },
};

const App = () => {
  const [data, setData] = useState();
  // const [previousSets, setPreviousSets] = useState()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");

    //add an event listener when connection is established
    ws.onopen = (event) => {
      console.log("WebSocket is connected3.");
      ws.send(JSON.stringify(payLoad));
    };

    //add an event listener for the message event
    ws.onmessage = (event) => {
      console.log(` Data received from server2: ${event.data}`);
      setData(event.data);
    };

    //add an event listener when error occurs
    ws.onerror = (error) => {
      console.log("WebSocket Error: " + error);
    };

    // add an event listener when socket closes.
    ws.onclose = (event) => {
      console.log("Disconnected from WebSocket.");
    };

    //close the connection when app unmounts
    return () => ws.close();
  }, []);

  return <div>HELLO{data}</div>;
};

export default App;
