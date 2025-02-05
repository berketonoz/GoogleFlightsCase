const RAPID_API_KEY = 'API_KEY';
const RAPID_API_HOST = 'sky-scrapper.p.rapidapi.com';

let searchAirportDebounceTimer: ReturnType<typeof setTimeout>;

const searchAirport = (query: string): Promise<any> => {
    if (!query || query.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        if (searchAirportDebounceTimer) {
            clearTimeout(searchAirportDebounceTimer);
        }

        searchAirportDebounceTimer = setTimeout(async () => {
            try {
                // // Check cache first
                // const cached = typeof window !== 'undefined' && localStorage.getItem(`airport-${query}`);
                // if (cached) {
                //     resolve(JSON.parse(cached));
                //     return;
                // }

                const response = await fetch(
                    `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
                    {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': RAPID_API_KEY,
                            'x-rapidapi-host': RAPID_API_HOST,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch flights');
                }

                const jsonResponse = await response.json();

                // console.log("Json response", jsonResponse);

                const airports = jsonResponse.data.filter((item: any) => item.navigation.entityType === "AIRPORT").map((item: any) => {
                    return {
                        entityId: item.entityId,
                        skyId: item.skyId,
                        title: item.presentation.title,
                        suggestionTitle: item.presentation.suggestionTitle,
                    }
                });

                resolve(airports);
            } catch (error) {
                reject(error);
            }
        }, 200); // 300ms debounce delay
    });
}

const searchFlightEverywhere = async (parameters: any) => {
    console.log(parameters);
    const data = await fetch(`https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere?originEntityId=${parameters.originEntityId}${parameters.destinationEntityId !== '' ? '&destinationEntityId=' + parameters.destinationEntityId : ''}${parameters.travelDate !== '' ? '&travelDate=' + parameters.travelDate : ''}${parameters.returnDate !== '' ? '&returnDate=' + parameters.returnDate : ''}${parameters.adults !== '' ? '&adults=' + parameters.adults : ''}${parameters.cabinClass !== '' ? '&cabinClass=' + parameters.cabinClass.toLowerCase().replace(' ', '_') : ''}${parameters.journeyType !== '' ? '&journeyType=' + parameters.journeyType : ''}${parameters.currency !== '' ? '&currency=' + parameters.currency : ''}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAPID_API_HOST,
        },
    });

    console.log(data);

    return await data.json();
}
export { searchAirport, searchFlightEverywhere };