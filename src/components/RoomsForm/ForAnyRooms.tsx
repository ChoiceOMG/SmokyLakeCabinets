import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Card from '@components/Card/Card';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store';

type Props = {
  newStep: (e: number) => void;
  newOption: (e: object) => void;
  nameRoom: string;
  checkMaterialsFinishes:
    | {
        room: { name: string; props: any; progress: number };
      }[]
    | any;
};

const ForAnyRooms: React.FC<Props> = ({
  newStep,
  newOption,
  nameRoom,
  checkMaterialsFinishes,
}) => {
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

  const { formStep } = useSelector((state: RootState) => state.progressChange);

  useEffect(() => {
    if (checkMaterialsFinishes) {
      const propsObj = Object.values(checkMaterialsFinishes).find(
        (item: any) => item.room && item.room.name === nameRoom
      ) as any;
      if (propsObj?.room) {
        setSelectBoxMaterial(propsObj.room.props.selectBoxMaterial);
        setSelectBoxMaterial(propsObj.room.props.selectBoxMaterial);
        setSelectDrawers(propsObj.room.props.selectDrawers);
        setSelectHardwarePackage(propsObj.room.props.selectHardwarePackage);
      }
    }
  }, [checkMaterialsFinishes]);

  return (
    <>
      {/* Cabinet Styles */}
      <CSSTransition
        in={formStep === 0}
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
                  newStep(10);
                  newOption({ selectBoxMaterial: item.value });
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
        in={formStep === 1}
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
                  newStep(10);
                  newOption({ selectHardwarePackage: item.value });
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
        in={formStep === 2}
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
                  newStep(100);
                  newOption({ selectDrawers: item.value });
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
