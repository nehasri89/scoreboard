import "./App.css";
import React, { useEffect, useState } from "react";
import {MatchUpdate, MatchEventTypes, ResultType} from './types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row`

const payLoad = {
  cmd: "start",
  opts: {
    speed: 60,
  },
};

const App = () => {
  const [data, setData] = useState<MatchUpdate>();
  const [clock, setClock] = useState<string>();

  // const [previousHomeSetScore, setPreviousHomeSetScore] = useState<number[]>() //[7,6,0,7]
  // const [previousAwaySetScore, setPreviousAwaySetScore] = useState<number[]>() //[5,7,6,6]
  // const [game, setGame] = useState<number>()
  
  const [message, setMessage] = useState<string>()

  const [homeSetScore, setHomeSetScore] = useState<number>(0)
  const [awaySetScore, setAwaySetScore] = useState<number>(0)

  const [homePointScore, setHomePointScore] = useState<number>(0)
  const [awayPointScore, setAwayPointScore] = useState<number>(0)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");

    //add an event listener when connection is established
    ws.onopen = (_) => {
      console.log("WebSocket is connected3.");
      ws.send(JSON.stringify(payLoad));
    };

    //add an event listener for the message event
    ws.onmessage = ({data}: {data: string}) => {
      console.log(` Data received from server: ${data}`);
      const parsedData: MatchUpdate = JSON.parse(data)

      console.log('1. data?.events?', parsedData.events)

      if(!parsedData.events || (parsedData.events && parsedData.events.length === 0))  return;

      parsedData.events.map(event => {
        console.log('2. data?.events?', event.type)
        //format clock and setClock
        switch(event.type) {
          case MatchEventTypes.MatchCalled: 
            setMessage("Match is commencing")
            break;
          case MatchEventTypes.DecidingTeam:
            setMessage(`${event.competitor} has won the toss`)
            break;
          case MatchEventTypes.FirstServe:
            setMessage(`${event.competitor} will first serve`)
            break;
          case MatchEventTypes.MatchStarted:
            setHomePointScore(0)
            setAwayPointScore(0)
            setHomeSetScore(0)
            setAwaySetScore(0)
            setMessage("Match has started")
            break;
          case MatchEventTypes.Point: //point is only relevant to the given set
            setHomePointScore(parseInt(event.homeScore))
            setAwayPointScore(parseInt(event.awayScore))
            setMessage(`${event.competitor} has won a point. ${event.server} will serve now`)
            break;
          case MatchEventTypes.PeriodScore: //set is relevant for a given game
            setAwaySetScore(parseInt(event.homeScore))
            setHomeSetScore(parseInt(event.awayScore))
            setMessage(`Set ${event.period}, ${event.result === ResultType.ReceiverWon ? "Receiver has won the set" : "Server has won the set"}`)
            break;
          case MatchEventTypes.PeriodStart: //start of a new set
            setHomePointScore(0)
            setAwayPointScore(0)
            // if(previousAwaySetScore && previousAwaySetScore.length  === 0 && awaySetScore) {
            //   setPreviousAwaySetScore([away!])
            //   setPreviousHomeSetScore([homeSetScore!])
            // } else if(previousAwaySetScore && previousAwaySetScore.length > 1){
            //   setPreviousAwaySetScore(...previousAwaySetScore, )
            // }
            // setPreviousAwaySetScore([...awaySetScore])
            // setPreviousHomeSetScore()
            setHomeSetScore(0)
            setAwaySetScore(0)
            setMessage(`Start of ${event.periodName} Set`)

        }
      })

      setData(parsedData);
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
  }, [message, homePointScore, awayPointScore, homeSetScore, awaySetScore]);

  return (
    <div style={{display: 'flex',flexDirection: 'column', background: '#aeca22', flexWrap: 'wrap'}}>
      <div style={{alignSelf: 'center', borderWidth: 2, borderColor: 'black', borderStyle: 'dashed', margin: 20, padding:20}}> hellooos{message}</div>
      <div style={{alignSelf: 'center', display: 'flex', width: '100%'}}>
        <div style={{alignSelf: 'center', flex: 1}}>
          <p>
            SETS:
          </p>
          <div>{homeSetScore}</div>
          <div>{awaySetScore}</div>
        </div>
        <div style={{alignSelf: 'center', flex: 1}}>
          <p>
            Points:
          </p>
          <div>{homePointScore}</div>
          <div>{awayPointScore}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
