import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CheckBox from '@components/inputs/CheckBox';
import { PantryTall } from '@prisma/client';
import { Question } from '@utils/types';
import Editor from '@components/RoomsForm/Slides/Editor';

type PantryTallSlideProps = {
  pantryTallList: Array<PantryTall>;
  selectedPantryTall: string;
  setSelectedPantryTall: (e: string) => void;
  localClosedCeiling: boolean;
  localCrownFlat: boolean;
  setLocalClosedCeiling: (closedCeiling: boolean) => void;
  setLocalCrownFlat: (crownFlat: boolean) => void;
  answers: (q: string, a: any) => void;
  direction: number;
   saveChanges: (e:Question[], m: string) => void;
  editingMode: boolean;
};

const PantryTallSlide: React.FC<PantryTallSlideProps> = ({
  pantryTallList,
  selectedPantryTall,
  setSelectedPantryTall,
  localClosedCeiling,
  localCrownFlat,
  setLocalClosedCeiling,
  setLocalCrownFlat,
  answers,
  editingMode,
  saveChanges,
  direction
}) => {
  const handleClosedCeiling = () => {
    setLocalClosedCeiling(!localClosedCeiling);
  };

  const handleCrownFlat = () => {
    setLocalCrownFlat(!localCrownFlat);
  };

  return (
    <motion.div
      className="slide"
      key="PantryTall"
      initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute'  }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="mb-4 block text-left font-bold text-gray-500 ">Pantry\Tall</h2>
      {editingMode ? (
        <Editor
          saveChanges = {saveChanges}
          List={pantryTallList}
          mode='pantryTalls'
        />
      ) : (
      <div className="grid grid-cols-3 items-center gap-5">
        {pantryTallList.map((el, i) => (
          <div
            className="flex max-w-sm cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
            key={i}
            onClick={() => {
              setSelectedPantryTall(el.value);
              answers("pantryTalls", el.value);
            }}
          >
            <input
              id={el.value}
              type="radio"
              name="pantryTalls"
              value={el.value}
              onChange={() => undefined}
              checked={selectedPantryTall === el.value}
              className="h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor={el.value}
              className="pl-2 font-normal text-gray-500"
            >
              {el.value}
            </label>
             {el.img && (
              <Image
                src={el.img}
                className="block w-full rounded-lg"
                alt={el.value}
                width={200}
                height={200}
                layout="responsive"
                loader={({ src }) => src}
                />
              )}
          </div>
        ))}
      </div>
      )}
      <div className="mt-4 flex items-center">
        <CheckBox
          id="ClosedCeiling"
          checkedBox={localClosedCeiling}
          onChangeBox={handleClosedCeiling}
        />

        <label
          htmlFor="ClosedCeiling"
          className="py-3.5 text-lg font-bold text-gray-500"
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
          className="py-3.5 text-lg font-bold text-gray-500"
        >
          Crown/Flat
        </label>
      </div>
    </motion.div>
  );
};

export default PantryTallSlide;
