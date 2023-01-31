import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  mudroomCount: number;
};

const MudroomRoom: React.FC<Props> = ({ nextRoom, mudroomCount }) => {
  console.log('mudroomCount', mudroomCount);
  return (
    <div>
      <h1>Mudroom {mudroomCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default MudroomRoom;
