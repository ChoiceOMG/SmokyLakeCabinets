import React, { useEffect, useState } from 'react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';
import ForAllRooms from '@components/RoomsForm/ForAllRooms';
import {
  ResetProgressAction,
  SetCurrentSlideAction,
  saveRoomAnswers,
} from '~/reducer/steps';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { trpc } from '@utils/trpc';
type Props = {
  nameRoom: string;
  handleStepChange: (step: number) => void;
  allRooms: string[];
  setUDPLink: React.Dispatch<React.SetStateAction<string>>;
};

const RoomsForm: React.FC<Props> = ({
  nameRoom,
  handleStepChange,
  setUDPLink,
  allRooms,
}) => {
  //session
  const { data: session, status } = useSession();
  console.log('session', session);
//getRole
  
  const { data:role } = trpc.auth.getRole.useQuery(
   session?.user?.id || '',
  );
  const { answers } = useSelector((state: RootState) => state.Steps);

  const [openApplyInterioRooms, setOpenApplyInterioRooms] =
    useState<boolean>(false);

  const [direction, setDirection] = useState<number>(0);
  const slideNames = useSelector((state: RootState) => {
  if (nameRoom === 'kitchen') {
    return state.Steps.slideNames;
  } else {
    return state.Steps.slideNames.filter((slideName) => slideName !== 'CabinetStyles');
  }
});

  const currentSlide = useSelector(
    (state: RootState) => state.Steps.currentSlide
  );
  const progressPercentage = useSelector(
    (state: RootState) => state.Steps.progressPercentage
  );

  const dispatch = useDispatch();

  const { materialsFinishes } = useSelector(
    (state: RootState) => state.materialsFinishesReducer
  );

const handleSlide = (direction: number) => {
  const currentIndex = slideNames.indexOf(currentSlide);
  setDirection(direction);
  let nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < slideNames.length) {
    const nextSlide = slideNames[nextIndex];
    dispatch({ type: 'SET_CURRENT_SLIDE', payload: nextSlide });
  } else if (nextIndex < 0 && direction === -1) {
    const prevRoomIndex = allRooms.indexOf(nameRoom) - 1;
    if (prevRoomIndex < 0) {
      handleStepChange(2)
    } else {
      const prevRoom = allRooms[prevRoomIndex];
      setUDPLink(prevRoom || '');
    }
  } else if (currentIndex === slideNames.length - 1 && direction === 1) {
    const nextRoomIndex = allRooms.indexOf(nameRoom) + 1;
    if (nextRoomIndex >= 0 && nextRoomIndex < allRooms.length) {
      const nextRoom = allRooms[nextRoomIndex];
      console.log('nextRoom', nextRoom)
      setUDPLink(nextRoom || '');
    } else {
      
      handleStepChange(4)
    }
  }
};



  const applyInteriorToRooms = () => {
    const currentRoomAnswers = answers[nameRoom] || {};

    // Update all rooms with the same answers as the current room
    allRooms.forEach((room) => {
      Object.entries(currentRoomAnswers).forEach(([question, answer]) => {
        dispatch(saveRoomAnswers(room, question, answer));
      });
    });

    setOpenApplyInterioRooms(false);
  };

  const ListCurrentRooms = () => {
    return (
      <div className="mt-4 flex h-fit w-full justify-center gap-5">
        {Object.values(materialsFinishes).map((item: any, i: number) => {
          const roomAnswers = answers[item.room.name] || {};
          const allQuestionsAnsweredRoom = Object.keys(roomAnswers).length >= slideNames.length;
         
          return (
            <span
              onClick={() => {
                setUDPLink(item.room.name);
              }}
              className={`cursor-pointer rounded-full px-3 capitalize ${
                allQuestionsAnsweredRoom
                  ? 'bg-green-200 text-green-600'
                  : 'bg-red-200 text-red-600'
              }`}
              key={i}
              title={allQuestionsAnsweredRoom ? 'Done' : 'Not done'}
            >
              {item.room.name}
              {allQuestionsAnsweredRoom && <span> &#10003;</span>}
            </span>
          );
        })}
      </div>
    );
  };

  const FirstSlide = () => {
    const setCurrentSlideAction: SetCurrentSlideAction = {
      type: 'SET_CURRENT_SLIDE',
      payload: 'glassStyles',
    };
    dispatch(setCurrentSlideAction);

    const resetProgressAction: ResetProgressAction = { type: 'RESET_PROGRESS' };
    dispatch(resetProgressAction);
  };

  useEffect(() => {
    FirstSlide();
  }, [nameRoom]);

  const ClientAnswer = (question: string, answer: any) => {
    dispatch(saveRoomAnswers(nameRoom, question, answer));
  };

  return (
    <form className="container mx-auto p-4">
        <div className="flex justify-between pb-5">
        <button
          className={`rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200`}
          onClick={() => handleSlide(-1)}
          type="button"
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {slideNames.map(
            (slideName, index) => {
              const isAnswered = answers[nameRoom]?.hasOwnProperty(slideName);
              console.log(isAnswered);
              console.log(slideName);
              console.log(answers[nameRoom]);
              const bgColor = isAnswered ? 'bg-green-600 text-white' : '';
              return (
                <motion.span
                  key={index}
                  className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full capitalize ${bgColor} ${
                    slideName === currentSlide
                      ? '!bg-blue-600 text-white'
                      : 'bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    const setCurrentSlideAction: SetCurrentSlideAction = {
                      type: 'SET_CURRENT_SLIDE',
                      payload: slideName,
                    };
                    dispatch(setCurrentSlideAction);
                  }}
                >
                  {index + 1}
                </motion.span>
              );
            }
          )}
        </div>
        <button
          className={`rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200`}
          type="button"
          onClick={() => handleSlide(1)}
        >
          Next
        </button>
      </div>
      <h1 className="mb-3 text-left text-2xl font-bold capitalize text-gray-500">
        {nameRoom} Materials & Finishes Exterior
      </h1>

      <ProgressBar progressPercentage={progressPercentage} />
      <div
        className="overflow-hidde h-full w-full max-w-full"
        style={{ minHeight: '45vh' }}
      >
        <ForAllRooms
          currentSlide={currentSlide}
          answers={ClientAnswer}
          direction={direction}
          role={role?.role || ''}
        />
      </div>
      {/* Footer form */}
      <div className="mt-5 flex flex-wrap items-center justify-between">
        {nameRoom !== 'kitchen' && progressPercentage === 100 && (
          <button
            className={`ml-3 mr-auto block w-1/5 rounded-full px-4 py-3.5 text-center text-base font-bold text-white ${
              progressPercentage < 100
                ? 'bg-gray-500'
                : 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200'
            }`}
            type="button"
            onClick={() => {
              setOpenApplyInterioRooms(true);
            }}
            disabled={progressPercentage !== 100}
          >
            Apply Interior to All Rooms
          </button>
        )}

        {Object.keys(materialsFinishes).length > 0 && <ListCurrentRooms />}
      </div>

      {/* Modal window */}
      <CSSTransition
        in={openApplyInterioRooms}
        timeout={400}
        classNames="openModal"
        unmountOnExit
      >
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      Apply to all rooms?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your settings for {nameRoom} will overwrite the settings
                        you have selected for the following rooms:
                      </p>
                      {allRooms.map((room, index) => (
                        <p key={index} className="font-bold capitalize">
                          {room}
                        </p>
                      ))}
                      <p className="text-sm text-gray-500">
                        Are you sure you want to continue?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-full border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    applyInteriorToRooms();
                  }}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpenApplyInterioRooms(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </form>
  );
};

export default RoomsForm;
