import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountNav from '../utils/AccountNav';
import PlaceImg from '../utils/PlaceImg';
import BookingDates from '../utils/BookingDates';

function BookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then((res) => {
      setBookings(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AccountNav />
      <div className="max-w-4xl mx-auto mt-6 space-y-6">
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                <PlaceImg place={booking.place} />
              </div>

              <div className="flex flex-col justify-between flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800">{booking.place.title}</h2>
                <div className="text-gray-600 mt-2">
                  <BookingDates booking={booking} className="text-gray-500" />
                </div>

                <div className="flex items-center gap-2 text-gray-900 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-xl font-bold">₹ {booking.price}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-center text-lg">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
