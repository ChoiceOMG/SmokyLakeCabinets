import React from 'react';
import clsx from 'clsx';
type SwitchProps = {
  checkedBox: boolean;
  onChangeBox: any;
  id?: string | null;
};
export default function CheckBox({
  checkedBox,
  onChangeBox,
  id = null,
}: SwitchProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id ? id : new Date().getTime().toString()}
        className="absolute top-0 left-0 h-6 w-6 cursor-pointer opacity-0"
        checked={checkedBox}
        onChange={onChangeBox}
      />
      <div
        className={clsx(
          'mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md  text-transparent',
          checkedBox
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
            stroke={clsx(checkedBox ? 'white' : 'gray-200')}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
}
