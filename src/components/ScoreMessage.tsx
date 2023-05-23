import React from 'react';

const styles = {
  message: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    margin: 20,
    padding: 20
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
    {clock && <div style={styles.message}> Clock: {clock}</div>}

    <div style={styles.message}> Updates: {message}</div>
  </>
);

export default ScoreMessage;
