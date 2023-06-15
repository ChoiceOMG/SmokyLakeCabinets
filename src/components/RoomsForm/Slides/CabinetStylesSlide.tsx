import React from 'react';
import { motion } from 'framer-motion';
import { VscChevronLeft } from 'react-icons/vsc';
import Card from '@components/Card/Card';
import MultiSelect from '@components/MultiSelect/MultiSelect';
import { WallHeight } from '@prisma/client';
import Editor from '@components/RoomsForm/Slides/Editor';
import { Question } from '@utils/types';

type CabinetStylesSlideProps = {
  cabinetStyles: string;
  setCabinetStyles: (value: string) => void;
  answers: (q: string, a: any) => void;
  direction: number;
   saveChanges: (e:Question[]) => void;
  editingMode: boolean;
    wallHeightsList: Array<WallHeight>;
};

const CabinetStylesSlide: React.FC<CabinetStylesSlideProps> = ({
  cabinetStyles,
  setCabinetStyles,
  answers,
  direction,
  editingMode,
  saveChanges,
  wallHeightsList,

}) => {
  const [showWallHeights, setShowWallHeights] = React.useState(false);
  const handleCabinetStyles = (value: string) => {
    setCabinetStyles(value);
    setShowWallHeights(value === 'Yes');
    answers('CabinetStyles', value);
  };

  return (
    <>
      {editingMode ? (
        <Editor
          saveChanges={saveChanges}
          List={wallHeightsList}
          mode={showWallHeights ? "WallHeights":"CabinetStyles"}
        />
      ) : (
        <>
          {!showWallHeights && (
            <motion.div
              className="slide"
              key="CabinetStyles"
              initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute' }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-2 grid-rows-1 items-center gap-5">
                {/* Cabinet Styles */}
                <label className="block text-left">
                  <h2 className="mb-4 block font-bold text-gray-500">Cabinet Styles</h2>
                  <div className="align-center relative items-center">
                    <input
                      type="radio"
                      name="CabinetStyles"
                      value="No"
                      className="h-4 w-4 cursor-pointer"
                      onChange={(e) => handleCabinetStyles(e.target.value)}
                      checked={cabinetStyles === 'No'}
                    />
                    <label className="pl-2 font-normal text-gray-500">
                      No, upper and lower cabinets will be the same
                    </label>
                  </div>
                  <div className="align-center relative flex items-center">
                    <input
                      id="DiffUpLower"
                      type="radio"
                      value="Yes"
                      className="h-4 w-4 cursor-pointer"
                      onChange={(e) => handleCabinetStyles(e.target.value)}
                      checked={cabinetStyles === 'Yes'}
                    />
                    <label className="pl-2 font-normal text-gray-500">
                      Yes, I will have different style Fronts Upper & Lower (Kitchen only)
                    </label>
                  </div>
                </label>
                <Card
                  title="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                  img="/images/kitchen.jpg"
                />
              </div>

           
            </motion.div>
          )}
          {/* Wall Heights */}
          {showWallHeights && (
            <motion.div
              key="WallHeights"
              initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: 'relative' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: 'absolute' }}
              transition={{ duration: 0.2 }}
            >
              <MultiSelect
                Title="Wall Heights"
                allSelectItems={wallHeightsList}
                nextStep={(e) => {
                  answers('WallHeights', e);
                }}
                
              />
              {/* Back button */}
              <div className="flex justify-between">
                <button
                  className=" bg-blue-500 mt-5 px-4 py-2 font-semibold text-white rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 "
                  onClick={() => setShowWallHeights(false)}
                >
                  <VscChevronLeft />
                </button>
              </div>
                
            </motion.div>
          )}
        </>
      )}
            </>
  );
};

export default CabinetStylesSlide;
