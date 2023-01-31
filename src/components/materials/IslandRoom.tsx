import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  islandCount: number;
};

const IslandRoom: React.FC<Props> = ({ nextRoom, islandCount }) => {
  console.log('islandCount', islandCount);
  return (
    <div>
      <h1>Island {islandCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default IslandRoom;
