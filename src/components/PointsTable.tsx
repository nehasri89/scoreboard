import React from 'react';

type PointsTableProps = {
  homeSetScore: number;
  awaySetScore: number;
  homePointScore: number;
  awayPointScore: number;
};

const styles = {
  tableContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  },
  tableContent: {
    alignSelf: 'center',
    flex: 1
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: -10
  }
};

const PointsTable = ({
  homeSetScore,
  awaySetScore,
  homePointScore,
  awayPointScore
}: PointsTableProps) => (
  <div style={styles.tableContainer}>
    <div>
      <p style={styles.text}>Sets:</p>
      <div>{homeSetScore}</div>
      <div>{awaySetScore}</div>
    </div>
    <div>
      <p style={styles.text}>Points:</p>
      <div>{homePointScore}</div>
      <div>{awayPointScore}</div>
    </div>
  </div>
);

export default PointsTable;
