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

type Props = {
  nameRoom: string;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
  allRooms: string[];
  setUDPLink: React.Dispatch<React.SetStateAction<string>>;
};

const RoomsForm: React.FC<Props> = ({
  nameRoom,
  setSelectedRoom,
  setUDPLink,
  allRooms,
}) => {
  const [cabinetStyles, setCabinetStyles] = useState<boolean>(false);
  const { answers } = useSelector((state: RootState) => state.Steps);

  const [openApplyInterioRooms, setOpenApplyInterioRooms] =
    useState<boolean>(false);

  const [direction, setDirection] = useState<number>(0);
  const slideNames = useSelector((state: RootState) => state.Steps.slideNames);
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
    if (
      !cabinetStyles &&
      currentIndex === 0 &&
      nameRoom === 'kitchen' &&
      direction === 1
    ) {
      nextIndex = 2;
    }
    if (
      !cabinetStyles &&
      currentIndex === 2 &&
      nameRoom === 'kitchen' &&
      direction === -1
    ) {
      nextIndex = 0;
    }

    if (nextIndex >= 0 && nextIndex < slideNames.length) {
      const nextSlide = slideNames[nextIndex];

      // Prevent going back to PantryTall from Kitchen
      if (
        !(
          nameRoom !== 'kitchen' &&
          currentSlide === 'PantryTall' &&
          direction === -1
        )
      ) {
        dispatch({ type: 'SET_CURRENT_SLIDE', payload: nextSlide });
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
          const allQuestionsAnsweredRoom =
            item.room.name === 'kitchen'
              ? Object.keys(roomAnswers).length >= 7
              : Object.keys(roomAnswers).length >= 4;
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
    if (nameRoom === 'kitchen') {
      const setCurrentSlideAction: SetCurrentSlideAction = {
        type: 'SET_CURRENT_SLIDE',
        payload: 'CabinetStyles',
      };
      dispatch(setCurrentSlideAction);
    } else {
      const setCurrentSlideAction: SetCurrentSlideAction = {
        type: 'SET_CURRENT_SLIDE',
        payload: 'PantryTall',
      };
      dispatch(setCurrentSlideAction);
    }
    const resetProgressAction: ResetProgressAction = { type: 'RESET_PROGRESS' };
    dispatch(resetProgressAction);
  };

  useEffect(() => {
    FirstSlide();
  }, [nameRoom]);

  const ClientAnswer = (question: string, answer: any) => {
    dispatch(saveRoomAnswers(nameRoom, question, answer));
    question === 'CabinetStyles' &&
      setCabinetStyles(answer === 'Yes' ? true : false);
  };

  return (
    <form className="container mx-auto p-4">
      <div className="flex justify-between pb-5">
        <button
          className={` bg-blue-500 px-4 py-2 font-semibold text-white rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 ${
            currentSlide === slideNames[0] ||
            (nameRoom !== 'Kitchen' && currentSlide === 'PantryTall')
              ? 'cursor-not-allowed opacity-50'
              : ''
          }`}
          onClick={() => handleSlide(-1)}
          disabled={
            currentSlide === slideNames[0] ||
            (nameRoom !== 'kitchen' && currentSlide === 'PantryTall')
          }
          type="button"
        >
          Previous
        </button>
        <button
          className={` bg-blue-500 px-4 rounded-full py-2 font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 ${
            currentSlide === slideNames[slideNames.length - 1]
              ? 'cursor-not-allowed opacity-50'
              : ''
          }`}
          type="button"
          onClick={() => handleSlide(1)}
          disabled={currentSlide === slideNames[slideNames.length - 1]}
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
        />
      </div>
      {/* Footer form */}
      <div className="mt-5 flex flex-wrap items-center justify-between">
        <button
          className={`block w-1/5 rounded-full px-8 py-3.5 text-center text-base font-bold text-white ${
            progressPercentage === 100
              ? 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200'
              : 'bg-gray-500'
          }`}
          type="button"
          onClick={() => {
            setSelectedRoom(nameRoom);
          }}
          disabled={progressPercentage !== 100}
        >
          Next Room
        </button>

        {nameRoom !== 'kitchen' && (
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
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
                  className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
