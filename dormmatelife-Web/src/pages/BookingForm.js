import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingForm.css';
import Navbar from '../components/Navbar';

const BookingForm = () => {
  const { state } = useLocation();
  const property = state?.property;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numPersons, setNumPersons] = useState('1');
  const [numRooms, setNumRooms] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('Easypaisa');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const token = localStorage.getItem('token');
  const baseRent = Number(property?.rent) || 0;

  useEffect(() => {
    const safeNumRooms = Number(numRooms) > 0 ? Number(numRooms) : 1;
    const safeNumPersons = Number(numPersons) > 0 ? Number(numPersons) : 1;
    setTotalAmount(baseRent * safeNumRooms * safeNumPersons);
  }, [numRooms, numPersons, baseRent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!startDate || !endDate || !paymentMethod) {
      setMessage({ type: 'error', text: 'Please fill all fields.' });
      return;
    }

    const persons = Number(numPersons);
    const rooms = Number(numRooms);
    if (!persons || persons < 1 || !rooms || rooms < 1) {
      setMessage({ type: 'error', text: 'Number of persons and rooms must be at least 1.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/bookings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: property.id,
          startDate,
          endDate,
          numPersons: persons,
          numRooms: rooms,
          amount: totalAmount,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');

      setMessage({ type: 'success', text: 'Booking successful! Booking ID: ' + data.bookingId });

      setStartDate('');
      setEndDate('');
      setNumPersons('1');
      setNumRooms('1');
      setPaymentMethod('Easypaisa');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="booking-form-container">
        <h2>Book Property: <span style={{ color: '#2e8b57' }}>{property?.name}</span></h2>
        <form onSubmit={handleSubmit}>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </label>

          <label>
            Number of Persons:
            <input
              type="number"
              min="1"
              value={numPersons}
              onChange={e => setNumPersons(e.target.value)}
              required
            />
          </label>

          <label>
            Number of Rooms:
            <input
              type="number"
              min="1"
              value={numRooms}
              onChange={e => setNumRooms(e.target.value)}
              required
            />
          </label>

          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              required
            >
              <option value="Easypaisa">Easypaisa</option>
              <option value="Upaisa">Upaisa</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </label>

          <p>
            <strong>Total Amount:</strong>{' '}
            {totalAmount.toLocaleString()} PKR
          </p>

          <button type="submit" disabled={loading}>
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>

        {message && (
          <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
            {message.text}
          </p>
        )}
      </div>
    </>
  );
};

export default BookingForm;
