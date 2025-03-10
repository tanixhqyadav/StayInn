import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../utils/PlaceGallery";
import BookingDates from "../utils/BookingDates";
import AddressLink from "../utils/AddressLink";

function SingleBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  const handlePayment = async () => {
    try {
      // ✅ Step 1: Create an order on the backend
      const { data } = await axios.post("/payments/orders", {
        amount: booking.price * 100, // Convert to paisa (Razorpay requirement)
        currency: "INR",
      });

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ Ensure this is set in .env
        amount: data.amount,
        currency: data.currency,
        name: "Airbnb Clone",
        description: "Payment for your stay",
        order_id: data.order_id,
        handler: async function (response) {
          alert("Payment Successful!");
          await axios.get(`/payments/payment/${response.razorpay_payment_id}`);
          setIsPaid(true); // ✅ Mark payment as complete
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in Payment", error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div
        className={`p-6 my-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
          isPaid ? "bg-green-500 text-white" : "bg-primary"
        }`}
      >
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="p-6 rounded-2xl text-center">
          <div>Total price</div>
          <div className="text-3xl">₹{booking.price}</div>
          {!isPaid ? (
            <button
              onClick={handlePayment}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Pay Now
            </button>
          ) : (
            <div className="text-xl font-semibold">Booked</div>
          )}
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default SingleBooking;
