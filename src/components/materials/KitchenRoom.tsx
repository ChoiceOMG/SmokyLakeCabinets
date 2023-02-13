import React, { useState } from 'react';
import clsx from 'clsx';

type Props = {
  nextRoom: (room: string) => void;
  kitchenCount: number;
};

const KitchenRoom: React.FC<Props> = ({ nextRoom, kitchenCount }) => {
  console.log('kitchenCount', kitchenCount);
  let [vaultedCeiling, setVaultedCeiling] = useState(false);
  const wallHeightsList = ['96"', '108"', 'Other (specify)'];
  const upperCabinetsList = [
    '30" Uppers',
    '33" Uppers',
    '38" Uppers',
    '41" Uppers',
    '48" Uppers',
  ];
  return (
    <div>
      <form className="container mx-auto p-4">
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
              className="relative block w-full appearance-none rounded-3xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              className="relative block w-full appearance-none rounded-3xl border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </label>
        </div>
      </form>
      <button onClick={() => nextRoom('bathroom')}>Next Room</button>
    </div>
  );
};

export default KitchenRoom;
