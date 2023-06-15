import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/store';
import {
  setJobLocation,
  setCabinets,
  setJobQuoteOn,
  setCountertops,
  setDrawingsFile,
} from '~/reducer/jobQuestions';
import CheckBox from '@components/inputs/CheckBox';
import FileUpload from '@components/FileUpload';
import { useRouter } from 'next/router';

type Props = {
  handleStepChange: (step: number) => void;
};

const JobQuestionsForm: React.FC<Props> = ({ handleStepChange }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
 const {
  jobLocation,
  jobQuoteOn,
  cabinets,
  countertops,
} = useSelector((state: RootState) => state.jobQuestions);

  const [localJobLocation, setJobLoc] = useState(jobLocation);
  const [localJobQuoteOn, setJobOn] = useState(jobQuoteOn);
  const [localCabinets, setCab] = useState(cabinets);
  const [localCountertops, setCtops] = useState(countertops);
  const [localDrawingsFile, setLocalDrawingsFile] = useState(null);
  const [locationError, setLocationError] = useState(false);


  useEffect(() => {
    dispatch(setDrawingsFile(localDrawingsFile))
  }, [localDrawingsFile]);
  
  
   const handleJobLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobLoc(event.target.value);
    dispatch(setJobLocation(event.target.value));
    setLocationError(false);
  };
  const handleJobQuoteOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJobOn(event.target.value);
    dispatch(setJobQuoteOn(event.target.value));
  };

  const handleCabinetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCab(event.target.checked);
    dispatch(setCabinets(event.target.checked));
  };
  const handleCountertopsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCtops(event.target.checked);
    dispatch(setCountertops(event.target.checked));
  };
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
     if (!localJobLocation) {
      setLocationError(true);
      return;
    }
    if (Router.pathname === '/') {
      Router.push('/kitchen?step=2')
    } else {
    handleStepChange(2);
    }
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
            className={`w-full appearance-none rounded-full border border-gray-200 bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 ${
              locationError ? 'border-red-500' : ''
            }`}
            onChange={handleJobLocationChange}
          />
          {locationError && (
            <p className="mt-2 text-sm text-red-500">Please enter a job location</p>
          )}
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
            <CheckBox
              checkedBox={localCabinets}
              onChangeBox={handleCabinetsChange}
            />

            <label
              htmlFor="cabinets"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Countertops
            </label>
          </div>
          {/* Countertops */}
          <div className="flex items-center">
            <CheckBox
              checkedBox={localCountertops}
              onChangeBox={handleCountertopsChange}
            />

            <label
              htmlFor="cabinets"
              className=" py-3.5 text-lg font-bold text-gray-500"
            >
              Cabinets
            </label>
          </div>
          {/* Has Drawings */}
          <div className="relative items-center">
            <div className="flex flex-col py-3.5">
             
              
               
                <p className="text-left text-xs">
                  If you upload drawings, you will have the option to skip most
                  of the questions in this form. With drawings, we can get the
                  measurements and the design answers directly from the
                  document.
                </p>
                  <div className="w-full">
                <form className="space-6 my-3 flex w-full flex-col items-center 	">
                  <label className="block">
                    <span className="sr-only">
                      Select files to upload (accept most file types)
                    </span>
                   
                      <FileUpload onUploadSuccess={setLocalDrawingsFile} />
                  </label>
                </form>

               
              </div>
            </div>

         
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 md:px-16"
      >
        Save and Continue
      </button>
    </form>
  );
};

export default JobQuestionsForm;
