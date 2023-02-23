import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Card from '@components/Card/Card';
type Props = {
  nextProgress: (progress: number) => void;
};

const ForAnyRooms: React.FC<Props> = ({ nextProgress }) => {
  const [stepCount, setStepCount] = useState(0);
  const [selectBoxMaterial, setSelectBoxMaterial] = useState('');
  const [selectHardwarePackage, setSelectHardwarePackage] = useState('');
  const [selectDrawers, setSelectDrawers] = useState('');
  useEffect(() => {
    if (stepCount === 0) {
      nextProgress(0);
    }
  }, [stepCount]);
  const nextStep = (e: number) => {
    nextProgress(e);
    setStepCount(stepCount + 1);
  };
  return (
    <>
      {/* Cabinet Styles */}
      <CSSTransition
        in={stepCount === 0}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div className=" block text-left">
          <h2 className=" mb-4 block font-bold text-gray-500">
            Select Box Material
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
            <div
              className="cursor-pointer"
              onClick={() => {
                nextStep(10);
                setSelectBoxMaterial('Melamine White');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="MelamineWhite"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="MelamineWhite"
                  className="pl-2 font-normal text-gray-500"
                >
                  Melamine White
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                nextStep(10);
                setSelectBoxMaterial('Prefinished Plywood Standard');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="PrefinishedPlywoodStandard"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="PrefinishedPlywoodStandard"
                  className="pl-2 font-normal text-gray-500"
                >
                  Prefinished Plywood Standard
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                nextStep(10);
                setSelectBoxMaterial('Prefinished Plywood Domestic');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="PrefinishedPlywoodDomestic"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="PrefinishedPlywoodDomestic"
                  className="pl-2 font-normal text-gray-500"
                >
                  Prefinished Plywood Domestic
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
          </div>
        </div>
      </CSSTransition>
      {/* Select Hardware Package */}
      <CSSTransition
        in={stepCount === 1}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div className=" block text-left">
          <h2 className=" mb-4 block font-bold text-gray-500">
            Select Hardware Package
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
            <div
              className="cursor-pointer"
              onClick={() => {
                nextStep(10);
                setSelectHardwarePackage('Standard');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="Standard"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="Standard"
                  className="pl-2 font-normal text-gray-500"
                >
                  Standard
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                nextStep(10);
                setSelectHardwarePackage('Upgraded');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="Upgraded"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="Upgraded"
                  className="pl-2 font-normal text-gray-500"
                >
                  Upgraded
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
          </div>
        </div>
      </CSSTransition>
      {/* Select Drawers */}
      <CSSTransition
        in={stepCount === 2}
        timeout={700}
        classNames="slide"
        unmountOnExit
      >
        <div className=" block text-left">
          <h2 className=" mb-4 block font-bold text-gray-500">
            Select Drawers
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
            <div
              className="cursor-pointer"
              onClick={() => {
                nextProgress(100);
                setSelectDrawers('Metal Drawers');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="MetalDrawers"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="MetalDrawers"
                  className="pl-2 font-normal text-gray-500"
                >
                  Metal Drawers
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                nextProgress(100);
                setSelectDrawers('Standard Drawers');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="StandardDrawers"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="StandardDrawers"
                  className="pl-2 font-normal text-gray-500"
                >
                  Standard Drawers
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                nextProgress(100);
                const otherCheckbox = document.getElementById(
                  'Other'
                ) as HTMLInputElement;
                if (otherCheckbox !== null) {
                  otherCheckbox.checked = true;
                }
                setSelectDrawers('Dovetail');
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id="Other"
                  type="radio"
                  name="Dovetail"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="Dovetail"
                  className="pl-2 font-normal text-gray-500"
                >
                  Dovetail
                </label>
              </div>
              <Card
                title="Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order."
                img="/images/kitchen.jpg"
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ForAnyRooms;
