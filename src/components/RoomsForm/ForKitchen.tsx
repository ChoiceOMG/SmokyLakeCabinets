import React, { useEffect, useState } from 'react';

import Card from '@components/Card/Card';
import MultiSelect from '@components/MultiSelect/MultiSelect';
import { CSSTransition } from 'react-transition-group';
import CheckBox from '@components/inputs/CheckBox';
type Props = {
  nextProgress: (progress: number) => void;
};

const ForKitchen: React.FC<Props> = ({ nextProgress }) => {
  const [hasDiffUpLower, setHasDiffUpLower] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [localClosedCeiling, setLocalClosedCeiling] = useState(false);
  const [localCrownFlat, setLocalCrownFlat] = useState(false);

  const handleClosedCeiling = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalClosedCeiling(event.target.checked);
  };
  const handleCrownFlat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalCrownFlat(event.target.checked);
  };
  const [selectedGlassStyle, setSelectedGlassStyle] = useState('');

  const [glassStyleList, setGlassStyleList] = useState([
    {
      value: 'Clear',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Frosted',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Etched',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Patterned',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Tinted',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Other',
      img: '/images/kitchen.jpg',
    },
  ]);
  //Pantry\Tall
  const [selectedPantryTall, setSelectedPantryTall] = useState('');
  const [pantryTallList, setPantryTallList] = useState([
    {
      value: '1',
      img: '/images/kitchen.jpg',
    },
    {
      value: '2',
      img: '/images/kitchen.jpg',
    },
    {
      value: '3',
      img: '/images/kitchen.jpg',
    },
    {
      value: '4',
      img: '/images/kitchen.jpg',
    },
    {
      value: '5',
      img: '/images/kitchen.jpg',
    },
    {
      value: '6',
      img: '/images/kitchen.jpg',
    },
  ]);

  useEffect(() => {
    if (stepCount === 0 && !hasDiffUpLower) {
      nextProgress(0);
    }
  }, [stepCount]);

  const [allSelectItems, setAllSelectItems] = useState([
    '30"',
    '33"',
    '38"',
    '41"',
    '48"',
  ]);
  const nextStep = (e: number) => {
    nextProgress(e);
    setStepCount(stepCount + 1);
  };
  return (
    <>
      <CSSTransition
        in={stepCount === 0 && !hasDiffUpLower}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div className="grid grid-cols-2 grid-rows-1 items-center gap-5">
          {/* Cabinet Styles */}
          <label className=" block text-left">
            <h2 className=" mb-4 block font-bold text-gray-500">
              Cabinet Styles
            </h2>

            <div className="align-center relative items-center">
              <input
                id="Other"
                type="radio"
                name="CabinetStyles"
                className="h-4 w-4 cursor-pointer"
                onClick={() => {
                  nextStep(10);
                }}
              />
              <label
                htmlFor="CabinetStyles"
                className="pl-2 font-normal text-gray-500"
              >
                No, upper and lower cabinets will be the same
              </label>
            </div>
            <div className="align-center relative flex items-center ">
              <input
                id="Other"
                type="radio"
                name="CabinetStyles"
                className="h-4 w-4 cursor-pointer"
                checked={hasDiffUpLower === true}
                onClick={() => {
                  setHasDiffUpLower(true);
                }}
              />
              <label
                htmlFor="CabinetStyles"
                className="pl-2 font-normal text-gray-500"
              >
                Yes, I will have different style Fronts Upper & Lower (Kitchen
                only)
              </label>
            </div>
          </label>
          <Card
            title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
            img="/images/kitchen.jpg"
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={hasDiffUpLower}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <MultiSelect
          Title="Wall Heights"
          allSelectItems={allSelectItems}
          nextStep={() => {
            nextStep(20);
            setHasDiffUpLower(false);
          }}
        />
      </CSSTransition>

      <CSSTransition
        in={stepCount === 1}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div>
          {/* Glass Style */}
          <h2 className=" mb-4 block text-left font-bold text-gray-500 ">
            Glass Style
          </h2>
          <div className="grid grid-cols-3 items-center gap-5">
            {glassStyleList.map((el, i) => (
              <div
                className="flex max-w-sm cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                key={i}
                onClick={() => {
                  setSelectedGlassStyle(el.value);
                  nextStep(40);
                }}
              >
                <input
                  id={el.value}
                  type="radio"
                  name="GlassStyle"
                  value={el.value}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor={el.value}
                  className=" pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                >
                  {el.value}
                </label>
                <img
                  src={el.img}
                  className="block w-full rounded-lg"
                  alt={el.value}
                />
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={stepCount === 2}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div>
          {/* Pantry\Tall */}
          <h2 className=" mb-4 block text-left font-bold text-gray-500 ">
            Pantry\Tall
          </h2>
          <div className="grid grid-cols-3 items-center gap-5">
            {pantryTallList.map((el, i) => (
              <div
                className="flex max-w-sm cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                key={i}
                onClick={(e) => {
                  setSelectedPantryTall(el.value);
                  nextProgress(100);
                  const checkbox = document.getElementById(
                    el.value
                  ) as HTMLInputElement;
                  if (checkbox !== null) {
                    checkbox.checked = true;
                  }
                }}
              >
                <input
                  id={el.value}
                  type="radio"
                  name="GlassStyle"
                  value={el.value}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor={el.value}
                  className=" pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                >
                  {el.value}
                </label>
                <img
                  src={el.img}
                  className="block w-full rounded-lg"
                  alt={el.value}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center">
            <CheckBox
              id="ClosedCeiling"
              checkedBox={localClosedCeiling}
              onChangeBox={handleClosedCeiling}
            />

            <label
              htmlFor="ClosedCeiling"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Closed Ceiling
            </label>
          </div>
          <div className="flex items-center">
            <CheckBox
              id="CrownFlat"
              checkedBox={localCrownFlat}
              onChangeBox={handleCrownFlat}
            />

            <label
              htmlFor="CrownFlat"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Crown/Flat
            </label>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ForKitchen;
