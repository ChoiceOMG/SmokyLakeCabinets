import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import ForKitchen from '@components/RoomsForm/ForKitchen';
import ForAnyRooms from '@components/RoomsForm/ForAnyRooms';
import { CSSTransition } from 'react-transition-group';
import { updateMaterialsFinishes } from '~/reducer/materialsFinishes';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';

type Props = {
  nameRoom: string;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
  allRooms: string[];
  setUDPLink: React.Dispatch<React.SetStateAction<string>>;
};
type ProgressState = number;

const RoomsForm: React.FC<Props> = ({
  nameRoom,
  setSelectedRoom,
  setUDPLink,
  allRooms,
}) => {
  let [progress, setProgress]: [
    ProgressState,
    React.Dispatch<React.SetStateAction<ProgressState>>
  ] = useState(0);
  const [openApplyInterioRooms, setOpenApplyInterioRooms] = useState(false);
  const [kitchenQuestion, setKitchenQuestion] = useState(false);
  const [checkMaterialsFinishes, setCheckMaterialsFinishes] = useState<Object>(
    {}
  );
  const dispatch = useDispatch();

  const { materialsFinishes } = useSelector(
    (state: RootState) => state.materialsFinishesReducer
  );
  useEffect(() => {
    setCheckMaterialsFinishes(materialsFinishes);
  }, [materialsFinishes]);
  const ApplyInterioRooms = () => {
    const currentProps = Object.keys(materialsFinishes)
      .map((key) => {
        if (
          materialsFinishes[key].room.name === nameRoom &&
          materialsFinishes[key].room.progress === 100
        ) {
          return materialsFinishes[key].room.props;
        }
      })
      .filter((item) => item !== undefined); //I get all the props from the object
    //update all the rooms with the same props
    allRooms.forEach((room) => {
      dispatch(updateMaterialsFinishes(room, currentProps[0], 100));
    });
    setOpenApplyInterioRooms(false);
  };

  const nextProgress = (e: number, option?: object) => {
    if (e === 100) {
      setProgress(100);
      dispatch(updateMaterialsFinishes(nameRoom, option, 100));
      return;
    }
    if (e === 0) {
      setProgress(0);
      dispatch(updateMaterialsFinishes(nameRoom, option, 0));
      return;
    }
    setProgress(progress + e);

    dispatch(updateMaterialsFinishes(nameRoom, option, progress));
  };
  return (
    <form className="container mx-auto p-4">
      <h1 className="mb-3 text-left text-2xl font-bold capitalize text-gray-500">
        {nameRoom} Materials & Finishes Exterior
      </h1>

      <ProgressBar progressPercentage={progress} />
      <div
        className="overflow-hidde 	 h-full	 w-full max-w-full"
        style={{ minHeight: '45vh' }}
      >
        {nameRoom === 'kitchen' && !kitchenQuestion ? (
          <ForKitchen
            nextProgress={nextProgress}
            checkMaterialsFinishes={checkMaterialsFinishes}
            done={setKitchenQuestion}
          />
        ) : (
          <ForAnyRooms
            nameRoom={nameRoom}
            checkMaterialsFinishes={checkMaterialsFinishes}
            nextProgress={nextProgress}
          />
        )}
      </div>
      {/* Footer form */}
      <div className="mt-5 flex	items-center justify-between">
        <button
          className={`block w-1/5 rounded-full  px-8 py-3.5 text-center text-base font-bold text-white  ${
            progress === 100
              ? 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200'
              : 'bg-gray-500'
          }`}
          type="button"
          onClick={() => {
            setSelectedRoom(nameRoom);
            setProgress(0);
          }}
          disabled={progress < 100 && true}
        >
          Next Room
        </button>

        {nameRoom !== 'kitchen' && (
          <button
            className={`ml-3 mr-auto block w-1/5 rounded-full px-4 py-3.5 text-center text-base font-bold text-white  ${
              progress < 100
                ? 'bg-gray-500'
                : 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200'
            }`}
            type="button"
            onClick={() => {
              setOpenApplyInterioRooms(true);
            }}
            disabled={progress < 100 && true}
          >
            Apply Interior to All Rooms
          </button>
        )}
        {Object.keys(materialsFinishes).length > 0 && (
          <div className="flex h-fit justify-between gap-5">
            {Object.keys(materialsFinishes).map((key, i) => (
              <span
                onClick={() => {
                  setUDPLink(materialsFinishes[key].room.name);
                }}
                className={`cursor-pointer capitalize ${
                  materialsFinishes[key].room.progress === 100
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
                key={i}
                title={
                  materialsFinishes[key].room.progress === 100
                    ? 'Done'
                    : 'Not done'
                }
              >
                {materialsFinishes[key].room.name}
              </span>
            ))}
          </div>
        )}
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
                        You're settings for {nameRoom} will overwrite the
                        settings you have selected for:
                        {allRooms.map((e, i) => (
                          <p key={i} className=" font-bold capitalize">
                            {e}
                          </p>
                        ))}
                        rooms. Are you sure you want to continue?
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
                    ApplyInterioRooms();
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
