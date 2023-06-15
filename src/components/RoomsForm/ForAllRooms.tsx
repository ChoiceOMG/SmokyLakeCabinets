import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import { trpc } from '@utils/trpc';
import { BoxMaterial, Drawer, GlassStyle, HardwarePackage, PantryTall, WallHeight } from '@prisma/client';
import { HiPencilAlt } from 'react-icons/hi';
import { Question, newImage } from '@utils/types';

import { toast } from 'react-toastify';
import GlassStyleSlide from '@components/RoomsForm/Slides/GlassStyleSlide';
import PantryTallSlide from '@components/RoomsForm/Slides/PantryTallSlide';
import BoxMaterialSlide from '@components/RoomsForm/Slides/BoxMaterialSlide';
import HardwarePackageSlide from '@components/RoomsForm/Slides/HardwarePackageSlide';
import SelectDrawersSlide from '@components/RoomsForm/Slides/SelectDrawersSlide';
import CabinetStylesSlide from '@components/RoomsForm/Slides/CabinetStylesSlide';


type Props = {
  currentSlide: string;
  answers: (q: string, a: any) => void;
  direction: number;
  role: string | null;
};

const Quiz: React.FC<Props> = ({ currentSlide, answers, direction,role }) => {
  const [selectedGlassStyle, setSelectedGlassStyle] = useState("");
  const [selectedPantryTall, setSelectedPantryTall] = useState("");
  const [localClosedCeiling, setLocalClosedCeiling] = useState(false);
  const [localCrownFlat, setLocalCrownFlat] = useState(false);
  const [selectBoxMaterial, setSelectBoxMaterial] = useState("");
  const [selectHardwarePackage, setSelectHardwarePackage] = useState("");
  const [selectDrawers, setSelectDrawers] = useState("");

const [wallHeightsList, setWallHeightsList] = useState<Array<WallHeight>>([]);
const [glassStyleList, setGlassStyleList] = useState<Array<GlassStyle>>([]);
const [pantryTallList, setPantryTallList] = useState<Array<PantryTall>>([]);
const [selectBoxMaterialList, setSelectBoxMaterialList] = useState<Array<BoxMaterial>>([]);
const [selectHardwarePackageList, setSelectHardwarePackageList] = useState<Array<HardwarePackage>>([]);
const [selectDrawersList, setSelectDrawersList] = useState<Array<Drawer>>([]);

  const [cabinetStyles, setCabinetStyles] = useState('');
  const { data } = trpc.kitchenQuestions.getAll.useQuery()
    const { mutateAsync: updateQuestion } = trpc.kitchenQuestions.updateQuestion.useMutation()
  const [editingMode, setEditingMode] = useState(false); // Track the editing mode

console.log(glassStyleList)

   // Toggle editing mode
  const toggleEditingMode = () => {
    setEditingMode(!editingMode);
  };



   // Handle saving changes
  const saveChanges = async (quest: Question[]) => {
    // Update the questions in the database using Prisma
     {/* Нужно отправлять все данные в бд  */}
    console.log('quest', quest);
    const model = currentSlide;
    await updateQuestion({ model, id: 1, questionUpdateData: quest }).then((res: any) => {
      console.log('res', res);
      switch (model) {
        case 'glassStyles':
          setGlassStyleList((prev) => {
            const updatedList = [...prev];
            return updatedList.map((item) => {
              
              if (item.id === res.id) {
                item.img = res.img as string;
                item.value = res.value as string;
              }
              return item;
            }
            );
          });
          break;
        case 'pantryTalls':
          setPantryTallList((prev) => {
            const updatedList = [...prev];
            return updatedList;
          });
          break;
        case 'boxMaterials':
          setSelectBoxMaterialList((prev) => {
            const updatedList = [...prev];
            return updatedList;
          });
          break;
        case 'hardwarePackages':
          setSelectHardwarePackageList((prev) => {
            const updatedList = [...prev];
            return updatedList;
          });
          break;
        case 'drawers':
          setSelectDrawersList((prev) => {
            const updatedList = [...prev];
            return updatedList;
          });
          break;
        default:
          break;
      }
      setEditingMode(false);
      toast.success('Changes saved successfully');
    }).catch((err) => {
      console.log('err', err);
      toast.error('Error saving changes');
    });
  };
 
useEffect(() => {
  if (data && data[0]) {
    const wallHeights = data[0].wallHeights;
    const glassStyles = data[0].glassStyles;
    const pantryTalls = data[0].pantryTalls;
    const boxMaterials = data[0].boxMaterials;
    const hardwarePackages = data[0].hardwarePackages;
    const drawers = data[0].drawers;
    console.log(data)
    setWallHeightsList(wallHeights);
    setGlassStyleList(glassStyles);
    setPantryTallList(pantryTalls);
    setSelectBoxMaterialList(boxMaterials);
    setSelectHardwarePackageList(hardwarePackages);
    setSelectDrawersList(drawers);
  }
}, [data]);

   const handleCabinetStyles = (e: string) => {
    answers('CabinetStyles', e);
    setCabinetStyles(e);
  };

  useEffect(() => {
    console.log('currentSlide', currentSlide);
  }, [currentSlide]);
  useEffect(() => {
    answers('PantryTallCheckBox', {
      closedCeiling: localClosedCeiling,
      crownFlat: localCrownFlat,
    });
  }, [localClosedCeiling, localCrownFlat]);

  return (
    <div className='relative'>
      
     <AnimatePresence custom={direction}>
     

        {/* Glass Style */}
        {currentSlide === "glassStyles" && (
          <GlassStyleSlide
            glassStyleList={glassStyleList}
            selectedGlassStyle={selectedGlassStyle}
            setSelectedGlassStyle={setSelectedGlassStyle}
            answers={answers}
            saveChanges={(e)=>saveChanges(e)}
            editingMode={editingMode}
            direction={direction}
            
          />
        )}

        {/* Pantry\Tall */}
        {currentSlide === "pantryTalls" && (
          <PantryTallSlide 
            pantryTallList={pantryTallList}
            selectedPantryTall={selectedPantryTall}
            setSelectedPantryTall={setSelectedPantryTall}
            localClosedCeiling={localClosedCeiling}
            localCrownFlat={localCrownFlat}
            setLocalClosedCeiling={setLocalClosedCeiling}
            setLocalCrownFlat={setLocalCrownFlat}
            answers={answers}
            saveChanges={(e)=>saveChanges(e)}
            editingMode={editingMode}
            direction={direction}
          />
        )}

        {/* Select Box Material */}
        {currentSlide === "boxMaterials" && (
          <BoxMaterialSlide
            selectBoxMaterialList={selectBoxMaterialList}
            selectBoxMaterial={selectBoxMaterial}
            answers={answers}
            setSelectBoxMaterial={setSelectBoxMaterial}
             saveChanges={(e)=>saveChanges(e)}
            editingMode={editingMode}
            direction={direction}
          />
        )}

        {/* Select Hardware Package */}
        {currentSlide === "hardwarePackages" && (
          <HardwarePackageSlide
            selectHardwarePackageList={selectHardwarePackageList}
            selectHardwarePackage={selectHardwarePackage}
            setSelectHardwarePackage={setSelectHardwarePackage}
            answers={answers}
            saveChanges={(e)=>saveChanges(e)}
            editingMode={editingMode}
            direction={direction}
          />
        )}

        {/* Select Drawers */}
        {currentSlide === "drawers" && (
          <SelectDrawersSlide
            selectDrawersList={selectDrawersList}
            selectDrawers={selectDrawers}
            setSelectDrawers={setSelectDrawers}
            answers={answers}
              saveChanges={(e)=>saveChanges(e)}
            editingMode={editingMode}
            direction={direction}
          />
        )}
        
           {/* CabinetStyles */}
        {currentSlide === 'CabinetStyles' && (
          <CabinetStylesSlide
            cabinetStyles={cabinetStyles}
            setCabinetStyles={handleCabinetStyles}
            answers={answers}
            direction={direction}
              saveChanges={(e)=>saveChanges(e)}
            editingMode={editingMode}
            wallHeightsList={wallHeightsList}
          />
             )}
      </AnimatePresence>
      
      
      {role && role === 'admin' && (
        <button className='
        absolute -top-5 right-0 bg-blue-500 mt-5 px-4 py-2 font-semibold text-white rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 '
          onClick={toggleEditingMode}
          type='button'
>
<HiPencilAlt/>
        </button>
      
      )
}
    
    </div>
  );
};

export default Quiz;
