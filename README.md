# StayInn
StayInn (To-Let Platform) | October 2024 – December 2024
Built a hotel booking platform using the MERN stack (MongoDB, Express.js, React.js, Node.js).

Integrated Razorpay for secure and seamless real-time payment processing.

Developed features like hostel/hotel listings, real-time booking confirmation, and an admin dashboard for property owners to manage their listings, bookings, and revenue.

Designed an intuitive, responsive dashboard using React and Tailwind CSS, improving usability for both users and administrators.

Implemented backend APIs for user authentication, booking management, and listing control using Node.js and Express.js, with MongoDB for database storage.

Future roadmap includes:

AI-powered stay recommendations using user behavior analysis (possibly via machine learning models integrated with the backend).

Emergency Stay Finder feature for last-minute accommodations, leveraging real-time availability checks and location-based filtering.
 A more about the flow and model control flow of the projects 
StayInn (To-Let Platform) — Project Flow and Architecture

🔹 1. User Flow:
User Side (Frontend):

Users can browse available hotels/hostels from listings.

Users select a property, choose dates, and book in real-time.

Payment is processed via Razorpay checkout; after successful payment, booking confirmation is displayed.

Users can view or cancel bookings from their profile dashboard.

Admin/Owner Side (Frontend):

Property owners log in to the dashboard.

They can add new listings, update availability, set pricing, and track current bookings and revenues.

Admin can also manage user feedbacks and booking history.

🔹 2. System Architecture (Model - Controller - Flow):
Frontend (React.js + Tailwind CSS):

Pages: Home, Listings, Booking Page, Payment Page, User Profile, Admin Dashboard.

State Management: React Context API (or Redux) for user authentication and cart/bookings.

Razorpay payment gateway integrated using Razorpay's checkout.js or Razorpay APIs.

Backend (Node.js + Express.js):

Authentication: JWT (JSON Web Tokens) based login/signup for users and owners.

APIs:

POST /api/auth/login → Login user or owner.

POST /api/listings/add → Owner adds new listing.

GET /api/listings/all → Fetch all available hostels/hotels.

POST /api/booking/create → Create a booking after payment success.

GET /api/bookings/user/:id → Fetch bookings for a user.

Payment Verification: After Razorpay payment, server verifies signature to confirm payment.

Database (MongoDB):

Collections:

Users → user details, profile, past bookings.

Listings → hotel/hostel data: images, pricing, location, rooms available, owner ID.

Bookings → booking entries: userID, listingID, booking dates, status.

Payments → transaction details for Razorpay payments.
