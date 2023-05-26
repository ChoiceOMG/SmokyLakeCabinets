import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MultiSelect from '@components/MultiSelect/MultiSelect';
import Image from 'next/image';
import Card from '@components/Card/Card';
import CheckBox from '@components/inputs/CheckBox';

type Props = {
  currentSlide: string;
  answers: (q: string, a: any) => void;
  direction: number;
};

const Quiz: React.FC<Props> = ({ currentSlide, answers, direction }) => {
  const [selectedGlassStyle, setSelectedGlassStyle] = useState("");
  const [selectedPantryTall, setSelectedPantryTall] = useState("");
  const [localClosedCeiling, setLocalClosedCeiling] = useState(false);
  const [localCrownFlat, setLocalCrownFlat] = useState(false);
  const [selectBoxMaterial, setSelectBoxMaterial] = useState("");
  const [selectHardwarePackage, setSelectHardwarePackage] = useState("");
  const [selectDrawers, setSelectDrawers] = useState("");
  const [wallHeights, setWallHeights] = useState<string[]>([]);
  const [cabinetStyles, setCabinetStyles] = useState('');

  const handleClosedCeiling = () => {
    setLocalClosedCeiling(!localClosedCeiling);
  };

  const handleCrownFlat = () => {
    setLocalCrownFlat(!localCrownFlat);
  };

  // Wall Heights
  const allSelectItems = [{
    size: '30"',
    img: '/images/kitchen.jpg',
  }, {
      size: '33"',
      img: '/images/kitchen.jpg',
    }, {
      size: '38"',
      img: '/images/kitchen.jpg',
    }, {
      size: '41"',
      img: '/images/kitchen.jpg',
    }, {
      size: '48"',
      img: '/images/kitchen.jpg',
    }];

  // Glass Style
  const glassStyleList = [
      {
      value: 'Clear',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Frosted',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Etched',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Patterned',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Tinted',
      img: '/images/kitchen.jpg',
    },
    {
      value: 'Other',
      img: '/images/kitchen.jpg',
    },
  ];

  // Pantry\Tall
  const pantryTallList = [
    {
      value: '1',
      img: '/images/kitchen.jpg',
    },
    {
      value: '2',
      img: '/images/kitchen.jpg',
    },
    {
      value: '3',
      img: '/images/kitchen.jpg',
    },
    {
      value: '4',
      img: '/images/kitchen.jpg',
    },
    {
      value: '5',
      img: '/images/kitchen.jpg',
    },
    {
      value: '6',
      img: '/images/kitchen.jpg',
    },
  ];

  // Select Box Material
  const selectBoxMaterialList = [
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
  ];

  // Select Hardware Package
   const selectHardwarePackageList =[
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
  ];

  // Select Drawers
  const selectDrawersList = [
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
  ];

  useEffect(() => {
    answers('CabinetStyles', cabinetStyles);
  }, [cabinetStyles]);

  useEffect(() => {
    answers('PantryTallCheckBox', {
      closedCeiling: localClosedCeiling,
      crownFlat: localCrownFlat,
    });
  }, [localClosedCeiling, localCrownFlat]);

  return (
    <div className='relative'>
     <AnimatePresence custom={direction}>
        {currentSlide === "CabinetStyles" && (
          <motion.div
            className="slide"
            key="CabinetStyles"
            initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
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
                    onChange={(e) => setCabinetStyles(e.target.value)}
                    checked={cabinetStyles === "No"}
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
                    onChange={(e) => setCabinetStyles(e.target.value)}
                    checked={cabinetStyles === "Yes"}
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

        {currentSlide === "WallHeights" && (
          <motion.div
            className="slide"
            key="WallHeights"
            initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
            transition={{ duration: 0.2 }}
          >
            {/* MultiSelect */}
            <MultiSelect
              Title="Wall Heights"
              allSelectItems={allSelectItems}
              nextStep={(e) => {
                answers("WallHeights", e);
              }}
              wallHeights={wallHeights}
            />
          </motion.div>
        )}

        {/* Glass Style */}
        {currentSlide === "GlassStyle" && (
          <motion.div
            className="slide"
            key="GlassStyle"
        initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="mb-4 block text-left font-bold text-gray-500 ">Glass Style</h2>
            <div className="grid grid-cols-3 items-center gap-5">
              {glassStyleList.map((el, i) => (
                <div
                  className="flex max-w-sm cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                  key={i}
                  onClick={() => {
                    setSelectedGlassStyle(el.value);
                    answers("selectedGlassStyle", el.value);
                  }}
                >
                  <input
                    id={el.value}
                    type="radio"
                    name="GlassStyle"
                    value={el.value}
                    checked={selectedGlassStyle === el.value}
                    onChange={() => undefined}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={el.value}
                    className=" pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                  >
                    {el.value}
                  </label>
                  <Image
                    src={el.img}
                    className="block w-full rounded-lg"
                    alt={el.value}
                    width={200}
                    height={200}
                    layout="responsive"
                    loader={({ src }) => src}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pantry\Tall */}
        {currentSlide === "PantryTall" && (
          <motion.div
            className="slide"
            key="PantryTall"
         initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="mb-4 block text-left font-bold text-gray-500 ">Pantry\Tall</h2>
            <div className="grid grid-cols-3 items-center gap-5">
              {pantryTallList.map((el, i) => (
                <div
                  className="flex max-w-sm cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                  key={i}
                  onClick={() => {
                    setSelectedPantryTall(el.value);
                    answers("selectedPantryTall", el.value);
                  }}
                >
                  <input
                    id={el.value}
                    type="radio"
                    name="PantryTall"
                    value={el.value}
                    onChange={() => undefined}
                    checked={selectedPantryTall === el.value}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={el.value}
                    className=" pl-2 text-left font-normal text-gray-500 dark:text-gray-400"
                  >
                    {el.value}
                  </label>
                  <Image
                    width={200}
                    height={200}
                    src={el.img}
                    className="block w-full rounded-lg"
                    alt={el.value}
                    layout="responsive"
                    loader={({ src }) => src}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center">
              <CheckBox
                id="ClosedCeiling"
                checkedBox={localClosedCeiling}
                onChangeBox={handleClosedCeiling}
              />

              <label
                htmlFor="ClosedCeiling"
                className=" py-3.5 text-lg font-bold text-gray-500"
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
                className=" py-3.5 text-lg font-bold text-gray-500"
              >
                Crown/Flat
              </label>
            </div>
          </motion.div>
        )}

        {/* Select Box Material */}
        {currentSlide === "SelectBoxMaterial" && (
          <motion.div
            className="slide"
            key="SelectBoxMaterial"
            initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
            transition={{ duration: 0.2 }}
          >
            <div className="block text-left">
              <h2 className="mb-4 block font-bold text-gray-500">Select Box Material</h2>
              <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
                {selectBoxMaterialList.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer"
                    onClick={() => {
                      answers("selectBoxMaterial", item.value);
                      setSelectBoxMaterial(item.value);
                    }}
                  >
                    <div className="mb-4 flex items-center">
                      <input
                        id={item.value}
                        type="radio"
                        name="selectBoxMaterial"
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
            </div>
          </motion.div>
        )}

        {/* Select Hardware Package */}
        {currentSlide === "SelectHardwarePackage" && (
          <motion.div
            className="slide"
            key="SelectHardwarePackage"
            initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
            transition={{ duration: 0.2 }}
          >
            <div className="block text-left">
              <h2 className="mb-4 block font-bold text-gray-500">Select Hardware Package</h2>
              <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
                {selectHardwarePackageList.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer"
                    onClick={() => {
                      answers("selectHardwarePackage", item.value);
                      setSelectHardwarePackage(item.value);
                    }}
                  >
                    <div className="mb-4 flex items-center">
                      <input
                        id={item.value}
                        type="radio"
                        checked={selectHardwarePackage === item.value}
                        onChange={() => undefined}
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
          </motion.div>
        )}

        {/* Select Drawers */}
        {currentSlide === "SelectDrawers" && (
          <motion.div
            className="slide"
            key="SelectDrawers"
             initial={{ opacity: 0, x: direction > 0 ? -100 : 100, position: "absolute" }}
            animate={{ opacity: 1, x: 0, position: "relative" }}
            exit={{ opacity: 0, x: direction > 0 ? 100 : -100, position: "absolute"  }}
            transition={{ duration: 0.2 }}
          >
            <div className="block text-left">
              <h2 className="mb-4 block font-bold text-gray-500">Select Drawers</h2>
              <div className="grid grid-cols-3 grid-rows-1 items-center gap-5">
                {selectDrawersList.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectDrawers(item.value);
                      answers("selectDrawers", item.value);
                    }}
                  >
                    <div className="mb-4 flex items-center">
                      <input
                        id={item.value}
                        type="radio"
                        name="selectDrawersList"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
