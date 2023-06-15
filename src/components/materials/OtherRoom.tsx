import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store';
type Props = {
  nextRoom: (room: string) => void;
  otherCount: number;
};

const OtherRoom: React.FC<Props> = ({ nextRoom, otherCount }) => {
  console.log('otherCount', otherCount);
  const { hasOther } = useSelector(
    (state: RootState) => state.jobQuestions
  );
  return (
    <div>
      {Object.values(hasOther).map((e, i) => (
        <p key={i}>
          Other {i + 1} : {e.value}
        </p>
      ))}
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default OtherRoom;
