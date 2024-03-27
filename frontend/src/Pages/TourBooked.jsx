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

            setBookedTours(bookedTours.filter(bookedTours => bookedTours._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='tourBooked'>
            <h1>Các tour đã đặt</h1>
            <ul>
                {bookedTours.map((booked) => (
                    <li key={booked._id}>
                        <p>Tour Name: {booked.tourName}</p>
                        <p>Full Name: {booked.fullName}</p>
                        <p>Guest Size: {booked.guestSize}</p>
                        <p>Phone: {booked.phone}</p>
                        <p>Booking Date: {new Date(booked.bookAt).toLocaleDateString()}</p>
                        <button className="cancelButton" onClick={() => handleDeleteBookedTour(booked._id)}>Huỷ tour</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourBooked;
