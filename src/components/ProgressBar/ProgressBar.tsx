import React from 'react';

type Props = {
  progressPercentage: number;
};

const ProgressBar: React.FC<Props> = ({ progressPercentage }) => {
  return (
    <div className="mb-5 h-2.5 w-6/12 rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        style={{ width: `${progressPercentage}%` }}
        className="h-2.5 rounded-full bg-blue-500"
      ></div>
    </div>
  );
};

export default ProgressBar;
