import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Card from '@components/Card/Card';
type Props = {
  nextProgress: (progress: number, option?: object) => void;
  nameRoom: string;
  checkMaterialsFinishes:
    | {
        room: { name: string; props: any; progress: number };
      }[]
    | any;
};

const ForAnyRooms: React.FC<Props> = ({
  nextProgress,
  nameRoom,
  checkMaterialsFinishes,
}) => {
  const [stepCount, setStepCount] = useState(0);
  const [selectBoxMaterial, setSelectBoxMaterial] = useState('');
  const [selectHardwarePackage, setSelectHardwarePackage] = useState('');
  const [selectDrawers, setSelectDrawers] = useState('');
  const [selectHardwarePackageList, setSelectHardwarePackageList] = useState([
    {
      value: 'Standard',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      value: 'Upgraded',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
  ]);
  const [selectDrawersList, setSelectDrawersList] = useState([
    {
      value: 'Metal Drawers',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      value: 'Standard Drawers',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      value: 'Dovetail',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
  ]);
  const [selectBoxMaterialList, setSelectBoxMaterialList] = useState([
    {
      value: 'Melamine White',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      value: 'Prefinished Plywood Standard',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      value: 'Prefinished Plywood Domestic',
      img: '/images/kitchen.jpg',
      title:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
  ]);
  useEffect(() => {
    if (checkMaterialsFinishes) {
      const propsObj = Object.values(checkMaterialsFinishes).find(
        (item) => item.room && item.room.name === nameRoom
      );
      if (propsObj?.room) {
        setSelectBoxMaterial(propsObj.room.props.selectBoxMaterial);
        setSelectBoxMaterial(propsObj.room.props.selectBoxMaterial);
        setSelectDrawers(propsObj.room.props.selectDrawers);
        setSelectHardwarePackage(propsObj.room.props.selectHardwarePackage);
      }
    }
  }, [checkMaterialsFinishes]);
  useEffect(() => {
    if (nameRoom !== 'kitchen') {
      nextProgress(0);
      setStepCount(0);
    }
  }, [nameRoom]);

  const nextStep = (e: number, o?: object) => {
    nextProgress(e, o);
    setStepCount(stepCount + 1);
  };
  return (
    <>
      {/* Cabinet Styles */}
      <CSSTransition
        in={stepCount === 0}
        timeout={200}
        classNames="slide"
        unmountOnExit
      >
        <div className=" block text-left">
          <h2 className=" mb-4 block font-bold text-gray-500">
            Select Box Material
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
            {selectBoxMaterialList.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  nextStep(10, { selectBoxMaterial: item.value });
                  setSelectBoxMaterial(item.value);
                  let itemHTML: HTMLInputElement | null =
                    document.getElementById(item.value) as HTMLInputElement;
                  if (itemHTML !== null) {
                    itemHTML.checked = true;
                  }
                }}
              >
                <div className="mb-4 flex items-center">
                  <input
                    id={item.value}
                    type="radio"
                    name="selectBoxMaterial"
                    checked={selectBoxMaterial === item.value}
                    onChange={() => {}}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={item.value}
                    className="pl-2 font-normal text-gray-500"
                  >
                    {item.value}
                  </label>
                </div>
                <Card title={item.title} img={item.img} />
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
      {/* Select Hardware Package */}
      <CSSTransition
        in={stepCount === 1}
        timeout={200}
        classNames="slide"
        unmountOnExit
      >
        <div className=" block text-left">
          <h2 className=" mb-4 block font-bold text-gray-500">
            Select Hardware Package
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
            {selectHardwarePackageList.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  nextStep(10, { selectHardwarePackage: item.value });
                  setSelectHardwarePackage(item.value);
                  let itemHTML: HTMLInputElement | null =
                    document.getElementById(item.value) as HTMLInputElement;
                  if (itemHTML !== null) {
                    itemHTML.checked = true;
                  }
                }}
              >
                <div className="mb-4 flex items-center">
                  <input
                    id={item.value}
                    type="radio"
                    checked={selectHardwarePackage === item.value}
                    onChange={() => {}}
                    name="selectHardwarePackageList"
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={item.value}
                    className="pl-2 font-normal text-gray-500"
                  >
                    {item.value}
                  </label>
                </div>
                <Card title={item.title} img={item.img} />
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
      {/* Select Drawers */}
      <CSSTransition
        in={stepCount === 2}
        timeout={200}
        classNames="slide"
        unmountOnExit
      >
        <div className=" block text-left">
          <h2 className=" mb-4 block font-bold text-gray-500">
            Select Drawers
          </h2>
          <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
            {selectDrawersList.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  nextProgress(100, { selectDrawers: item.value });
                  setSelectDrawers(item.value);

                  let itemHTML: HTMLInputElement | null =
                    document.getElementById(item.value) as HTMLInputElement;
                  if (itemHTML !== null) {
                    itemHTML.checked = true;
                  }
                }}
              >
                <div className="mb-4 flex items-center">
                  <input
                    id={item.value}
                    type="radio"
                    name="selectDrawersList"
                    checked={selectDrawers === item.value}
                    onChange={() => {}}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={item.value}
                    className="pl-2 font-normal text-gray-500"
                  >
                    {item.value}
                  </label>
                </div>
                <Card title={item.title} img={item.img} />
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ForAnyRooms;
