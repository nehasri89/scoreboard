import React from 'react';
import { Server } from 'mock-socket';
import { render, screen, } from '@testing-library/react';
import App from './App';

describe('App', () => {
  let websocketServer: Server;

  const initializeWebSocket = (eventsToSend: any) => {
    websocketServer.on('connection', (socket) => {
      socket.on('message', (message) => {
        if (typeof message !== 'string') {
          return;
        }
        const clock = '"2023-05-23T08:10:15.580Z';
        socket.send(JSON.stringify({ clock, events: [eventsToSend] }));
      });
    });
  };

  beforeEach(() => {
    websocketServer = new Server('ws://localhost:8081');
  });

  afterEach(() => {
    websocketServer.close();
  });
  test('Updates Scorebaord for Match Update MatchCalled', async () => {
    const eventsToSend = {
      id: '811973858',
      type: 'matchCalled',
      offset: 0
    };
    initializeWebSocket(eventsToSend);

    render(<App />);

    const message = await screen.findByText(/Match is commencing/i);
    expect(message).toBeInTheDocument();
  });

  test('Updates Scorebaord for Match Update Point', async () => {
    const eventsToSend = {
      id: '811980794',
      type: 'point',
      competitor: 'home',
      homeScore: '15',
      awayScore: '40',
      server: 'home',
      result: 'serverWon',
      offset: 866000
    };
    initializeWebSocket(eventsToSend);
    render(<App />);

    const homePointScore = await screen.findByText('40');
    expect(homePointScore).toBeInTheDocument();

    const awayPointScore = await screen.findByText('15');
    expect(awayPointScore).toBeInTheDocument();

    const message = await screen.findByText(/ServerWon has won a point./i);
    expect(message).toBeInTheDocument();
  });

  //tests for Match Update DecidingTeam

  //tests for  Match Update FirstServe

  //tests for  Match Update MatchStarted

  //tests for  Match Update PeriodScore
});
