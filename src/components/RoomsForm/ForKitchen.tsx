import React, { useState, useRef } from 'react';

import Card from '@components/Card/Card';
import MultiSelect from '@components/MultiSelect/MultiSelect';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type PropsKitchen = {
  nextProgress: (progress: number) => void;
};

const ForKitchen: React.FC<PropsKitchen> = ({ nextProgress }) => {
  const [hasDiffUpLower, setHasDiffUpLower] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const nodeRef = useRef(null);

  const [glassStyleList, setGlassStyleList] = useState([
    'Clear',
    'Frosted',
    'Etched',
    'Patterned',
    'Tinted',
    'Other',
  ]);
  const [allSelectItems, setAllSelectItems] = useState([
    '30"',
    '33"',
    '38"',
    '41"',
    '48"',
  ]);
  const nextStep = () => {
    nextProgress(10);
    setStepCount(stepCount + 1);
    setHasDiffUpLower(false);
    console.log(stepCount);
  };
  return (
    <>
      {stepCount === 0 && !hasDiffUpLower && (
        <CSSTransition
          in={stepCount === 0}
          timeout={1000}
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
                    nextStep();
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
            <Card />
          </div>
        </CSSTransition>
      )}
      {hasDiffUpLower && (
        <MultiSelect
          Title="Wall Heights"
          allSelectItems={allSelectItems}
          nextStep={nextStep}
        />
      )}

      <CSSTransition
        in={stepCount === 1}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div>
          {/* Glass Style */}
          <h2 className=" mb-4 block font-bold text-gray-500 ">Glass Style</h2>
          <div className="grid grid-cols-3 items-center gap-5">
            {glassStyleList.map((el, i) => (
              <div className="flex items-center px-2" key={i}>
                <input
                  id={el}
                  type="radio"
                  name="GlassStyle"
                  value={el}
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
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ForKitchen;
