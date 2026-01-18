import React, { useEffect, useState } from 'react';
import './MyBookings.css';
import Navbar from './Navbar';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setBookings(data);
        } else {
          console.error('Failed to fetch bookings:', data.message);
        }
      } catch (err) {
        console.error('Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [token]);

  // Handle clicking "Add Review" button
  const openReviewForm = (booking) => {
    if (booking.booking_status !== 'confirmed') {
      alert('You can only rate confirmed bookings.');
      return;
    }
    setSelectedBooking(booking);
    setRating(0);
    setReview('');
    setSubmitStatus('');
  };

  const closeReviewForm = () => {
    setSelectedBooking(null);
    setSubmitStatus('');
  };

  // Submit rating and review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert('Please provide a rating between 1 and 5.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          rating,
          review,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('Rating submitted successfully!');
        // Optionally, close form after delay
        setTimeout(() => {
          closeReviewForm();
        }, 2000);
      } else {
        setSubmitStatus(`Error: ${data.message || 'Failed to submit rating.'}`);
      }
    } catch (error) {
      setSubmitStatus(`Error: ${error.message}`);
    }
  };

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <>
      <Navbar />
      <div className="my-bookings-container">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property Name</th>
                <th>Location</th>
                <th>Booking Dates</th>
                <th>Persons</th>
                <th>Rooms</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.property_name}</td>
                  <td>{booking.location}</td>
                  <td>
                    {new Date(booking.start_date).toLocaleDateString()} to{' '}
                    {new Date(booking.end_date).toLocaleDateString()}
                  </td>
                  <td>{booking.num_persons}</td>
                  <td>{booking.num_rooms}</td>
                  <td>
                    {booking.booking_status === 'pending' ? (
                      <span className="status-pending">Pending</span>
                    ) : booking.booking_status === 'confirmed' ? (
                      <span className="status-confirmed">Confirmed</span>
                    ) : (
                      <span className="status-cancelled">Cancelled</span>
                    )}
                  </td>
                  <td>
                    {booking.booking_status === 'confirmed' ? (
                      <button onClick={() => openReviewForm(booking)}>Add Review</button>
                    ) : (
                      <em>--</em>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Rating / Review Form Modal */}
        {selectedBooking && (
          <div className="review-modal">
            <div className="review-content">
              <h3>
                Add Review for "{selectedBooking.property_name}" (Booking ID: {selectedBooking.id})
              </h3>
              <form onSubmit={handleSubmitReview}>
                <label>
                  Rating (1 to 5):{' '}
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                  >
                    <option value={0}>Select Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label>
                  Review:
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    rows="4"
                    required
                  />
                </label>
                <br />
                <button type="submit">Submit Review</button>
                <button type="button" onClick={closeReviewForm} style={{ marginLeft: '10px' }}>
                  Cancel
                </button>
              </form>
              {submitStatus && <p>{submitStatus}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
