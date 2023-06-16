import React from 'react';
import { motion } from 'framer-motion';
import Card from '@components/Card/Card';
import { HardwarePackage } from '@prisma/client';
import { Question } from '@utils/types';
import Editor from '@components/RoomsForm/Slides/Editor';

type HardwarePackageSlideProps = {
  selectHardwarePackageList: Array<HardwarePackage>;
  selectHardwarePackage: string;
  direction: number;
  setSelectHardwarePackage: (e: string) => void;
  answers: (q: string, a: any) => void;
    saveChanges: (e:Question[], m: string) => void;
  editingMode: boolean
};

const HardwarePackageSlide: React.FC<HardwarePackageSlideProps> = ({
  selectHardwarePackageList,
  selectHardwarePackage,
  answers,
  setSelectHardwarePackage,
  editingMode,
  saveChanges,
  direction
}) => {
  return (
    <motion.div
      className="slide"
      key="SelectHardwarePackage"
      initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute'  }}
      transition={{ duration: 0.2 }}
    >
      <div className="block text-left">
        <h2 className="mb-4 block font-bold text-gray-500">Select Hardware Package</h2>
        {editingMode ? (
        <Editor
          saveChanges = {saveChanges}
            List={selectHardwarePackageList}
            mode='hardwarePackages'
        />
      ) : (
        <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
          {selectHardwarePackageList.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => {
                setSelectHardwarePackage(item.value);
                answers("hardwarePackages", item.value);
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id={item.value}
                  type="radio"
                  name="hardwarePackages"
                  checked={selectHardwarePackage === item.value}
                  onChange={() => undefined}
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
      )}
      </div>
    </motion.div>
  );
};

export default HardwarePackageSlide;
