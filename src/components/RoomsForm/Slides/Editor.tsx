import FileUpload from '@components/FileUpload';
import { Question, newImage } from '@utils/types';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';
import { toast } from 'react-toastify';
type Props = {
  List: Array<any>;
  saveChanges: (e: Question[]) => void;
  mode?: string;
};
const Editor: React.FC<Props> = ({ List, saveChanges, mode }) => {
  // Add state to store the updated question data
  const [questions, setQuestions] = useState<Question[]>(List);
  const [newSize, setNewSize] = useState<string>('');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Question>({} as Question);
  const handleImageChange = (e: newImage, id: number) => {
    if (e) {
      const image = e.display_url;
      setQuestions((prev) => {
        const updatedList = [...prev];
        const updatedItem = updatedList.find((item) => item.id === id);

        if (updatedItem) {
          updatedItem.img = image as string;
        } else {
          updatedList.push({ id: id, img: image as string });
        }

        return updatedList;
      });
    }
  };

  // Handle text change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setQuestions((prev) => {
      const updatedList = [...prev];
      const updatedItem = updatedList.find((item) => item.id === id);

      if (updatedItem) {
        updatedItem.value = e.target.value;
      } else {
        updatedList.push({ id: id, value: e.target.value });
      }

      return updatedList;
    });
  };
  // Handle size change
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setQuestions((prev) => {
      const updatedList = [...prev];
      const updatedItem = updatedList.find((item) => item.id === id);

      if (updatedItem) {
        updatedItem.size = e.target.value;
      } else {
        updatedList.push({ id: id, size: e.target.value });
      }

      return updatedList;
    }
    );
  };
  // Handle title change
  const handleTitleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    setQuestions((prev) => {
      const updatedList = [...prev];
      const updatedItem = updatedList.find((item) => item.id === id);

      if (updatedItem) {
        updatedItem.title = e.target.value;
      } else {
        updatedList.push({ id: id, title: e.target.value });
      }
      return updatedList;
    });
  };
  useEffect(() => {
    console.log('questions', questions);
  }
    , [questions]);
  
  const handleNewQuestion = () => {    
    setQuestions((prev) => {
      const updatedList = [...prev];
      updatedList.push({ ...newQuestion, id: prev.length + 1 });
      return updatedList;
    });
    setModalOpen(false);
    toast.success('New Question Added');
  };
  
  
  if (false) {
    return (
      <div>
        {/* Render editing UI for Glass Style */}
        <h2 className="mx-auto mb-4 block font-bold text-gray-500">Edit</h2>
        {mode === 'WallHeights' && (
          <div
            className="grid 
          w-full
          grid-cols-4
          items-center
          justify-center
          rounded-lg
          bg-white
          px-5
          py-2
            "
          >
            {questions &&
              questions.map((el, i) => (
                <div
                  key={i}
                  className=" m-1 max-w-fit cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-5 text-left transition duration-300 ease-in-out hover:border-gray-500 hover:bg-red-300"
                 /*  onClick={() => {
                    //delete
                    setQuestions((prev) => {
                      const updatedList = prev.filter(
                        (item) => item.id !== el.id
                      );
                      return updatedList;
                    });
                  }} */
                >
                 
                     <input
                value={el.size}
                className="mb-1 w-full rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                onChange={(e) => handleSizeChange(e, el.id)}
              />
                  <div className="relative mb-auto w-full">
                <FileUpload
                  onUploadSuccess={(e) => handleImageChange(e, el.id)}
                  classes="absolute w-full h-full opacity-0 left-0 cursor-pointer"
                />
                <div className="group h-full w-full">
                  <Image
                    src={el.img || ''}
                    className="block w-full rounded-lg"
                    alt={el.value || ''}
                    width={500}
                    height={500}
                    loader={({ src }) => src}
                  />
                </div>
              </div>
                </div>
              ))}
            <div className="flex items-center gap-2">
              <input
                className="
              w-full    
              rounded-lg    
              border  
              border-gray-200 
              bg-white
              p-2
              shadow  
              dark:border-gray-700    
              dark:bg-gray-800
                "
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
              />
              <button
                type="button"
                className="
             rounded-full bg-blue-500 px-3 py-1 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200          
                "
                onClick={() => {
                  //add
                  setQuestions((prev) => {
                    const updatedList = [...prev];
                    updatedList.push({ id: prev.length + 1, size: newSize });
                    return updatedList;
                  });
                  setNewSize('');
                }}
              >
                +
              </button>
            </div>
          </div>
        )}
        <button
        type="button"
        className="mt-5 rounded-full block mx-auto mb-5 bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
        onClick={(e)=>setModalOpen(true)}
      >
        +
        </button>
        
         {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
            <div className="bg-white rounded-lg p-8 relative">
            <AiFillCloseCircle
                className="absolute -top-2 -right-2 cursor-pointer h-5 w-5 rounded-full bg-red-500 text-white hover:bg-red-800"
                onClick={() => setModalOpen(false)}
              />
              
            <h3 className="text-2xl font-semibold mb-4">New</h3>
            <form >
              <div className="mb-4">
                <label className="block font-semibold mb-1">Input</label>
                <input
                  type="text"
                  
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Textarea</label>
                <textarea
                
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                 
                  className="w-full"
                />
                
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
        
        <button
          type="button"
          className="mt-5 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
          onClick={() => saveChanges(questions)}
        >
          Save Changes
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Render editing UI for Glass Style */}
      <h2 className="mx-auto mb-4 block font-bold text-gray-500">Edit</h2>

      <div className="grid grid-cols-3 items-center gap-5">
        {questions &&
          questions.map((el, i) => (
            <div
              className="relative flex h-full max-w-sm cursor-pointer flex-wrap items-center rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
              key={i}
              onMouseEnter={() => setHoveredCardId(el.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            >
           {hoveredCardId === el.id && (
              <AiFillCloseCircle
                className="
                  absolute
                  -top-1
                  -right-1
                  h-5
                  w-5
                  rounded-full
                  bg-red-500
                  text-white
                  hover:bg-red-800    
                  focus:ring-4
                  focus:ring-red-200"
                  onClick={() => {
                    //delete
                    setQuestions((prev) => {
                      const updatedList = prev.filter(
                        (item) => item.id !== el.id
                      );
                      return updatedList;
                    });
                  }}
              />
            )}
              {mode && mode === 'WallHeights' ? (
                 <input
                value={el.size}
                className="mb-1 w-full rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                onChange={(e) => handleTextChange(e, el.id)}
              />
              ): (
              <input
                value={el.value}
                className="mb-1 w-full rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                onChange={(e) => handleTextChange(e, el.id)}
              />
              )}
              <div className="relative mb-auto w-full">
                <FileUpload
                  onUploadSuccess={(e) => handleImageChange(e, el.id)}
                  classes="absolute w-full h-full opacity-0 left-0 cursor-pointer"
                />
                <div className="group h-full w-full">
                  <Image
                    src={el.img || ''}
                    className="block w-full rounded-lg"
                    alt={el.value || ''}
                    width={500}
                    height={500}
                    loader={({ src }) => src}
                  />
                </div>
              </div>
              {el.title && (
                <textarea
                  value={el.title}
                  className="
                  mb-1 mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
                  onChange={(e) => handleTitleChange(e, el.id)}
                ></textarea>
              )}
            </div>
          ))}
      </div>
         <button
        type="button"
        className="mt-5 rounded-full block mx-auto mb-5 bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
        onClick={()=>setModalOpen(true)}
      >
        +
        </button>
        
         {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-10 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-[600px] relative ">
            <AiFillCloseCircle
                className="absolute -top-2 -right-2 cursor-pointer h-5 w-5 rounded-full bg-red-500 text-white hover:bg-red-800"
                onClick={() => setModalOpen(false)}
              />
              
            <h3 className="text-2xl font-semibold mb-4">New</h3>
            
              <div className="mb-4">
              <label className="block font-semibold mb-1">
                {mode && mode === 'WallHeights' ? 'Size' : 'Input'}
              </label>
              
                <input
                  type="text"
                  onChange={(e) => mode && mode === 'WallHeights'?setNewQuestion({ ...newQuestion, size: e.target.value }): setNewQuestion({ ...newQuestion, value: e.target.value })} 
                  value={newQuestion.value}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
             
            <div className="relative mb-auto w-full 
            border border-gray-200
            rounded-lg
            bg-white
            p-2
            shadow
            dark:border-gray-700
            dark:bg-gray-800
            hover:border-gray-500
            cursor-pointer
">
                <FileUpload
                  onUploadSuccess={(e) => setNewQuestion({ ...newQuestion, img: e.display_url })}
                  classes="absolute w-full h-full opacity-0 left-0 cursor-pointer"
              />
             
                <div className="group h-full w-full">
                  <Image
                    src={newQuestion.img || '/images/none-photo.png'}
                    className="block w-full rounded-lg "
                    alt={newQuestion.value || ''}
                    width={400}
                    height={400}
                    loader={({ src }) => src}
                  />
                </div>
            </div>
            {mode && (mode === 'boxMaterials' || mode === 'drawers' || mode === 'hardwarePackages') && (
               <div className="mb-4">
                <label className="block font-semibold mb-1">Text</label>
                <textarea
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  value={newQuestion.title}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            )}
              <button
                type="button"
              className="bg-blue-500 mt-5 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
              onClick={()=>handleNewQuestion()}
              >
                Submit
              </button>
            
          </div>
        </div>
      )}
      <button
        type="button"
        className="mt-5 rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
        onClick={() => saveChanges(questions)}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Editor;
