import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Added missing import

function IndexPage() {  
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(res => {
      setPlaces([...res.data,...res.data,...res.data]);  //! Added ...res.data,...res.data to make sure we have enough data to display on the page
    })
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} key={place._id}>  {/* Added key */}
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:8000/uploads/'+place.photos[0]} alt="Place" />
            )}
          </div>
          <h2 className="font-bold">{place.title}</h2>
          <h1 className="text-m  text-gray-7  00">{place.address}</h1>
          <div className="mt-1">
            <span className="font-bold">₹{place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}

export default IndexPage;
