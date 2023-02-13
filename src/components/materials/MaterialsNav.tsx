import clsx from 'clsx';
import React from 'react';

export default function MaterialsNav({
  children,
  selectedRoom,
  setSelectedRoom,
  rooms,
}: {
  children: React.ReactNode;
  selectedRoom: string | undefined;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string>>;
  rooms: string[];
}) {
  const handleRoomSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    const room = e.currentTarget.textContent;
    if (room) {
      setSelectedRoom(room);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5">
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-auto lg:block">
              <ul className="flex items-center justify-center">
                {rooms.map((room) => (
                  <li key={room}>
                    <button
                      className={clsx(
                        selectedRoom ? 'text-gray-500' : 'text-gray-900',
                        'inline-block  rounded-lg p-3.5 text-lg font-bold capitalize hover:bg-slate-100 hover:text-slate-900'
                      )}
                      onClick={handleRoomSelected}
                    >
                      {room}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
