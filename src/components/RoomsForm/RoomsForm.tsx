import React, { useState } from 'react';
import clsx from 'clsx';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import ForKitchen from '@components/RoomsForm/ForKitchen';
type Props = {
  nameRoom: string;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
  allRooms: string[];
};
type ProgressState = number;

const RoomsForm: React.FC<Props> = ({
  nameRoom,
  setSelectedRoom,
  allRooms,
}) => {
  let [vaultedCeiling, setVaultedCeiling] = useState(false);
  let [progress, setProgress]: [
    ProgressState,
    React.Dispatch<React.SetStateAction<ProgressState>>
  ] = useState(0);
  const wallHeightsList = ['96"', '108"'];
  const upperCabinetsList = [
    '30" Uppers',
    '33" Uppers',
    '38" Uppers',
    '41" Uppers',
    '48" Uppers',
  ];

  const [selectedWallHeights, setselectedWallHeights] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedWallHeights(event.target.value);
  };
  const nextProgress = (e: number) => {
    setProgress(progress + e);
  };
  return (
    <form className="container mx-auto p-4">
      <ProgressBar progressPercentage={progress} />
      {nameRoom === 'kitchen' ? (
        <ForKitchen nextProgress={nextProgress} />
      ) : (
        <div className="grid grid-cols-6 items-center gap-6">
          {/*  Wall Heights */}
          <label className="col-span-6 block sm:col-span-3">
            <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
              Wall Heights:
            </span>

            <fieldset id="WallHeights" className="flex">
              {wallHeightsList.map((el, i) => (
                <div className="flex items-center px-2" key={i}>
                  <input
                    id={el}
                    type="radio"
                    name="WallHeights"
                    value={el}
                    className="h-4 w-4 cursor-pointer"
                    checked={selectedWallHeights === el}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor={el}
                    className="pl-2 text-sm font-bold text-gray-500"
                  >
                    {el}
                  </label>
                </div>
              ))}
              <div className="relative flex items-center px-2">
                <input
                  id="Other"
                  type="radio"
                  value="Other"
                  name="WallHeights"
                  className="h-4 w-4 cursor-pointer"
                  checked={selectedWallHeights === 'Other'}
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor="Other"
                  className="pl-2 text-sm font-bold text-gray-500"
                >
                  Other (specify)
                </label>
                {selectedWallHeights === 'Other' && (
                  <input
                    id="Other"
                    name="other-number"
                    type="number"
                    required
                    className="ml-3 block appearance-none rounded-full border border-gray-200 bg-white px-3 py-2 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                  />
                )}
              </div>
            </fieldset>
          </label>

          {/* Vaulted Ceiling */}

          <label className="col-span-6 block sm:col-span-3">
            <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
              Vaulted ceiling:
            </span>

            <div
              className={clsx(
                ' flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                vaultedCeiling
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200  bg-gray-100'
              )}
            >
              <input
                type="checkbox"
                id="vaultedCeiling"
                className=" h-4 w-4 cursor-pointer	"
                checked={vaultedCeiling}
                onChange={() =>
                  setVaultedCeiling((vaultedCeiling = !vaultedCeiling))
                }
              />
            </div>
          </label>
          {/*  Upper Cabinet Height */}
          <label className="col-span-6 block sm:col-span-3">
            <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
              Upper Cabinet Height:
            </span>

            <fieldset id="upperCabinetHeight" className="flex">
              {upperCabinetsList.map((el, i) => (
                <div className="flex items-center px-2" key={i}>
                  <input
                    id={el}
                    type="radio"
                    name="upperCabinetHeight"
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={el}
                    className="pl-2 text-sm font-bold text-gray-500"
                  >
                    {el}
                  </label>
                </div>
              ))}
            </fieldset>
          </label>
          {/* Rooms in Project */}
          <label className="col-span-6 block sm:col-span-3">
            <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
              Rooms in Project
            </span>

            <input
              id="rooms-project"
              name="text"
              type="text"
              required
              className="relative block w-full appearance-none rounded-full border border-gray-200 bg-white px-3 py-2 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
            />
          </label>
          <label className="col-span-6 block sm:col-span-3">
            <span className=" mb-2 block text-left text-sm font-bold text-gray-500">
              Do you want to look at finishes Section
            </span>

            <input
              id="finishes-Section"
              name="text"
              type="text"
              required
              className="relative block w-full appearance-none rounded-full border border-gray-200 bg-white px-3 py-2 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
            />
          </label>
        </div>
      )}

      {/* Footer form */}
      <div className="mt-5 flex	items-center justify-between">
        <button
          className={`block w-1/5 rounded-full  px-8 py-3.5 text-center text-base font-bold text-white  ${
            progress < 100
              ? 'bg-gray-500'
              : 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200'
          }`}
          type="button"
          onClick={() => setSelectedRoom(nameRoom)}
          disabled={progress < 100 && true}
        >
          Next Room
        </button>
        <div className="flex h-fit justify-between gap-5">
          {allRooms.map((el, i) => (
            <span className="capitalize">{el}</span>
          ))}
        </div>
      </div>
    </form>
  );
};

export default RoomsForm;
