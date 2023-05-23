import { useState, useEffect } from 'react';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import { MatchUpdate, MatchEventTypes, ResultType } from '../types';
const payLoad = {
  cmd: 'start',
  opts: {
    speed: 60
  }
};
const useWebSocketHook = () => {
  const [message, setMessage] = useState<string>('');

  const [homeSetScore, setHomeSetScore] = useState<number>(0);
  const [awaySetScore, setAwaySetScore] = useState<number>(0);

  const [homePointScore, setHomePointScore] = useState<number>(0);
  const [awayPointScore, setAwayPointScore] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');

    //add an event listener when connection is established
    ws.onopen = (_) => {
      console.log('WebSocket is connected3.');
      ws.send(JSON.stringify(payLoad));
    };

    //add an event listener for the message event
    ws.onmessage = ({ data }: { data: string }) => {
      console.log(` Data received from server: ${data}`);
      const parsedData: MatchUpdate = JSON.parse(data);

      console.log('1. data?.events?', parsedData.events);

      if (
        !parsedData.events ||
        (parsedData.events && parsedData.events.length === 0)
      )
        return;

      parsedData.events.map((event) => {
        console.log('2. data?.events?', event.type);
        //format clock and setClock
        switch (event.type) {
          case MatchEventTypes.MatchCalled:
            setMessage('Match is commencing');
            break;
          case MatchEventTypes.DecidingTeam:
            setMessage(
              `${capitalizeFirstLetter(event.competitor)} has won the toss !`
            );
            break;
          case MatchEventTypes.FirstServe:
            setMessage(
              `${capitalizeFirstLetter(event.competitor)} will first serve`
            );
            break;
          case MatchEventTypes.MatchStarted:
            setHomePointScore(0);
            setAwayPointScore(0);
            setHomeSetScore(0);
            setAwaySetScore(0);
            setMessage('Match has started !');
            break;
          case MatchEventTypes.Point: //point is only relevant to the given set
            setHomePointScore(parseInt(event.homeScore));
            setAwayPointScore(parseInt(event.awayScore));
            setMessage(
              `${capitalizeFirstLetter(event.result)} has won a point !`
            );
            break;
          case MatchEventTypes.PeriodScore: //set is relevant for a given game
            setAwaySetScore(parseInt(event.homeScore));
            setHomeSetScore(parseInt(event.awayScore));
            setMessage(
              `Set ${event.period}, ${
                event.result === ResultType.ReceiverWon
                  ? 'Receiver has won the set !'
                  : 'Server has won the set !'
              }`
            );
            break;
          case MatchEventTypes.PeriodStart: //start of a new set
            setHomePointScore(0);
            setAwayPointScore(0);
            setHomeSetScore(0);
            setAwaySetScore(0);
            setMessage(`Start of ${event.periodName} Set`);
        }
      });
    };

    //add an event listener when error occurs
    ws.onerror = (error) => {
      console.log('WebSocket Error: ' + error);
    };

    // add an event listener when socket closes.
    ws.onclose = (event) => {
      console.log('Disconnected from WebSocket.');
    };

    //close the connection when app unmounts
    return () => ws.close();
  }, [message, homePointScore, awayPointScore, homeSetScore, awaySetScore]);

  return {
    message,
    homePointScore,
    awayPointScore,
    homeSetScore,
    awaySetScore
  };
};

export default useWebSocketHook;
