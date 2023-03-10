import RoomsForm from '@components/RoomsForm/RoomsForm';
import React from 'react';

type Props = {
  nextRoom: (room: string) => void;
  kitchenCount: number;
};

const KitchenRoom: React.FC<Props> = ({ nextRoom, kitchenCount }) => {
  console.log('kitchenCount', kitchenCount);

  return (
    <div>
      {/*   <RoomsForm
        nameRoom="kitchen"
        setSelectedRoom={function (): void {
          throw new Error('Function not implemented.');
        }}
        allRooms={[]}
      /> */}
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default KitchenRoom;
