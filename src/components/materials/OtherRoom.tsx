import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  otherCount: number;
};

const OtherRoom: React.FC<Props> = ({ nextRoom, otherCount }) => {
  console.log('otherCount', otherCount);
  return (
    <div>
      <h1>Other {otherCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default OtherRoom;
