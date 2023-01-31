import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  pantryCount: number;
};

const PantryRoom: React.FC<Props> = ({ nextRoom, pantryCount }) => {
  console.log('pantryCount', pantryCount);
  return (
    <div>
      <h1>Pantry {pantryCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default PantryRoom;
