import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import MaterialsNav from '@components/materials/MaterialsNav';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';
import KitchenRoom from './KitchenRoom';
import { setMaterialsRoom } from '~/reducer/trackProgress';
import router from 'next/router';
import IslandRoom from '@components/materials/IslandRoom';
import PantryRoom from '@components/materials/PantryRoom';
import VanityRoom from '@components/materials/VanityRoom';
import EnsuiteRoom from '@components/materials/EnsuiteRoom';
import JackJillRoom from '@components/materials/JackJillRoom';
import BasementVanityRoom from '@components/materials/BasementVanityRoom';
import MudroomRoom from '@components/materials/MudRoom';
import LaundryRoom from '@components/materials/LaundryRoom';
import BarRoom from '@components/materials/BarRoom';
import OtherRoom from '@components/materials/OtherRoom';
import RoomsForm from '@components/RoomsForm/RoomsForm';

type Props = {
  handleStepChange: (step: number) => void;
};

const Materials: React.FC<Props> = ({ handleStepChange }) => {
  const dispatch = useDispatch();

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
  } = useSelector((state: RootState) => state.jobQuestionsConfig);
  const [selectedRoom, setSelectedRoom] = useState(selectedRooms[0] || '');

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
  useEffect(() => {
    dispatch(setMaterialsRoom(selectedRoom));
    console.log('setMaterialProgressStep', selectedRoom);
  }, [selectedRoom]);

  const handleNextRoom = () => {
    const currentRoomIndex = selectedRooms.indexOf(selectedRoom);
    const nextRoom = selectedRooms[currentRoomIndex + 1];

    if (nextRoom) {
      setSelectedRoom(nextRoom);
    } else {
      handleStepChange(4);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleStepChange(4);
  };

  return (
    <div className="min-w-full">
      <RoomsForm
        nameRoom={selectedRoom}
        setSelectedRoom={handleNextRoom}
        allRooms={selectedRooms}
      />
      {/* <MaterialsNav
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        rooms={rooms}
      >
        {selectedRoom === 'kitchen' && (
          <KitchenRoom nextRoom={handleNextRoom} kitchenCount={1} />
        )}
        {selectedRoom === 'island' && (
          <IslandRoom nextRoom={handleNextRoom} islandCount={1} />
        )}
        {selectedRoom === 'pantry' && (
          <PantryRoom nextRoom={handleNextRoom} pantryCount={1} />
        )}
        {selectedRoom === 'vanity' && (
          <VanityRoom nextRoom={handleNextRoom} vanityCount={1} />
        )}
        {selectedRoom === 'ensuite' && (
          <EnsuiteRoom nextRoom={handleNextRoom} ensuiteCount={1} />
        )}
        {selectedRoom === 'jackJill' && (
          <JackJillRoom nextRoom={handleNextRoom} jackJillCount={1} />
        )}
        {selectedRoom === 'basementVanity' && (
          <BasementVanityRoom
            nextRoom={handleNextRoom}
            basementVanityCount={1}
          />
        )}
        {selectedRoom === 'mudroom' && (
          <MudroomRoom nextRoom={handleNextRoom} mudroomCount={1} />
        )}
        {selectedRoom === 'laundry' && (
          <LaundryRoom nextRoom={handleNextRoom} laundryCount={1} />
        )}
        {selectedRoom === 'bar' && (
          <BarRoom nextRoom={handleNextRoom} barCount={1} />
        )}
        {selectedRoom === 'other' && (
          <OtherRoom nextRoom={handleNextRoom} otherCount={1} />
        )}
      </MaterialsNav> */}
    </div>
  );
};

export default Materials;
