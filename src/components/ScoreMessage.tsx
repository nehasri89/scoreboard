import React from 'react';

const commonStyle = {
  alignSelf: 'center',
  borderWidth: 2,
  borderColor: 'black',
  borderStyle: 'double',
  margin: 20,
  padding: 20
};
const styles = {
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
