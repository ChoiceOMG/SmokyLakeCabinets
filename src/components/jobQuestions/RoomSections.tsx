import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';
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
} from '~/reducer/jobQuestions';

type Props = {
  handleStepChange: (step: number) => void;
};

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
  } = useSelector((state: RootState) => state.jobQuestionsConfig);
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

  const handleKitchenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? Setktchn(1) : Setktchn(0);
  };
  const handleIslandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setIslnd(1) : setIslnd(0);
  };
  const handlePantryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setPntry(1) : setPntry(0);
  };
  const handleVanityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setVty(1) : setVty(0);
  };
  const handleEnsuiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setEnst(1) : setEnst(0);
  };
  const handleJackJillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setJckJll(1) : setJckJll(0);
  };
  const handleBasementVanityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.checked ? setBsmtVty(1) : setBsmtVty(0);
  };
  const handleMudroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setMdrm(1) : setMdrm(0);
  };
  const handleLaundryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setLdy(1) : setLdy(0);
  };
  const handleBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setBr(1) : setBr(0);
  };
  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setOthr(1) : setOthr(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
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
    dispatch(setOther(localOther));
    handleStepChange(3);
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
              <input
                type="checkbox"
                id="cabinets"
                className="absolute h-6 w-6 opacity-0"
                checked={localKitchen >= 1 ? true : false}
                onChange={handleKitchenChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localKitchen >= 1
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
                    stroke={clsx(localKitchen ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="cabinets"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Kitchen
              </label>
            </div>
            {/* Island */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="island"
                className="absolute h-6 w-6 opacity-0"
                checked={localIsland >= 1 ? true : false}
                onChange={handleIslandChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localIsland >= 1
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
                    stroke={clsx(localIsland ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="island"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Island
              </label>
            </div>
            {/* Pantry */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pantry"
                className="absolute h-6 w-6 opacity-0"
                checked={localPantry >= 1 ? true : false}
                onChange={handlePantryChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localPantry >= 1
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
                    stroke={clsx(localPantry ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="pantry"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Pantry
              </label>
            </div>
            {/* Vanity */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Vanity"
                className="absolute h-6 w-6 opacity-0"
                checked={localVanity >= 1 ? true : false}
                onChange={handleVanityChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localVanity >= 1
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
                    stroke={clsx(localVanity ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="Vanity"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Vanity
              </label>
            </div>
            {/* Ensuite */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Ensuite"
                className="absolute h-6 w-6 opacity-0"
                checked={localEnsuite >= 1 ? true : false}
                onChange={handleEnsuiteChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localEnsuite >= 1
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
                    stroke={clsx(localEnsuite ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="Ensuite"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Ensuite
              </label>
            </div>
            {/* JackJill */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="JackJill"
                className="absolute h-6 w-6 opacity-0"
                checked={localJackJill >= 1 ? true : false}
                onChange={handleJackJillChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localJackJill >= 1
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
                    stroke={clsx(localJackJill ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="JackJill"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Jack and Jill Sinks
              </label>
            </div>
            {/* BasementVanity */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="BasementVanity"
                className="absolute h-6 w-6 opacity-0"
                checked={localBasementVanity >= 1 ? true : false}
                onChange={handleBasementVanityChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localBasementVanity >= 1
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
                    stroke={clsx(localBasementVanity ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="BasementVanity"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Basement Vanity
              </label>
            </div>
            {/* Mudroom */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Mudroom"
                className="absolute h-6 w-6 opacity-0"
                checked={localMudroom >= 1 ? true : false}
                onChange={handleMudroomChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localMudroom >= 1
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
                    stroke={clsx(localMudroom ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="Mudroom"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Mudroom
              </label>
            </div>
            {/* Laundry */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Laundry"
                className="absolute h-6 w-6 opacity-0"
                checked={localLaundry >= 1 ? true : false}
                onChange={handleLaundryChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localLaundry >= 1
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
                    stroke={clsx(localLaundry ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="Laundry"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Laundry
              </label>
            </div>
            {/* Bar */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Bar"
                className="absolute h-6 w-6 opacity-0"
                checked={localBar >= 1 ? true : false}
                onChange={handleBarChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localBar >= 1
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
                    stroke={clsx(localBar ? 'white' : 'gray-200')}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <label
                htmlFor="Bar"
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Bar
              </label>
            </div>
            {/* Other */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Other"
                className="absolute h-6 w-6 opacity-0"
                checked={localOther >= 1 ? true : false}
                onChange={handleOtherChange}
              />
              <div
                className={clsx(
                  'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                  localOther >= 1
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
