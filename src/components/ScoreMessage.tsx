import React from 'react';

const commonStyle = {
  alignSelf: 'center',
  borderWidth: 2,
  borderColor: 'black',
  borderStyle: 'dashed',
  margin: 20,
  padding: 20
};
const styles = {
  commonStyle: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    margin: 20,
    padding: 20
  },
  clock: {
    ...commonStyle,
    background: 'grey'
  },
  message: {
    ...commonStyle,
    background: '#8ac79d'
  }
};

const ScoreMessage = ({
  message,
  clock
}: {
  message: string;
  clock: string | undefined;
}) => (
  <>
    {clock && <div style={styles.clock}> Clock: {clock}</div>}

    <div style={styles.message}> Updates: {message}</div>
  </>
);

export default ScoreMessage;
