import React, { useEffect, useState } from 'react';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import ForKitchen from '@components/RoomsForm/ForKitchen';
import ForAnyRooms from '@components/RoomsForm/ForAnyRooms';
import { CSSTransition } from 'react-transition-group';
import { updateMaterialsFinishes } from '~/reducer/materialsFinishes';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';
import { setFormStep } from '~/reducer/trackProgress';

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
  const [progress, setProgress]: [
    ProgressState,
    React.Dispatch<React.SetStateAction<ProgressState>>
  ] = useState(0);
  const [newStep, setNewStep] = useState<number>(0);
  const [newOption, setNewOption] = useState<object>({});
  const [openApplyInterioRooms, setOpenApplyInterioRooms] =
    useState<boolean>(false);
  const [kitchenQuestion, setKitchenQuestion] = useState<boolean>(false);
  const [checkMaterialsFinishes, setCheckMaterialsFinishes] = useState<object>(
    {}
  );
  const dispatch = useDispatch();

  const { materialsFinishes } = useSelector(
    (state: RootState) => state.materialsFinishesReducer
  );

  const { formStep } = useSelector((state: RootState) => state.progressChange);

  //Functions
  const nextStep = (e: number, o?: object) => {
    nextProgress(e, o);
    //                  newOption({ hasDiffUpLower: false });

    if (o && o.hasOwnProperty('hasDiffUpLower')) {
      dispatch(setFormStep(2));
    } else {
      dispatch(setFormStep(formStep + 1));
    }
    if (nameRoom === 'kitchen' && formStep === 3 && kitchenQuestion === false) {
      setKitchenQuestion(true);
      dispatch(setFormStep(0));
    }
    console.log('formStep', formStep);
    /* if (materialStep === 2) {
      done(true);
    } */
  };
  const ApplyInterioRooms = () => {
    const keys = materialsFinishes as Array<any>;
    const currentProps = Object.keys(materialsFinishes)
      .map((key) => {
        if (
          keys[key].room.name === nameRoom &&
          keys[key].room.progress === 100
        ) {
          return keys[key].room.props;
        }
      })
      .filter((item) => item !== undefined); //I get all the props from the object
    //update all the rooms with the same props
    allRooms.forEach((room) => {
      dispatch(updateMaterialsFinishes(room, currentProps[0], 100));
    });
    setOpenApplyInterioRooms(false);
  };
  const ListCurrectRooms = () => {
    const keys = materialsFinishes as Array<any>;
    return (
      <div className="mt-4 flex h-fit w-full justify-center gap-5">
        {Object.keys(materialsFinishes).map((key, i) => (
          <span
            onClick={() => {
              setUDPLink(keys[key].room.name);
            }}
            className={`cursor-pointer rounded-full px-3 capitalize ${
              keys[key].room.progress === 100
                ? 'bg-green-200 text-green-600'
                : 'bg-red-200 text-red-600'
            }`}
            key={i}
            title={keys[key].room.progress === 100 ? 'Done' : 'Not done'}
          >
            {keys[key].room.name}
          </span>
        ))}
      </div>
    );
  };
  const nextProgress = (e?: number, option?: object) => {
    if (e) {
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
    }
    if (!e && option) {
      dispatch(updateMaterialsFinishes(nameRoom, option, progress));
    }
  };

  //Use Effect
  /* useEffect(() => {
    
    console.log('setMaterialProgressStep', selectedRoom);
  }, [selectedRoom]); */
  useEffect(() => {
    setCheckMaterialsFinishes(materialsFinishes);
  }, [materialsFinishes]);
  useEffect(() => {
    dispatch(setFormStep(0));
  }, [nameRoom]);
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
            checkMaterialsFinishes={checkMaterialsFinishes}
            newStep={setNewStep}
            newOption={setNewOption}
          />
        ) : (
          <ForAnyRooms
            nameRoom={nameRoom}
            checkMaterialsFinishes={checkMaterialsFinishes}
            newStep={setNewStep}
            newOption={setNewOption}
          />
        )}
      </div>
      {/* Footer form */}
      <div className="mt-5 flex	flex-wrap items-center justify-between">
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
        {progress < 90 && (
          <button
            className={`block w-1/5 rounded-full  px-8 py-3.5 text-center text-base font-bold text-white  ${
              newStep > 0
                ? 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-200'
                : 'bg-gray-500'
            }`}
            type="button"
            onClick={() => {
              nextStep(newStep, newOption);
              setNewOption({});
              setNewStep(0);
            }}
            disabled={newStep > 0 ? false : true}
          >
            Next Step
          </button>
        )}
        {Object.keys(materialsFinishes).length > 0 && <ListCurrectRooms />}
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
                        You`re settings for {nameRoom} will overwrite the
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
