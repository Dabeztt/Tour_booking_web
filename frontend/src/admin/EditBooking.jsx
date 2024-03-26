import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import '../styles/admin.css';

const EditBooking = () => {
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await fetch(`${BASE_URL}/booking`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch booking');
                }

                const result = await res.json();
                setBooking(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, []);

    const handleAddBooking = async () => {
        try {
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to add booking');
            }

            const newBooking = await res.json();

            setBooking([booking, newBooking]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            await fetch(`${BASE_URL}/booking/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            setBooking(booking.filter(booking => booking._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className='admin-header button-container'>
                <h2>Booking</h2>
                <button className="add-button" onClick={handleAddBooking}>Thêm</button>
            </div>
            <div className='admin-content px-3'>
                {loading ? (
                    <h2>Đang tải...</h2>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : booking.length === 0 ? (
                    <p>Không tìm thấy</p>
                ) : (
                    <ul>
                        {booking.map((booking) => (
                            <li key={booking._id}>
                                <p>Tour ID: {booking._id}</p>
                                <p>User Email: {booking.userEmail}</p>
                                <p>Tour Name: {booking.tourName}</p>
                                <p>Full Name: {booking.fullName}</p>
                                <p>Guest Size: {booking.guestSize}</p>
                                <p>Phone: {booking.phone}</p>
                                <p>Booking Date: {new Date(booking.bookAt).toLocaleDateString()}</p>
                                <button className="delete-button" onClick={() => handleDeleteBooking(booking._id)}>Xoá</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EditBooking;
