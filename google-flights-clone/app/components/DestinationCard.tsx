interface DestinationCardProps {
    city: string;
    price: string;
    dateRange: string;
    flightDetails: string;
    imageUrl: string;
}

export default function DestinationCard({
    city,
    price,
    dateRange,
    flightDetails,
    imageUrl
}: DestinationCardProps) {
    return (
        <div className="group cursor-pointer">
            {/* Card container */}
            <div className="flex justify-start lg:justify-between w-full relative overflow-hidden bg-[#202124]">
                {/* Image */}
                <div className="h-[110px] w-[150px] lg:w-[225px] rounded-lg overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={`${city} destination`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="lg:pt-[16px] w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex w-full justify-between items-baseline">
                            <h3 className="text-[#e8eaed]" style={{ fontSize: '16px' }}>{city}</h3>
                            <p className="text-[#e8eaed] text-base font-medium">
                                TRY {price}
                            </p>
                        </div>
                        <div className="flex justify-start items-start">
                            <p className="text-[#9aa0a6] text-[14px]">{dateRange}</p>
                            <p className="text-[#9aa0a6] text-[14px]">{flightDetails}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 