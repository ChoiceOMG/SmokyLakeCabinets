import React, { useState } from 'react';

type Props = {
  nextRoom: (room: string) => void;
  ensuiteCount: number;
};

const EnsuiteRoom: React.FC<Props> = ({ nextRoom, ensuiteCount }) => {
  console.log('ensuiteCount', ensuiteCount);
  return (
    <div>
      <h1>Ensuite {ensuiteCount}</h1>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default EnsuiteRoom;
