# Flight-Booking-APP--MERN-Stack
Category: Fullstack Development - MERN

**Skills Required:**
- HTML
- CSS
- React.js
- Node.js
- Express.js
- MongoDB

**Project Overview:**

- The **Flight Booking App** is a web platform that simplifies the process of booking flights. Users can search for flights, make bookings, and process payments with ease. Admins can manage bookings, add new flights, and monitor user activity. The app is built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
 

**Key Features:**
- User-Friendly Interface: Easily search for flights based on destination, time, and seat availability.
- Admin Controls: Admin can manage flight listings, bookings, and monitor activity.

**ER Diagram Breakdown:**
-  The Flight Booking ER-Diagram illustrates the relationships between the following entities:
 
   - **USER:** Represents customers who book flights. A customer can place multiple bookings.
   - **BOOKING:** Represents a specific flight booking, including flight details and passenger information. A customer can have multiple bookings.
   - **FLIGHT:** Represents available flights, including flight details. Users can book flights based on seat availability.
   - **ADMIN:** The admin manages the backend operations, including overseeing bookings, adding new flights, etc.

**Project Structure:**
- **Client Directory (Frontend):**
  -   Built with **React.js** for dynamic UI, containing:
       -         src/:        # React components and logic.
       -         public/:        # Static files like images and HTML.
       -         package.json:        # Manages dependencies and scripts.
    
- **Server Directory (Backend):**
    - Built with **Node.js** and **Express.js** for the backend, containing:
      -          models/:        # Database models for flights, users, bookings.
      -          routes/:        # API routes for handling requests.
      -          controllers/:        # Logic for handling API requests.
      -          server.js:        # Main server file.
    
**Application Flow:**
- **User Flow:**
  -   1.**Account Creation:** Users create an account to start booking.
  -   2.**Search Flights:** Search for flights by destination, time, and seat preference.
  -   3.**Book Flight:** Select a flight and seat, then complete the booking.
  -   4.**Booking Management:** Option to cancel bookings.
  
- **Admin Flow:**
  -   1.**Manage Bookings:** Admin can view, approve, or cancel bookings.
  -   2.**Add New Flights:** Admin can add and update flight details.
  -   3.**Monitor User Activity:** Admin can view user actions for efficient management.
  
**Project Flow:**
  - 1.**Project Setup:** Initial configuration of frontend and backend.
  - 2.**Backend Development:** Setting up database and server routes.
  - 3.**Frontend Development**: Building the user interface with React.
  - 4.**Implementation:** Combining backend and frontend to deploy the working app.
