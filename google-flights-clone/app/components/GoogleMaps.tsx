function GoogleMaps() {
    return (
        <div className='mt-0'>
            <div className='google-maps-container'>
                <div className='google-map'></div>
                <div className='google-map-explore'>
                    <button className='google-map-explore-button'>
                        <span>Explore destinations</span>
                    </button>
                </div>
            </div>
        </div>
        // <div className="w-full h-60 md:h-80">
        //     <iframe
        //         className="w-full h-full rounded-xl"
        //         style={{ border: 0 }}
        //         referrerPolicy="no-referrer-when-downgrade"
        //         src="https://www.google.com/maps/embed/v1/view?key={API_KEY}&center=0,0&zoom=2"
        //         allowFullScreen
        //     >
        //     </iframe>
        // </div>
    )
}

export default GoogleMaps