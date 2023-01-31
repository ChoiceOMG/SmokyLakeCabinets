import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  vanityCount: number;
};

const VanityRoom: React.FC<Props> = ({ nextRoom, vanityCount }) => {
  console.log('vanityCount', vanityCount);
  return (
    <div>
      <h1>Vanity {vanityCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default VanityRoom;
