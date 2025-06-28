import React, { useContext, useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {

  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();

  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('userType') === 'admin'){
      navigate('/admin');
    } else if(localStorage.getItem('userType') === 'flight-operator'){
      navigate('/flight-admin');
    }
  }, [navigate]);

  const [Flights, setFlights] = useState([]);
  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const fetchFlights = async () => {
    if (checkBox) {
      if (departure && destination && departureDate && returnDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        const date2 = new Date(returnDate);
        if (date1 > date && date2 > date1) {
          setError("");
          const response = await axios.get('http://localhost:6001/fetch-flights');
          setFlights(response.data);
        } else {
          setError("Please check the dates");
        }
      } else {
        setError("Please fill all the inputs");
      }
    } else {
      if (departure && destination && departureDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        if (date1 >= date) {
          setError("");
          const response = await axios.get('http://localhost:6001/fetch-flights');
          setFlights(response.data);
        } else {
          setError("Please check the dates");
        }
      } else {
        setError("Please fill all the inputs");
      }
    }
  }

  const handleTicketBooking = (id, origin, destination) => {
    if (userId) {
      if (origin === departure) {
        setTicketBookingDate(departureDate);
        navigate(`/book-flight/${id}`);
      } else if (destination === departure) {
        setTicketBookingDate(returnDate);
        navigate(`/book-flight/${id}`);
      }
    } else {
      navigate('/auth');
    }
  }

  const formatDate = (datetime) => {
    return new Date(datetime).toISOString().split('T')[0];
  }

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">Take Off on an Unforgettable Flight Booking Journey!</h1>
          <p className="banner-p">Fulfill your travel dreams with extraordinary flight bookings that take you to unforgettable destinations and ignite your spirit of adventure like never before.</p>     
        </div>

        <div className="Flight-search-container input-container mb-4">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=>setCheckBox(e.target.checked)} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Return journey</label>
          </div>

          <div className='Flight-search-container-body'>
            <div className="form-floating">
              <select className="form-select form-select-sm mb-3" value={departure} onChange={(e)=>setDeparture(e.target.value)}>
                <option value="" disabled>Select</option>
                {/* Cities */}
                {["Chennai", "Banglore", "Hyderabad", "Mumbai", "Indore", "Delhi", "Pune", "Trivendrum", "Bhopal", "Kolkata", "varanasi", "Jaipur"].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <label>Departure City</label>
            </div>

            <div className="form-floating">
              <select className="form-select form-select-sm mb-3" value={destination} onChange={(e)=>setDestination(e.target.value)}>
                <option value="" disabled>Select</option>
                {/* Cities */}
                {["Chennai", "Banglore", "Hyderabad", "Mumbai", "Indore", "Delhi", "Pune", "Trivendrum", "Bhopal", "Kolkata", "varanasi", "Jaipur"].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <label>Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input type="date" className="form-control" value={departureDate} onChange={(e)=>setDepartureDate(e.target.value)}/>
              <label>Journey date</label>
            </div>

            {checkBox &&
              <div className="form-floating mb-3">
                <input type="date" className="form-control" value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}/>
                <label>Return date</label>
              </div>
            }

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>
          </div>

          <p>{error}</p>
        </div>

        {Flights.length > 0 &&
          <div className="availableFlightsContainer">
            <h1>Available Flights</h1>
            <div className="Flights">
              {
                Flights.filter(flight => {
                  const flightDate = formatDate(flight.departureTime);
                  if (checkBox) {
                    return (
                      (flight.origin === departure && flight.destination === destination && flightDate === departureDate) ||
                      (flight.origin === destination && flight.destination === departure && flightDate === returnDate)
                    );
                  } else {
                    return (
                      flight.origin === departure &&
                      flight.destination === destination &&
                      flightDate === departureDate
                    );
                  }
                }).length > 0 ?
                  Flights.filter(flight => {
                    const flightDate = formatDate(flight.departureTime);
                    if (checkBox) {
                      return (
                        (flight.origin === departure && flight.destination === destination && flightDate === departureDate) ||
                        (flight.origin === destination && flight.destination === departure && flightDate === returnDate)
                      );
                    } else {
                      return (
                        flight.origin === departure &&
                        flight.destination === destination &&
                        flightDate === departureDate
                      );
                    }
                  }).map((Flight) => (
                    <div className="Flight" key={Flight._id}>
                      <div>
                        <p><b>{Flight.flightName}</b></p>
                        <p><b>Flight Number:</b> {Flight.flightId}</p>
                      </div>
                      <div>
                        <p><b>Start :</b> {Flight.origin}</p>
                        <p><b>Departure Time:</b> {Flight.departureTime}</p>
                      </div>
                      <div>
                        <p><b>Destination :</b> {Flight.destination}</p>
                        <p><b>Arrival Time:</b> {Flight.arrivalTime}</p>
                      </div>
                      <div>
                        <p><b>Starting Price:</b> {Flight.basePrice}</p>
                        <p><b>Available Seats:</b> {Flight.totalSeats}</p>
                      </div>
                      <button className="button btn btn-primary" onClick={()=>handleTicketBooking(Flight._id, Flight.origin, Flight.destination)}>Book Now</button>
                    </div>
                  ))
                  :
                  <h4>No Flights Found</h4>
              }
            </div>
          </div>
        }

        <section id="about" className="section-about  p-4">
          <div className="container">
            <h2 className="section-title">About Us</h2>
            <p className="section-description">
              &nbsp;&nbsp;&nbsp;&nbsp;Welcome to Flight Finder Ticket Booking app, where we're committed to delivering a seamless travel experience from beginning to end...
            </p>
            <span><h5>2025 Flight Finder - &copy; All rights reserved</h5></span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage;
