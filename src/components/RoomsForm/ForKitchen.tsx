import React, { useEffect, useState, useRef } from 'react';

import Card from '@components/Card/Card';
import MultiSelect from '@components/MultiSelect/MultiSelect';
import { CSSTransition } from 'react-transition-group';
import CheckBox from '@components/inputs/CheckBox';
import type { RootState } from '~/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  newStep: (e: number) => void;
  newOption: (e: object) => void;
  checkMaterialsFinishes:
    | {
        room: { name: string; props: any; progress: number };
      }[]
    | any;
};

const ForKitchen: React.FC<Props> = ({
  checkMaterialsFinishes,
  newStep,
  newOption,
}) => {
  const [hasDiffUpLower, setHasDiffUpLower] = useState<boolean>();
  const [localClosedCeiling, setLocalClosedCeiling] = useState(false);
  const [localCrownFlat, setLocalCrownFlat] = useState(false);
  const [wallHeights, setWallHeights] = useState<Array<string>>([]);
  const [localProgress, setLocalProgress] = useState(0);
  const { formStep } = useSelector((state: RootState) => state.progressChange);
  const dispatch = useDispatch();

  // Cabinet Styles
  const [selectedGlassStyle, setSelectedGlassStyle] = useState<string>('');

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
  const [selectedPantryTall, setSelectedPantryTall] = useState<string>('');
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
  const transitionRef = useRef(null);
  const [allSelectItems, setAllSelectItems] = useState([
    '30"',
    '33"',
    '38"',
    '41"',
    '48"',
  ]);

  //Functions
  const handleClosedCeiling = (
    event: React.ChangeEvent<HTMLInputElement>,
    el: string
  ) => {
    setLocalClosedCeiling(event.target.checked);
  };
  const handleCrownFlat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalCrownFlat(event.target.checked);
  };

  //Use Effect
  useEffect(() => {
    if (checkMaterialsFinishes) {
      const propsObj = Object.values(checkMaterialsFinishes).find(
        (item: any) => item.room && item.room.name === 'kitchen'
      ) as any;
      if (propsObj?.room) {
        setLocalProgress(propsObj.room.progress);
        if (propsObj.room.props.wallHeights) {
          setWallHeights(propsObj.room.props.wallHeights);
        }
        setSelectedGlassStyle(propsObj.room.props.selectedGlassStyle);
        setSelectedPantryTall(propsObj.room.props.selectedPantryTall);
      }
    }
  }, [checkMaterialsFinishes]);

  return (
    <>
      <CSSTransition
        in={formStep === 0 && !hasDiffUpLower}
        timeout={200}
        classNames="slide"
        unmountOnExit
        ref={transitionRef}
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
                onChange={() => {
                  newStep(10);
                  newOption({ hasDiffUpLower: false });
                  setHasDiffUpLower(false);
                }}
                checked={hasDiffUpLower === false}
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
                onChange={() => {
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
            title="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
            img="/images/kitchen.jpg"
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={hasDiffUpLower === true && formStep === 0}
        timeout={200}
        classNames="slide"
        unmountOnExit
        ref={transitionRef}
      >
        <MultiSelect
          Title="Wall Heights"
          allSelectItems={allSelectItems}
          nextStep={(e) => {
            newStep(20);
            newOption({ wallHeights: e, hasDiffUpLower: true });
          }}
          wallHeights={wallHeights}
        />
      </CSSTransition>

      <CSSTransition
        in={formStep === 2}
        timeout={200}
        classNames="slide"
        unmountOnExit
        ref={transitionRef}
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
                  newStep(20);
                  newOption({ selectedGlassStyle: el.value });
                }}
              >
                <input
                  id={el.value}
                  type="radio"
                  name="GlassStyle"
                  value={el.value}
                  checked={selectedGlassStyle === el.value}
                  onChange={() => undefined}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor={el.value}
                  className=" pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                >
                  {el.value}
                </label>
                <Image
                  src={el.img}
                  className="block w-full rounded-lg"
                  alt={el.value}
                  width={200}
                  height={200}
                  layout="responsive"
                  loader={({ src }) => {
                    return src;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={formStep === 3}
        timeout={200}
        classNames="slide"
        unmountOnExit
        ref={transitionRef}
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
                onClick={() => {
                  setSelectedPantryTall(el.value);
                  newStep(30);
                  newOption({ selectedPantryTall: el.value });
                }}
              >
                <input
                  id={el.value}
                  type="radio"
                  name="PantryTall"
                  value={el.value}
                  onChange={() => undefined}
                  checked={selectedPantryTall === el.value}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor={el.value}
                  className=" pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                >
                  {el.value}
                </label>
                <Image
                  width={200}
                  height={200}
                  src={el.img}
                  className="block w-full rounded-lg"
                  alt={el.value}
                  layout="responsive"
                  loader={({ src }) => {
                    return src;
                  }}
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
