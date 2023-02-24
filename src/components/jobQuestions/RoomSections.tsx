import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';

import { FaPlusCircle } from 'react-icons/fa';
import {
  addMaterialsFinishes,
  deleteFinishes,
} from '~/reducer/materialsFinishes';
import {
  setKitchen,
  setIsland,
  setPantry,
  setVanity,
  setEnsuite,
  setJackJill,
  setBasementVanity,
  setMudroom,
  setLaundry,
  setBar,
  setOther,
  setSelectedRooms,
} from '~/reducer/jobQuestions';
import CheckBox from '@components/inputs/CheckBox';

type Props = {
  handleStepChange: (step: number) => void;
};
interface InputsState {
  value: string;
}
const RoomSections: React.FC<Props> = ({ handleStepChange }) => {
  const dispatch = useDispatch();
  const {
    hasKitchen,
    hasIsland,
    hasPantry,
    hasVanity,
    hasEnsuite,
    hasJackJill,
    hasBasementVanity,
    hasMudroom,
    hasLaundry,
    hasBar,
    hasOther,
    finishQ,
  } = useSelector((state: RootState) => state.jobQuestionsConfig);
  const { materialsFinishes } = useSelector(
    (state: any) => state.materialsFinishesReducer
  );
  const [localKitchen, Setktchn] = useState(hasKitchen);
  const [localIsland, setIslnd] = useState(hasIsland);
  const [localPantry, setPntry] = useState(hasPantry);
  const [localVanity, setVty] = useState(hasVanity);
  const [localEnsuite, setEnst] = useState(hasEnsuite);
  const [localJackJill, setJckJll] = useState(hasJackJill);
  const [localBasementVanity, setBsmtVty] = useState(hasBasementVanity);
  const [localMudroom, setMdrm] = useState(hasMudroom);
  const [localLaundry, setLdy] = useState(hasLaundry);
  const [localBar, setBr] = useState(hasBar);
  const [localOther, setOthr] = useState(hasOther);
  const [addOther, setAddOther] = useState<InputsState[]>([]);

  const handleKitchenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    Setktchn(event.target.checked);
  };
  const handleIslandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIslnd(event.target.checked);
  };
  const handlePantryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPntry(event.target.checked);
  };
  const handleVanityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVty(event.target.checked);
  };
  const handleEnsuiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnst(event.target.checked);
  };
  const handleJackJillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJckJll(event.target.checked);
  };
  const handleBasementVanityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBsmtVty(event.target.checked);
  };
  const handleMudroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMdrm(event.target.checked);
  };
  const handleLaundryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLdy(event.target.checked);
  };
  const handleBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBr(event.target.checked);
  };
  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setAddOther([...addOther, { value: '' }])
      : setAddOther([]);
  };

  const updateValue = (index: number, newValue: string) => {
    setAddOther(
      addOther.map((input, i) => {
        if (i === index) {
          return {
            ...input,
            value: newValue,
          };
        }
        return input;
      })
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    const selectedRooms = [
      !!localKitchen && 'kitchen',
      !!localIsland && 'island',
      !!localPantry && 'pantry',
      !!localVanity && 'vanity',
      !!localEnsuite && 'ensuite',
      !!localJackJill && 'jackJill',
      !!localBasementVanity && 'basementVanity',
      !!localMudroom && 'mudroom',
      !!localLaundry && 'laundry',
      !!localBar && 'bar',
    ].filter(Boolean);
    if (addOther.length > 0) {
      for (let i = 0; i < addOther.length; i++) {
        if (addOther[i] !== undefined) {
          const otherName = addOther[i]?.value as string;
          if (otherName !== '') {
            selectedRooms.push(otherName);
          }
        }
      }
    }
    console.log(Object.keys(addOther));
    event.preventDefault();
    dispatch(setKitchen(localKitchen));
    dispatch(setIsland(localIsland));
    dispatch(setPantry(localPantry));
    dispatch(setVanity(localVanity));
    dispatch(setEnsuite(localEnsuite));
    dispatch(setJackJill(localJackJill));
    dispatch(setBasementVanity(localBasementVanity));
    dispatch(setMudroom(localMudroom));
    dispatch(setLaundry(localLaundry));
    dispatch(setBar(localBar));
    dispatch(setOther(addOther));
    dispatch(setSelectedRooms(selectedRooms as string[]));
    finishQ ? handleStepChange(4) : handleStepChange(3);
    dispatch(deleteFinishes());

    selectedRooms.map((room) => {
      const roomString = typeof room === 'string' ? room : String(room);
      dispatch(addMaterialsFinishes(roomString, []));
    });

    // handleStepChange(3);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="-m-3 flex flex-col">
        <div className="w-full p-3">
          <p className="mb-2 block text-left text-sm font-bold text-gray-500">
            Check items to include in your plan:
          </p>

          <div className="grid grid-cols-2">
            {/* Kitchen */}
            <div className="flex items-center">
              <CheckBox
                id="kitchen"
                checkedBox={localKitchen}
                onChangeBox={handleKitchenChange}
              />
              <label
                htmlFor="kitchen"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Kitchen
              </label>
            </div>
            {/* Island */}
            <div className="flex items-center">
              <CheckBox
                id="island"
                checkedBox={localIsland}
                onChangeBox={handleIslandChange}
              />

              <label
                htmlFor="island"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Island
              </label>
            </div>
            {/* Pantry */}
            <div className="flex items-center">
              <CheckBox
                id="pantry"
                checkedBox={localPantry}
                onChangeBox={handlePantryChange}
              />

              <label
                htmlFor="pantry"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Pantry
              </label>
            </div>
            {/* Vanity */}
            <div className="flex items-center">
              <CheckBox
                id="vanity"
                checkedBox={localVanity}
                onChangeBox={handleVanityChange}
              />

              <label
                htmlFor="Vanity"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Vanity
              </label>
            </div>
            {/* Ensuite */}
            <div className="flex items-center">
              <CheckBox
                id="Ensuite"
                checkedBox={localEnsuite}
                onChangeBox={handleEnsuiteChange}
              />

              <label
                htmlFor="Ensuite"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Ensuite
              </label>
            </div>
            {/* JackJill */}
            <div className="flex items-center">
              <CheckBox
                id="JackJill"
                checkedBox={localJackJill}
                onChangeBox={handleJackJillChange}
              />

              <label
                htmlFor="JackJill"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Jack and Jill Sinks
              </label>
            </div>
            {/* BasementVanity */}
            <div className="flex items-center">
              <CheckBox
                id="BasementVanity"
                checkedBox={localBasementVanity}
                onChangeBox={handleBasementVanityChange}
              />

              <label
                htmlFor="BasementVanity"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Basement Vanity
              </label>
            </div>
            {/* Mudroom */}
            <div className="flex items-center">
              <CheckBox
                id="Mudroom"
                checkedBox={localMudroom}
                onChangeBox={handleMudroomChange}
              />

              <label
                htmlFor="Mudroom"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Mudroom
              </label>
            </div>
            {/* Laundry */}
            <div className="flex items-center">
              <CheckBox
                id="Laundry"
                checkedBox={localLaundry}
                onChangeBox={handleLaundryChange}
              />

              <label
                htmlFor="Laundry"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Laundry
              </label>
            </div>
            {/* Bar */}
            <div className="flex items-center">
              <CheckBox
                id="Bar"
                checkedBox={localBar}
                onChangeBox={handleBarChange}
              />

              <label
                htmlFor="Bar"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Bar
              </label>
            </div>
            {/* Other */}
            <div className="relative flex flex-wrap items-center">
              <input
                type="checkbox"
                id="Other"
                className="absolute top-0 top-5 h-6 w-6 cursor-pointer opacity-0"
                checked={Object.keys(addOther).length > 0 ? true : false}
                onChange={handleOtherChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',

                  Object.keys(addOther).length > 0
                    ? 'bg-blue-500 text-white'
                    : 'border border-gray-200  bg-gray-100'
                )}
              >
                <svg
                  width="9"
                  height="7"
                  viewBox="0 0 9 7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.603516 3.77075L2.68685 5.85409L7.89518 0.645752"
                    stroke={clsx(localOther ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="Other"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Other
              </label>
              {addOther.length > 0 && (
                <FaPlusCircle
                  className="absolute left-1/3 top-5 cursor-pointer fill-blue-500 hover:fill-blue-600"
                  onClick={() => setAddOther([...addOther, { value: '' }])}
                />
              )}
              {addOther &&
                addOther.map((input, index) => (
                  <input
                    className="mb-3 ml-5 w-full appearance-none rounded-full border border-gray-200 bg-white px-3 py-2 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                    key={index}
                    onChange={(e) => updateValue(index, e.target.value)}
                    value={input.value}
                    placeholder={`Other ${index + 1}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 md:px-16"
      >
        Save and Continue
      </button>
    </form>
  );
};

export default RoomSections;
