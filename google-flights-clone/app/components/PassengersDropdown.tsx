import { useRef, useEffect } from 'react';

interface Passengers {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface PassengersDropdownProps {
  passengers: Passengers;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (type: keyof Passengers, delta: number) => void;
  onClose: () => void;
}

export default function PassengersDropdown({
  passengers,
  isOpen,
  onToggle,
  onUpdate,
  onClose
}: PassengersDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getTotalPassengers = () => {
    return Object.values(passengers).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        className={`border-b-3 inline-flex items-center px-2 py-1 h-[40px] text-sm text-gray-300 hover:text-white ${isOpen ? 'bg-[#8ab4f84d] border-b-3 border-b-[#8ab4f8]' : 'border-b-[#202124] md:border-b-[#37383a] hover:bg-[#282a2d]'
          }`}
        onClick={onToggle}
      >
        <span className="flex items-center gap-2 w-12 text-[14px]">
          <svg width='20px' height='20px' viewBox="0 0 24 24" className='fill-[#9aa0a6]'>
            <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
          </svg>
          {getTotalPassengers()}
        </span>
        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute md:right-auto z-50 mt-1 w-56 md:w-72 rounded-md bg-[#313131] shadow-lg ring-1 ring-black ring-opacity-5 pt-[16px] px-[16px]">
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300">Adults</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdate('adults', -1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  −
                </button>
                <span className="w-4 text-center text-gray-300">{passengers.adults}</span>
                <button
                  onClick={() => onUpdate('adults', 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300">Children</div>
                <div className="text-sm text-gray-400">Aged 2-11</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdate('children', -1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  −
                </button>
                <span className="w-4 text-center text-gray-300">{passengers.children}</span>
                <button
                  onClick={() => onUpdate('children', 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants in seat */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300">Infants</div>
                <div className="text-sm text-gray-400">In seat</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdate('infantsInSeat', -1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  −
                </button>
                <span className="w-4 text-center text-gray-300">{passengers.infantsInSeat}</span>
                <button
                  onClick={() => onUpdate('infantsInSeat', 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants on lap */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300">Infants</div>
                <div className="text-sm text-gray-400">On lap</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdate('infantsOnLap', -1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  −
                </button>
                <span className="w-4 text-center text-gray-300">{passengers.infantsOnLap}</span>
                <button
                  onClick={() => onUpdate('infantsOnLap', 1)}
                  className="w-8 h-8 flex items-center justify-center rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between p-[15px]">
              <button
                className="text-blue-400 hover:text-blue-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="text-blue-400 hover:text-blue-300"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 