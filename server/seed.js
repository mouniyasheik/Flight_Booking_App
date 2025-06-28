import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Booking, Flight } from './schemas.js';
dotenv.config();
await mongoose.connect(process.env.MONGO_URL);

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];
const flightNames = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'GoFirst', 'Akasa Air'];

function getRandomCity(exclude) {
  let city;
  do {
    city = cities[Math.floor(Math.random() * cities.length)];
  } while (city === exclude);
  return city;
}

function getRandomFlight() {
  return flightNames[Math.floor(Math.random() * flightNames.length)];
}

function getRandomTime(baseHour) {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 7)); // next 7 days
  date.setHours(baseHour + Math.floor(Math.random() * 5));
  date.setMinutes(0);
  return date;
}

const flights = Array.from({ length: 20 }, (_, i) => {
  const origin = cities[Math.floor(Math.random() * cities.length)];
  const destination = getRandomCity(origin);
  const departure = getRandomTime(6);
  const arrival = new Date(departure);
  arrival.setHours(arrival.getHours() + 2); // 2-hour flight

  return {
    flightName: getRandomFlight(),
    flightId: `FL${1000 + i}`,
    origin,
    destination,
    departureTime: departure,
    arrivalTime: arrival,
    totalSeats: 100,
    basePrice: Math.floor(Math.random() * 3000) + 2000
  };
});

await Flight.deleteMany({});
await Flight.insertMany(flights);
console.log('✅ Seeded 20 random flights');
process.exit();
