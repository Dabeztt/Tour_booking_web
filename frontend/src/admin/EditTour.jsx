import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import '../styles/admin.css';

const EditTour = () => {
    const [tour, setTour] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch tours');
                }

                const result = await res.json();
                setTour(result.data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTour();
    }, []);

    const handleAddTour = async () => {
        try {
            const res = await fetch(`${BASE_URL}/tours`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to add tours');
            }

            const newTour = await res.json();

            setTour([tour, newTour]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditTour = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/tours/${id}`, {
                method: 'PUT',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to edit tours');
            }

            const updatedTour = await res.json();

            setTour(tour.map(tour => tour._id === id ? updatedTour : tour));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteTour = async (id) => {
        try {
            await fetch(`${BASE_URL}/tours/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            setTour(tour.filter(tour => tour._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className='admin-header button-container'>
                <h2>Tour</h2>
                <button className="add-button" onClick={handleAddTour}>Thêm</button>
            </div>
            <div className='admin-content px-3'>
                {loading ? (
                    <h2>Đang tải...</h2>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : tour.length === 0 ? (
                    <p>Không tìm thấy</p>
                ) : (
                    <ul>
                        {tour.map((tour) => (
                            <li key={tour._id}>
                                <p>Tour ID: {tour._id}</p>
                                <p>Title: {tour.title}</p>
                                <p>City: {tour.city}</p>
                                <p>Address: {tour.address}</p>
                                <p>Distance: {tour.distance}</p>
                                <p>Photo: {tour.photo}</p>
                                <p>Description: {tour.desc}</p>
                                <p>Price: {tour.price}</p>
                                <p>Max Group Size: {tour.maxGroupSize}</p>
                                <p>Featured: {tour.featured ? 'Yes' : 'No'}</p>
                                <button className="edit-button" onClick={() => handleEditTour(tour._id)}>Sửa</button>
                                <button className="delete-button" onClick={() => handleDeleteTour(tour._id)}>Xoá</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EditTour;
