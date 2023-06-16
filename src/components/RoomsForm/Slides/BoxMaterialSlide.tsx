import React from 'react';
import { motion } from 'framer-motion';
import Card from '@components/Card/Card';
import { BoxMaterial } from '@prisma/client';
import { Question } from '@utils/types';
import Editor from '@components/RoomsForm/Slides/Editor';

type BoxMaterialSlideProps = {
  selectBoxMaterialList: Array<BoxMaterial>;
  selectBoxMaterial: string;
  answers: (q: string, a: any) => void;
  direction: number;
  setSelectBoxMaterial: (e: string) => void;
    saveChanges: (e:Question[], m: string) => void;
  editingMode: boolean;
};

const BoxMaterialSlide: React.FC<BoxMaterialSlideProps> = ({
  selectBoxMaterialList,
  selectBoxMaterial,
  setSelectBoxMaterial,
  answers,
  editingMode,
  saveChanges,
  direction
}) => {
  return (
    <motion.div
      className="slide"
      key="boxMaterials"
      initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute'  }}
      transition={{ duration: 0.2 }}
    >
      <div className="block text-left">
        <h2 className="mb-4 block font-bold text-gray-500">Select Box Material</h2>
        {/* Render editing UI when in editing mode */}
      {editingMode ? (
        <Editor
          saveChanges = {saveChanges}
            List={selectBoxMaterialList}
            mode='boxMaterials'
        />
      ) : (
        <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
          {selectBoxMaterialList.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => {
                answers("boxMaterials", item.value);
                 setSelectBoxMaterial(item.value);
              }}
            >
              <div className="mb-4 flex items-center">
                <input
                  id={item.value}
                  type="radio"
                  name="boxMaterials"
                  checked={selectBoxMaterial === item.value}
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

export default BoxMaterialSlide;
