import React, { useState , useContext , useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import {Navigate} from "react-router-dom";
import UserContext from "../Context/UserContext.js";


function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const {userInfo} = useContext(UserContext);
    const [redirect,setRedirect] = useState('');
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
        }
    }, [userInfo]);
    let noOfNights = 0;
    if(checkIn && checkOut){
        noOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) ;
    }

    async function bookplace(){
        // ev.preventDefault();
        if(!checkIn || !checkOut || !guests || !name || !phone){
            alert('Please fill all fields');
            return;
        }
        const response=await axios.post('/bookings', {
            checkIn,
            checkOut,
            guests,
            name,
            phone,
            place: place._id,
            price: noOfNights*place.price
        });
        const bookingId=response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

        if(redirect){ 
            return <Navigate to={redirect} />
        }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center font-semibold">
                Price : ₹ {place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-4 px-4">
                        <label>Check-In</label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check-Out</label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-4 px-4 border-t">
                    <label>Number of guests</label>
                    <input type="text" value={guests} onChange={ev => setGuests(ev.target.value)} />
                </div>
                {noOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                            <input type="text"
                                value={name}
                                onChange={ev => setName(ev.target.value)}/>
                        <label>Phone number:</label>
                    <input type="tel" className='bg-gray-200'
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}/>
                    </div>)}
                </div>
            <button onClick={bookplace} className="primary">
                Book Now
                {noOfNights>0 && (
                    <span className="ml-2">
                        at ₹ {noOfNights*place.price} for  {noOfNights} nights
                    </span>
                )}
            </button>
        </div>
    );
}

export default BookingWidget;
