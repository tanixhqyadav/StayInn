import React ,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../utils/AccountNav';
import axios from 'axios';

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  
    
  return (
    <>
    <div>
      <AccountNav/>
        <div className='text-center' >
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full ' to={'/account/places/new'} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add new Place
        </Link>
      </div>
    <div>
    {places.length > 0 && places.map((place, index) => (
  <Link to={'/account/places/'+place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 m-4 rounded-2xl' key={place._id || index}>
    <div className='w-32 h-32 bg-gray-500 flex-none'>
      {place.photos?.[0] ? (
        <img className='object-cover w-full h-full' src={`http://localhost:8000/uploads/${place.photos[0]}`} alt={place.title || 'Place'} />
      ) : (
        <div className='bg-gray-300 w-full h-full flex items-center justify-center'>No Image</div>
      )}
    </div>
    <div className='flex-1'>
      <h2 className='text-xl font-bold'>{place.title || 'No Title'}</h2>
      <p className='text-sm mt-2'>{place.description || 'No Description Available'}</p>
    </div>
  </Link>
))}

    </div>
    </div>
    </>
  )
}

export default PlacesPage