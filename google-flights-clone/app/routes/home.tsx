import { useState, useRef, useEffect } from 'react';
import type { Route } from "./+types/home";
import LocationInput from '../components/LocationInput';
// import DateInput from '../components/DateInput';
import TripTypeDropdown from '../components/TripTypeDropdown';
import PassengersDropdown from '../components/PassengersDropdown';
import CabinClassDropdown from '../components/CabinClassDropdown';
import { LocationFromIcon, LocationToIcon } from '../components/icons';
import DateInput from '~/components/DateInput';
import { searchAirport, searchFlightEverywhere } from '../services/FlightAPI';
import GoogleMaps from '~/components/GoogleMaps';
import DestinationGrid from '~/components/DestinationGrid';
import Flights from '~/components/Flights';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Flight Search - Google Flights Clone" },
    { name: "description", content: "Search for flights across the world" },
  ];
}

const mapLocations = ['Istanbul', 'Bursa', 'Tekirdag', 'Edremit'];

export default function Home() {
  const [tripType, setTripType] = useState('round_trip');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0
  });
  const [cabinClass, setCabinClass] = useState('Economy');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [isCabinOpen, setIsCabinOpen] = useState(false);
  const [fromLocation, setFromLocation] = useState<any>({ title: '', skyId: '', entityId: '' });
  const [toLocation, setToLocation] = useState<any>({ title: '', skyId: '', entityId: '' });
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMapLocation, setSelectedMapLocation] = useState('Istanbul');
  const [swapRotation, setSwapRotation] = useState(0);

  const tripTypeRef = useRef<HTMLDivElement>(null);
  const passengersRef = useRef<HTMLDivElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Trip Type dropdown
      if (tripTypeRef.current && !tripTypeRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      // Passengers dropdown
      if (passengersRef.current && !passengersRef.current.contains(event.target as Node)) {
        setIsPassengersOpen(false);
      }
      // Cabin dropdown
      if (cabinRef.current && !cabinRef.current.contains(event.target as Node)) {
        setIsCabinOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFrom = localStorage.getItem('fromLocation');
      if (storedFrom) {
        setFromLocation(storedFrom);
      }
    }
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const parameters = {
        originEntityId: fromLocation.entityId,
        destinationEntityId: toLocation.entityId,
        travelDate: departureDate ? departureDate.toISOString().split('T')[0] : '',
        returnDate: returnDate ? returnDate.toISOString().split('T')[0] : '',
        adults: passengers.adults,
        cabinClass: cabinClass,
        journeyType: tripType,
        currency: 'USD'
      }

      console.log("Parameters: ", parameters);

      const flightsRawJson = await searchFlightEverywhere(parameters);

      console.log(flightsRawJson);

      const flights = flightsRawJson.data.results.map((flight: any) => ({
        toLocation: flight.location.name,
        image: flight.location.image,
      }));

      setFlights(flights);
    } catch (err) {
      setError('Failed to fetch flight results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="relative flex items-end justify-center w-full mb-[40px]">
        <img
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
          alt="Flights illustration"
          className="max-w-[1248px] min-w-[568px] object-cover"
        />
        <span className="absolute left-0 right-0 text-center text-[36px] lg:text-[56px] text-white translate-y-[10px]">
          Flights
        </span>
      </div>
      <div className="max-w-[1024px] mx-auto flex flex-col">
        <div className="relative mb-[8px]">
          <div className="flight-search-form bg-[#202124] md:bg-[#37383a]">
            <div className="input-dropdowns-box">
              <div className='input-dropdowns-trip-type'>
                <TripTypeDropdown
                  selectedType={tripType}
                  isOpen={isDropdownOpen}
                  onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                  onSelect={setTripType}
                  onClose={() => setIsDropdownOpen(false)}
                />
              </div>

              <div className='input-dropdowns-passengers'>
                <PassengersDropdown
                  passengers={passengers}
                  isOpen={isPassengersOpen}
                  onToggle={() => setIsPassengersOpen(!isPassengersOpen)}
                  onUpdate={(type, delta) => {
                    const newValue = passengers[type] + delta;
                    if (newValue >= 0) {
                      setPassengers({ ...passengers, [type]: newValue });
                    }
                  }}
                  onClose={() => setIsPassengersOpen(false)}
                />
              </div>

              <CabinClassDropdown
                selectedClass={cabinClass}
                isOpen={isCabinOpen}
                onToggle={() => setIsCabinOpen(!isCabinOpen)}
                onSelect={setCabinClass}
                onClose={() => setIsCabinOpen(false)}
              />
            </div>

            <div className='input-fields-container'>
              {/* Location Inputs */}
              <div className='location-input-container'>
                <LocationInput
                  label="Where from?"
                  value={fromLocation}
                  onChange={setFromLocation}
                  icon={<LocationFromIcon />}
                  isOrigin={true}
                />

                <div>
                  <button className='swap-locations-button'
                    disabled={!(fromLocation.title && toLocation.title)}
                    onClick={() => {
                      const temp = fromLocation;
                      setFromLocation(toLocation);
                      setToLocation(temp);
                      if (fromLocation.title && toLocation.title) {
                        setSwapRotation(prev => prev + 180);
                      }
                    }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" style={{
                      transform: `rotate(${swapRotation}deg)`,
                      transition: 'transform 0.5s ease',
                      fill: (fromLocation.title && toLocation.title) ? "#4a90e2" : "#d3d3d3"
                    }}>
                      <path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM7 20l1.41-1.41L5.83 16H13v-2H5.83l2.58-2.59L7 10l-5 5 5 5z"></path>
                    </svg>
                  </button>
                </div>

                <LocationInput
                  label="Where to?"
                  value={toLocation}
                  onChange={setToLocation}
                  icon={<LocationToIcon />}
                  isOrigin={false}
                />
              </div>

              {/* Date Selection */}
              <div className='date-input-container'>
                <div className='w-full h-full'>
                  <DateInput tripType={tripType} />
                </div>
              </div>
            </div>

            <div className="absolute flex left-0 right-0 justify-center translate-y-[10px] md:translate-y-[26px]">
              <button
                onClick={handleSearch}
                className="bg-[#8ab4f8] text-[#202124] call-to-action-button"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        <div className="relative mb-[16px] py-[0px] px-[16px]">
          <section className='mt-[36px]'>
            <h2 className='mb-[8px]'><span className='text-[20px] text-[#e8eaed] font-medium'>Find cheap flights from İstanbul to anywhere</span></h2>
            <div className='mt-[14px] mb-[-2px] p-0'>
              <div className='relative w-full'>
                <div className='overflow-hidden w-full'>
                  <div className='pb-[20px] mb-[-20px] list-none relative flex h-full max-w-full overflow-y-hidden'>
                    {mapLocations.map((location) => (
                      <li className={`cheap-flights ${selectedMapLocation === location ? 'active' : ''}`} key={location} onClick={() => setSelectedMapLocation(location)}>
                        {location}
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='m-0'>
            <GoogleMaps />
            <Flights />
          </section>
        </div>

        {/* <div className="mt-8 flex flex-col items-center w-full">
          <DestinationGrid />
        </div> */}
      </div>
    </>
  );
}
