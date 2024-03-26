import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import '../styles/tour-booked.css';

const TourBooked = () => {
    const [bookedTours, setBookedTours] = useState([]);

    useEffect(() => {
        const fetchBookedTours = async () => {
            try {
                const res = await fetch(`${BASE_URL}/booking`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch booked tours');
                }

                const result = await res.json();
                setBookedTours(result.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchBookedTours();
    }, []);

    const handleDeleteBookedTour = async (id) => {
        try {
            await fetch(`${BASE_URL}/booking/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            // Sử dụng callback function để đảm bảo rằng state mới được cập nhật dựa trên state trước đó
            setBookedTours(prevBookedTours => prevBookedTours.filter(tour => tour._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='tourBooked'>
            <h1>Các tour đã đặt</h1>
            <ul>
                {bookedTours.map((tour) => (
                    <li key={tour._id}>
                        <p>Tour Name: {tour.tourName}</p>
                        <p>Full Name: {tour.fullName}</p>
                        <p>Guest Size: {tour.guestSize}</p>
                        <p>Phone: {tour.phone}</p>
                        <p>Booking Date: {new Date(tour.bookAt).toLocaleDateString()}</p>
                        <button className="cancelButton" onClick={() => handleDeleteBookedTour(tour._id)}>Huỷ tour</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourBooked;
