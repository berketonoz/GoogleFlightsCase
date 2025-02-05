import { useRef, useEffect } from 'react';

interface CabinClassDropdownProps {
  selectedClass: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (cabinClass: string) => void;
  onClose: () => void;
}

const cabinTypes = [
  'Economy',
  'Premium economy',
  'Business',
  'First'
];

export default function CabinClassDropdown({
  selectedClass,
  isOpen,
  onToggle,
  onSelect,
  onClose
}: CabinClassDropdownProps) {
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

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        className={`border-b-3 inline-flex items-center gap-x-1.5 px-3 py-2 h-[40px] text-sm text-gray-300 hover:text-white ${isOpen ? 'bg-[#8ab4f84d] border-b-3 border-b-[#8ab4f8]' : 'border-b-[#202124] md:border-b-[#37383a] hover:bg-[#282a2d]'
          }`}
        onClick={onToggle}
      >
        <span className="flex items-center gap-2 text-[14px]">
          {selectedClass}
        </span>
        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 md:left-0 md:right-auto top-[40px] max-h-[524px] min-w-full border-t-0 bg-[#303135] m-0 p-0 overflow-auto z-20'>  {/* #202124 */}
          <ul className='relative text-[#e8eaed] leading-[1.5rem] text-[1rem] tracking-[0.00625em] font-normal m-0 py-[8px] px-0 list-none'>
            {cabinTypes.map((type) => (
              <li key={type} className={`flex flex-start items-stretch relative justify-start overflow-hidden h-[48px] pr-[12px] cursor-pointer ${type === selectedClass ? 'bg-[#394457]' : ''}`} onClick={() => {
                onSelect(type);
                onClose();
              }}>
                <span className='w-[32px] h-[20px] self-center mt-0 ml-[12px] mr-0 inline-flex items-center'>
                  {type === selectedClass ? <span className='block w-[20px] h-[20px] text-[20px] text-[#bdc1c6] mx-0 cursor-default pointer-events-none box-border border-none select-none fill-[#9aa0a6]'>
                    <svg width="20" height="20" viewBox="0 0 24 24" className='fill-[#bdc1c6]'>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                    </svg>
                  </span> : <span></span>}
                </span>
                <span className='text-[#bdc1c6] overflow-ellipsis whitespace-nowrap overflow-hidden self-center flex-1 pointer-events-none'>
                  {type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 