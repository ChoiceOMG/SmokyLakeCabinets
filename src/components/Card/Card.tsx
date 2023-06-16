import React from 'react';
type Props = {
  title?: string;
  img?: string;
  className?: string;
};

const Card: React.FC<Props> = ({ img, title, className }) => {
  return (
    <div className={`max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      {img && <img className="rounded-t-lg" src={img} alt="" />}

      {title && (
        <div className="p-5">
          <p className="mb-3 text-left font-normal text-gray-500 dark:text-gray-400">
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
