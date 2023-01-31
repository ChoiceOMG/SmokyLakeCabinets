import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  kitchenCount: number;
};

const KitchenRoom: React.FC<Props> = ({ nextRoom, kitchenCount }) => {
  console.log('kitchenCount', kitchenCount);
  return (
    <div>
      <h1>Kitchen {kitchenCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default KitchenRoom;
