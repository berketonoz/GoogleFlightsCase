import DestinationCard from './DestinationCard';

const destinations = [
  {
    city: 'Tokyo',
    price: '22,432',
    dateRange: 'Mar 7 — Mar 13',
    flightDetails: '2 stops · 23 hr 35 min',
    imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLnIToEgwiM_jV3cbw5eQZoUAIg6XqdrJAiClDyyg0w-JBSRN5ZeOT-iFb3SvwkwP1uoBCmT-gKE5VcyCYf-xq4guL4NAFICSaNyOnYOA'
  },
  {
    city: 'Paris',
    price: '4,583',
    dateRange: 'May 24 — Jun 1',
    flightDetails: 'Nonstop · 3 hr 50 min',
    imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSyQJ-woNs0iO22mPSkmRUM5gcsTbbYeypQ6BBTeFxXr90mqTxZl57Fdq2CDuLn4w7cKZ8TT9_zZhOpF57rIpA7yWKQnqKvkKIf9Y-qJDo'
  },
  {
    city: 'Rome',
    price: '3,770',
    dateRange: 'Apr 17 — Apr 23',
    flightDetails: '1 stop · 2 hr 45 min',
    imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRM_5snkSVZsnpG8dhW0NGx_Pdwk592nbBjmyqu-UxZDclvuBr6HXfXd0Fm7TYGVQpVCCr4RC6TGTmOgyP6KwpvZr0tGGnpZ7ukzP8RPLA'
  },
  {
    city: 'Dubai',
    price: '4,728',
    dateRange: 'May 11 — May 17',
    flightDetails: 'Nonstop · 4 hr 40 min',
    imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDaD8FERvoI4iorjkWbED9zAq7S3m9hD1t5vGNU5Jznr1Kl1em9SIs9c9VkujJF5_EDvC5mKyqcQ9B8PApW9tiwfzhK_pC2qvRBND2Plo'
  }
];

export default function DestinationGrid() {
  return (
    <div className="flex gap-[32px] w-full flex-col md:flex-row">
      {destinations.map((destination, index) => (
        <DestinationCard
          key={index}
          {...destination}
        />
      ))}
    </div>
  );
} 