import * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const RoundTripIcon = () => (
  <span className='mx-[8px] w-[20px] h-[20px] text-[#9aa0a6] cursor-default pointer-events-none inline-block'>
    <svg enableBackground='0 0 24 24' viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
      <g>
        <rect fill='none' height='24' width='24' x='0'></rect>
      </g>
      <g>
        <polygon points="8.41,12.41 7,11 2,16 7,21 8.41,19.59 5.83,17 21,17 21,15 5.83,15"></polygon>
        <polygon points="15.59,11.59 17,13 22,8 17,3 15.59,4.41 18.17,7 3,7 3,9 18.17,9"></polygon>
      </g>
    </svg>
  </span>
);

export const CalendarIcon = ({ className = "w-5 h-5 text-[#9aa0a6]" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export const PersonIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const LocationFromIcon = ({ className = "w-6 h-6 text-[#a3a8ae]" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="8" cy="12" r="5" stroke="currentColor" strokeWidth="3" fill="none" />
  </svg>
);

export const LocationToIcon = ({ className = "w-6 h-6 text-[#a3a8ae]" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2C7.589 2 4 5.589 4 10c0 5.618 7.105 11.671 7.404 11.912.299.241.893.241 1.192 0C12.895 21.671 20 15.618 20 10c0-4.411-3.589-8-8-8z" />
  </svg>
);

export const LoadingSpinnerIcon = ({ className = "h-5 w-5 text-[#202124]" }: IconProps) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const OneWayIcon = () => (
  <svg className='w-[20px] h-[20px] text-[20px] fill-[#bdc1c6]' width='20' height='20' viewBox="0 0 24 24" focusable="false">
    <path d="M16.79 7.79l-1.41 1.42L17.17 11H3v2h14.17l-1.79 1.79 1.41 1.42L21 12z"></path>
  </svg>
);

export const MultiCityIcon = () => (
  <svg className="w-[20px] h-[20px] text-[20px] fill-[#bdc1c6]" viewBox="0 0 24 24" focusable="false">
    <path d="M11,8c0,0.55-0.45,1-1,1S9,8.55,9,8s0.45-1,1-1S11,7.45,11,8z M6,7C5.45,7,5,7.45,5,8s0.45,1,1,1s1-0.45,1-1S6.55,7,6,7z M14,17c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1s-1,0.45-1,1C13,16.55,13.45,17,14,17z M15.59,5.41L17.17,7L13,7v2l4.17,0l-1.59,1.59 L17,12l4-4l-4-4L15.59,5.41z M8.41,18.59L6.83,17L11,17v-2l-4.17,0l1.59-1.59L7,12l-4,4l4,4L8.41,18.59z M18,17c0.55,0,1-0.45,1-1 c0-0.55-0.45-1-1-1s-1,0.45-1,1C17,16.55,17.45,17,18,17z"></path>
  </svg>
);

export const AirplaneIcon = ({ className = "w-4 h-4 text-[#e8eaed]" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

