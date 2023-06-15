import React from 'react';
import { motion } from 'framer-motion';
import Card from '@components/Card/Card';
import { Drawer } from '@prisma/client';
import Editor from '@components/RoomsForm/Slides/Editor';
import { Question } from '@utils/types';

type SelectDrawersSlideProps = {
  selectDrawersList: Array<Drawer>;
  selectDrawers: string;
  direction: number;
  setSelectDrawers: (e: string) => void;
  answers: (q: string, a: any) => void;
    saveChanges: (e:Question[]) => void;
  editingMode: boolean
};

const SelectDrawersSlide: React.FC<SelectDrawersSlideProps> = ({
  selectDrawersList,
  selectDrawers,
  answers,
  direction,
  editingMode,
  saveChanges,
  setSelectDrawers
}) => {
  return (
    <motion.div
      className="slide"
      key="SelectDrawers"
      initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute'  }}
      transition={{ duration: 0.2 }}
    >
      <div className="block text-left">
        <h2 className="mb-4 block font-bold text-gray-500">Select Drawers</h2>
          {editingMode ? (
        <Editor
          saveChanges = {saveChanges}
            List={selectDrawersList}
            mode='drawers'
        />
      ) : (
        <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
          {selectDrawersList.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => {
                answers("drawers", item.value);
                setSelectDrawers(item.value);
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id={item.value}
                  type="radio"
                  name="drawers"
                  checked={selectDrawers === item.value}
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

export default SelectDrawersSlide;
