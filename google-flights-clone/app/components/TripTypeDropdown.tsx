import { useRef, useEffect } from 'react';
import { ChevronDownIcon, RoundTripIcon, OneWayIcon, MultiCityIcon } from './icons';

interface TripType {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface TripTypeDropdownProps {
  selectedType: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (type: string) => void;
  onClose: () => void;
}

const tripTypes: TripType[] = [
  { id: 'round_trip', label: 'Round trip', Icon: RoundTripIcon },
  { id: 'one_way', label: 'One way', Icon: OneWayIcon },
  { id: 'multi_city', label: 'Multi-city', Icon: MultiCityIcon },
];

export default function TripTypeDropdown({
  selectedType,
  isOpen,
  onToggle,
  onSelect,
  onClose
}: TripTypeDropdownProps) {
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

  const selectedTrip = tripTypes.find(type => type.id === selectedType);
  const SelectedIcon = selectedTrip?.Icon;

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        className={`border-b-3 inline-flex items-center gap-x-1.5 px-2 h-[40px] rounded-md hover:text-white ${isOpen ? 'bg-[#8ab4f84d] border-b-3 border-b-[#8ab4f8]' : 'border-b-[#202124] md:border-b-[#37383a] hover:bg-[#282a2d]'
          }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 text-[14px] ">
          <span className='w-[20px] h-[20px] mx-[8px] text-[20px] cursor-default pointer-events-none inline-block box-border border-none'>
            {SelectedIcon && <SelectedIcon />}
          </span>
          {selectedTrip?.label}
        </div>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div className='absolute left-0 top-[40px] max-h-[524px] min-w-full border-t-0 bg-[#303135] m-0 p-0 overflow-auto z-20'>  {/* #202124 */}
          <ul className='relative text-[#e8eaed] leading-[1.5rem] text-[1rem] tracking-[0.00625em] font-normal m-0 py-[8px] px-0 list-none'>
            {tripTypes.map((type) => (
              <li key={type.id} className={`flex flex-start items-stretch relative justify-start overflow-hidden h-[48px] pr-[12px] cursor-pointer ${type.id === selectedType ? 'bg-[#394457]' : ''}`} onClick={() => {
                onSelect(type.id);
                onClose();
              }}>
                <span className='w-[32px] h-[20px] self-center mt-0 ml-[12px] mr-0 inline-flex items-center'>
                  {type.id === selectedType ? <span className='block w-[20px] h-[20px] text-[20px] text-[#bdc1c6] mx-0 cursor-default pointer-events-none box-border border-none select-none fill-[#9aa0a6]'>
                    <svg width="20" height="20" viewBox="0 0 24 24" className='fill-[#bdc1c6]'>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                    </svg>
                  </span> : <span></span>}
                </span>
                <span className='text-[#bdc1c6] overflow-ellipsis whitespace-nowrap overflow-hidden self-center flex-1 pointer-events-none'>
                  {type.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        // <div className="absolute z-50 mt-1 w-full rounded-md bg-[#313131] shadow-lg">
        //   {tripTypes.map((type) => (
        //     <button
        //       key={type.id}
        //       className={`flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 ${type.id === selectedType ? 'bg-[#8ab4f84d]' : ''}`}
        //       onClick={() => {
        //         onSelect(type.id);
        //         onClose();
        //       }}
        //     >
        //       {type.id === selectedType && (
        //         <span className="absolute left-2">✓</span>
        //       )}
        //       <span className="ml-3 flex items-center gap-2 whitespace-nowrap text-[14px]">
        //         {type.label}
        //       </span>
        //     </button>
        //   ))}
        // </div>
      )}
    </div>
  );
} 