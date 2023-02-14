import React from 'react';

function Card() {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <img className="rounded-t-lg" src="/images/kitchen.jpg" alt="" />

      <div className="p-5">
        <p className="mb-3 text-left font-normal text-gray-500 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
}

export default Card;
