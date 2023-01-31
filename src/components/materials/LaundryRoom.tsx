import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  laundryCount: number;
};

const LaundryRoom: React.FC<Props> = ({ nextRoom, laundryCount }) => {
  console.log('laundryCount', laundryCount);
  return (
    <div>
      <h1>Laundry {laundryCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default LaundryRoom;
