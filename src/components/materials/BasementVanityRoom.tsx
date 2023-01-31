import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  basementVanityCount: number;
};

const BasementVanityRoom: React.FC<Props> = ({
  nextRoom,
  basementVanityCount,
}) => {
  console.log('basementVanityCount', basementVanityCount);
  return (
    <div>
      <h1>BasementVanity {basementVanityCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default BasementVanityRoom;
