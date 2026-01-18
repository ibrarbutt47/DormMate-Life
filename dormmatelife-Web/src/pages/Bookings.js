import React, { useEffect, useState } from 'react';
import './Bookings.css';
import ListPropertyHome from '../components/ListPropertyHome';
import Navbar from '../components/Navbar';
const Bookings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings/owner', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        console.error('Failed to fetch bookings:', data.message);
      }
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/confirm/${bookingId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert('Booking confirmed!');
        fetchBookings(); // Refresh orders list
      } else {
        alert('Failed to confirm booking: ' + data.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
  <>
  <Navbar/>
  <ListPropertyHome/>
    <div className="owner-orders-container">
      <h2>Booking Orders</h2>
      {orders.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Property</th>
              <th>Dates</th>
              <th>Persons</th>
              <th>Rooms</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name}</td>
                <td>{order.property_name}</td>
                {/* <td>{order.start_date} to {order.end_date}</td> */}
                   <td>
                    {new Date(order.start_date).toLocaleDateString()} to{' '}
                    {new Date(order.end_date).toLocaleDateString()}
                  </td>
                <td>{order.num_persons}</td>
                <td>{order.num_rooms}</td>
                <td>
                  {order.booking_status === 'pending'
                    ? 'Pending'
                    : <span className="status-confirmed">Confirmed</span>}
                </td>
                <td>
                  {order.booking_status === 'pending' ? (
                    <button
                      onClick={() => confirmBooking(order.id)}
                      className="confirm-btn"
                    >
                      Confirm
                    </button>
                  ) : (
                    <span className="status-confirmed">Confirmed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default Bookings;
