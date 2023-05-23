import React from 'react';

type PointsTableProps = {
  homeSetScore: number;
  awaySetScore: number;
  homePointScore: number;
  awayPointScore: number;
};

const styles = {
  tableContainer: {
    alignSelf: 'center',
    display: 'flex',
    width: '100%'
  },
  tableContent: {
    alignSelf: 'center',
    flex: 1
  }
};

const PointsTable = ({
  homeSetScore,
  awaySetScore,
  homePointScore,
  awayPointScore
}: PointsTableProps) => (
  <div style={styles.tableContainer}>
    <div style={styles.tableContent}>
      <p>SETS:</p>
      <div>{homeSetScore}</div>
      <div>{awaySetScore}</div>
    </div>
    <div style={styles.tableContent}>
      <p>Points:</p>
      <div>{homePointScore}</div>
      <div>{awayPointScore}</div>
    </div>
  </div>
);

export default PointsTable;
