import './App.css';
import React from 'react';
import PointsTable from './components/PointsTable';
import ScoreMessage from './components/ScoreMessage';
import ErrorBoundary from './components/ErrorBoundary';
import useWebSocketHook from './utils/useWebSocketHook';

const App = () => {
  const {
    message,
    homePointScore,
    awayPointScore,
    homeSetScore,
    awaySetScore
  } = useWebSocketHook();

  return (
    <ErrorBoundary>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#aeca22',
          flexWrap: 'wrap'
        }}
      >
        <ScoreMessage message={message} />
        <PointsTable
          homePointScore={homePointScore}
          awayPointScore={awayPointScore}
          homeSetScore={homeSetScore}
          awaySetScore={awaySetScore}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
