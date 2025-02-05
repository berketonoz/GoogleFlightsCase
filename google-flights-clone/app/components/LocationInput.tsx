import { useState, useEffect, useRef } from 'react';
import { searchAirport } from '../services/FlightAPI';
import { AirplaneIcon } from './icons';
interface LocationInputProps {
  label: string;
  value: {
    title: string;
    skyId: string;
    entityId: string;
    suggestionTitle: string;
    isOrigin: boolean;
  };
  icon: React.ReactElement;
  onChange: (value: {
    title: string;
    skyId: string;
    entityId: string;
    suggestionTitle: string;
  }) => void;
  className?: string;
  isOrigin?: boolean;
}

export default function LocationInput({
  label,
  value,
  icon,
  onChange,
  className = '',
  isOrigin
}: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   searchAirport(value.title).then((data) => {
  //     if (data.length > 0) {
  //       setSuggestions(data.map((item: any) => {
  //         return {
  //           entityId: item.entityId,
  //           skyId: item.skyId,
  //           title: item.title,
  //           suggestionTitle: item.suggestionTitle,
  //         }
  //       }));
  //     } else {
  //       setSuggestions([]);
  //     }
  //   });
  // }, [value.title]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: any) => {
    suggestion = {
      entityId: suggestion.entityId,
      skyId: suggestion.skyId,
      title: suggestion.title.split(' ')[0],
      suggestionTitle: suggestion.suggestionTitle,
    }
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{ overflow: 'hidden', position: 'relative', flex: "1 1 100px" }}>
      <div>
        <div className='block relative'>
          <div>
            <div>
              <div className='text-[16px] text-[#9aa0a6] h-[56px] rounded-[4px] relative z-0'>
                <input
                  placeholder={label}
                  type="text"
                  value={value.title}
                  style={{
                    padding: isOrigin ? "8px 16px 8px 52px" : "8px 16px 8px 60px",
                    appearance: "none",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    backgroundClip: "text",
                    backgroundColor: "transparent",
                    border: "1px solid #5f6368",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    color: "#e8eaed",
                    outline: "none",
                    width: "100%",
                    font: "inherit",
                    height: "100%",
                    letterSpacing: "inherit",
                  }}
                  onChange={(e) => {
                    const newValue = {
                      ...value,
                      title: e.target.value,
                      // Only reset these if the input is manually changed
                      ...(e.target.value !== value.title && {
                        skyId: '',
                        entityId: '',
                        suggestionTitle: ''
                      })
                    };
                    onChange(newValue);
                  }} />
                <div style={{
                  paddingRight: "24px",
                  borderRadius: "4px",
                  paddingLeft: "52px",
                  alignItems: "center",
                  boxSizing: "border-box",
                  color: "#dadce0",
                  display: "flex",
                  left: "1px",
                  overflow: "hidden",
                  position: "absolute",
                  right: "1px",
                  top: "0",
                  whiteSpace: "nowrap",
                  zIndex: "-1",
                  lineHeight: "150%",
                  font: "inherit",
                  height: "100%",
                  letterSpacing: "inherit",
                }}>
                  <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                    <span className='opacity-0'>{value.title || ''}</span>
                    &nbsp;
                    <span style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      letterSpacing: "0.3px",
                      lineHeight: "16px",
                      color: "#9aa0a6",
                      display: "contents",
                    }}>{value.skyId || ''}</span>
                  </div>
                </div>
                {isOrigin ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" focusable="false" style={{
                    margin: "4px",
                    left: "24px",
                    color: "#9aa0a6",
                    position: "absolute",
                    top: "16px",
                    fill: "currentColor",
                    flexShrink: "0",
                  }}>
                    <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"></path>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" style={{
                    color: "#9aa0a6",
                    left: "24px",
                    position: "absolute",
                    top: "16px",
                    fill: "currentColor",
                    flexShrink: "0",
                  }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
                    <circle cx="12" cy="9" r="2.5"></circle>
                  </svg>
                )}
                <div style={{
                  border: "1px solid #5f6368",
                  borderRadius: "50%",
                  boxSizing: "border-box",
                  height: "36px",
                  position: "absolute",
                  top: "10px",
                  width: "36px",
                  right: isOrigin ? "-22px" : "auto",
                  left: isOrigin ? "auto" : "-22px",
                }} className='bg-[#202124] md:bg-[#37383a]'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );

  {/* <div ref={wrapperRef} className={`w-full flex items-center h-[56px] rounded-sm border-1 border-[#707275] px-4 hover:border-[#a3a8ae] focus-within:border-[#8ab4f8] relative ${className}`}>
      <div className="flex-shrink-0">
        {icon}
      </div>

      <div className="flex-grow ml-1 relative">
        <input
          type="text"
          value={value.title || ''}
          onChange={(e) => onChange({ 
            title: e.target.value,
            skyId: '',
            entityId: '',
            suggestionTitle: ''
          })}
          onFocus={() => setShowSuggestions(true)}
          placeholder={label}
          className="absolute inset-0 w-full bg-transparent text-[#e8eaed] placeholder-[#9aa0a6] text-base focus:outline-none focus:ring-0 z-10"
        />
        <div className="w-full text-base pointer-events-none">
          {value.title ? (
            <div className="flex items-center gap-1">
              <span className="text-transparent">{value.title}</span>
              {value.skyId && (
                <span className="text-[#9aa0a6] text-sm">({value.skyId})</span>
              )}
            </div>
          ) : (
            <span className="text-transparent">{label}</span>
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[52px] bg-[#202124] border border-[#5f6368] rounded-sm max-h-60 overflow-y-auto z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-2 py-2 hover:bg-[#303134] cursor-pointer text-[#e8eaed]"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <AirplaneIcon />
              {suggestion.title}
              <span className="text-xs text-[#9aa0a6]">{suggestion.skyId}</span>

            </div>
          ))}
        </div>
      )}
    </div> */}
} 