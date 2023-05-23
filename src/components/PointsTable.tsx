import React from 'react'

type PointsTableProps = {
    homeSetScore: number; awaySetScore: number; homePointScore: number; awayPointScore: number;
}

const PointsTable = ({homeSetScore, awaySetScore, homePointScore, awayPointScore}:PointsTableProps) => (      
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
</div>)

export default PointsTable