import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  barCount: number;
};

const BarRoom: React.FC<Props> = ({ nextRoom, barCount }) => {
  console.log('barCount', barCount);
  return (
    <div>
      <h1>Bar {barCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default BarRoom;
