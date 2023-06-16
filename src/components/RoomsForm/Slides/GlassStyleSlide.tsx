import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FileUpload from '@components/FileUpload';
import { GlassStyle } from '@prisma/client';
import { Question, newImage } from '@utils/types';
import Editor from '@components/RoomsForm/Slides/Editor';

type GlassStyleSlideProps = {
  glassStyleList: Array<GlassStyle>;
  selectedGlassStyle: string;
  setSelectedGlassStyle: (glassStyle: string) => void;
  answers: (q: string, a: any) => void;
   saveChanges: (e:Question[], m: string) => void;
  editingMode: boolean;
  direction: number;
};

const GlassStyleSlide: React.FC<GlassStyleSlideProps> = ({
  glassStyleList,
  selectedGlassStyle,
  setSelectedGlassStyle,
  answers,
  saveChanges,
  editingMode,
  direction,
}) => {
  return (
    <motion.div
      className="slide"
      key="glassStyles"
      initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute'  }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="mb-4 block text-left font-bold text-gray-500 ">Glass Style</h2>
           
      {/* Render editing UI when in editing mode */}
      {editingMode ? (
        <Editor
          saveChanges = {saveChanges}
          List={glassStyleList}
          mode='glassStyles'
        />
      ) : (
        <div className="grid grid-cols-3 items-center gap-5">
          {glassStyleList.map((el, i) => (
            <div
              className="flex max-w-sm h-full cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
              key={i}
              onClick={() => {
                setSelectedGlassStyle(el.value);
                answers("glassStyles", el.value);
              }}
            >
              <div className='mb-auto flex items-center'>
                <input
                  id={el.value}
                  type="radio"
                  name="glassStyles"
                  value={el.value}
                  checked={selectedGlassStyle === el.value}
                  onChange={() => undefined}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor={el.value}
                  className="pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                >
                  {el.value}
                </label>
              </div>
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
    </motion.div>
  );
};

export default GlassStyleSlide;
