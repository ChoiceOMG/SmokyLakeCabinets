import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';
import {
  setJobLocation,
  setCabinets,
  setJobQuoteOn,
  setCountertops,
  setDrawings,
  setDrawingsFile,
  setFinishQ,
} from '~/reducer/jobQuestions';

type Props = {
  handleStepChange: (step: number) => void;
};
/* interface FileState {
  file: File | null;
} */
const JobQuestionsForm: React.FC<Props> = ({ handleStepChange }) => {
  const dispatch = useDispatch();
  const {
    jobLocation,
    jobQuoteOn,
    cabinets,
    countertops,
    hasDrawings,
    hasDrawingsFile,
    finishQ,
  } = useSelector((state: RootState) => state.jobQuestionsConfig);
  console.log('jobLocation', jobLocation);
  console.log('cabinets', cabinets);
  const [localJobLocation, setJobLoc] = useState(jobLocation);
  const [localJobQuoteOn, setJobOn] = useState(jobQuoteOn);
  const [localCabinets, setCab] = useState(cabinets);
  const [localCountertops, setCtops] = useState(countertops);
  const [localHasDrawings, setDs] = useState(hasDrawings);
  //const [fileDrawing, setFileDrawing] = useState<FileState>({ file: null });
  const [fileDrawing, setFileDrawing] = useState(hasDrawingsFile);
  const [finish, setFinish] = useState(finishQ);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ file: event.target.files![0] });
    setFileDrawing({ file: event.target.files![0] || null });
  };
  const handleJobLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJobLoc(event.target.value);
  };
  const handleJobQuoteOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJobOn(event.target.value);
  };

  const handleCabinetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCab(event.target.checked);
  };
  const handleCountertopsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCtops(event.target.checked);
  };
  const handleHasDrawingsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDs(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setJobLocation(localJobLocation));
    dispatch(setJobQuoteOn(localJobQuoteOn));
    dispatch(setCabinets(localCabinets));
    dispatch(setCountertops(localCountertops));
    dispatch(setDrawings(localHasDrawings));
    /*   dispatch(
      setDrawingsFile({
        file: fileDrawing,
        lastModifiedDate: new Date(),
      })
    ); */
    dispatch(setFinishQ(finish));

    handleStepChange(2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="-m-3 flex flex-col">
        <div className="w-full p-3">
          <label
            className="mb-2 block text-left text-sm font-bold text-gray-500"
            htmlFor="jobLocation"
          >
            Job Location:
          </label>
          <input
            type="text"
            id="jobLocation"
            value={localJobLocation}
            className="w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
            onChange={handleJobLocationChange}
          />
        </div>
        <div className="w-full p-3">
          <label
            className="mb-2 block text-left text-sm font-bold text-gray-500"
            htmlFor="jobLocation"
          >
            Describe this job:
          </label>
          <input
            type="text"
            id="jobQuoteOn"
            value={localJobQuoteOn}
            className="w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
            onChange={handleJobQuoteOnChange}
          />
        </div>

        <div className="w-full p-3">
          <p className="mb-2 block text-left text-sm font-bold text-gray-500">
            Check all that apply:
          </p>
          {/* Cabinets */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cabinets"
              className="absolute h-6 w-6 opacity-0"
              checked={localCabinets}
              onChange={handleCabinetsChange}
            />
            <div
              className={clsx(
                'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                localCabinets
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200  bg-gray-100'
              )}
            >
              <svg
                width="9"
                height="7"
                viewBox="0 0 9 7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.603516 3.77075L2.68685 5.85409L7.89518 0.645752"
                  stroke={clsx(localCabinets ? 'white' : 'gray-200')}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <label
              htmlFor="cabinets"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Countertops
            </label>
          </div>
          {/* Countertops */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cabinets"
              className="absolute h-6 w-6 opacity-0"
              checked={localCountertops}
              onChange={handleCountertopsChange}
            />
            <div
              className={clsx(
                'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                localCountertops
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200  bg-gray-100'
              )}
            >
              <svg
                width="9"
                height="7"
                viewBox="0 0 9 7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.603516 3.77075L2.68685 5.85409L7.89518 0.645752"
                  stroke={clsx(cabinets ? 'white' : 'gray-200')}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <label
              htmlFor="cabinets"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Cabinets
            </label>
          </div>
          {/* Has Drawings */}
          <div className="flex flex-wrap items-center	">
            <input
              type="checkbox"
              id="hasDrawings"
              className="absolute h-6 w-6 opacity-0"
              checked={localHasDrawings}
              onChange={handleHasDrawingsChange}
            />

            <div
              className={clsx(
                'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
                localHasDrawings
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-200  bg-gray-100'
              )}
            >
              <svg
                width="9"
                height="7"
                viewBox="0 0 9 7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.603516 3.77075L2.68685 5.85409L7.89518 0.645752"
                  stroke={clsx(localHasDrawings ? 'white' : 'gray-200')}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <label
              htmlFor="hasDrawings"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Has Drawings
            </label>
            {localHasDrawings && (
              <div className="w-full">
                <form className="space-6 mb-3 flex w-full flex-col items-center 	">
                  <label className="block">
                    <span className="sr-only">
                      Select files to upload (accept most file types)
                    </span>
                    <input
                      type="file"
                      className="block w-full text-sm text-slate-500
      file:mr-4 file:rounded-full file:border-0
      file:bg-violet-50 file:py-2
      file:px-4 file:text-sm
      file:font-semibold file:text-violet-700
      hover:file:bg-violet-100
    "
                      onChange={handleFileChange}
                    />
                  </label>
                </form>

                {fileDrawing && (
                  <div className="mx-auto mb-3">
                    <p className="py-1 text-sm font-bold text-gray-500">
                      Would you like to skip to finishes?
                    </p>
                    <button
                      type="submit"
                      className=" m-auto block rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 md:px-16"
                      onClick={() => setFinish(true)}
                    >
                      Skip to Finishes
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 md:px-16"
        onClick={() => setFinish(false)}
      >
        Save and Continue
      </button>
    </form>
  );
};

export default JobQuestionsForm;
