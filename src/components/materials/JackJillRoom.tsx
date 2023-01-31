import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  jackJillCount: number;
};

const JackJillRoom: React.FC<Props> = ({ nextRoom, jackJillCount }) => {
  console.log('jackJillCount', jackJillCount);
  return (
    <div>
      <h1>JackJill {jackJillCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default JackJillRoom;
