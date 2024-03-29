import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';
import { useRouter } from 'next/router';

import RoomsForm from '@components/RoomsForm/RoomsForm';

type Props = {
  handleStepChange: (step: number) => void;
};

const Materials: React.FC<Props> = ({ handleStepChange }) => {
  const {
    hasBar,
    hasBasementVanity,
    hasEnsuite,
    hasIsland,
    hasJackJill,
    hasKitchen,
    hasLaundry,
    hasMudroom,
    hasOther,
    selectedRooms,
    hasPantry,
    hasVanity,
  } = useSelector((state: RootState) => state.jobQuestions);
  const [selectedRoom, setSelectedRoom] = useState<string>(
    selectedRooms[0] || ''
  );
  const router = useRouter();

  const roomCount = {
    kitchen: hasKitchen,
    island: hasIsland,
    pantry: hasPantry,
    bar: hasBar,
    laundry: hasLaundry,
    mudroom: hasMudroom,
    ensuite: hasEnsuite,
    jackJill: hasJackJill,
    vanity: hasVanity,
    basementVanity: hasBasementVanity,
    other: hasOther,
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const regex = /&room=([^&]+)/;
      const match = url.match(regex);
      const newUrl = match && match[1];

      if (newUrl) {
        setSelectedRoom(newUrl);
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      router.push({
        query: {
          ...router.query,
          room: selectedRoom,
        },
      });
    } else {
      handleStepChange(4);
    }
  }, [selectedRoom]);



  return (
    <div className="min-w-full">
      <RoomsForm
        nameRoom={selectedRoom}
        handleStepChange={(e)=>handleStepChange(e)}
        setUDPLink={(e) => setSelectedRoom(e)}
        allRooms={selectedRooms}
      />
    </div>
  );
};

export default Materials;
