import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import '../styles/admin.css';

const EditReview = () => {
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await fetch(`${BASE_URL}/review`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const result = await res.json();
                setReview(result.data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, []);

    const handleAddReview = async () => {
        try {
            const res = await fetch(`${BASE_URL}/review`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to add review');
            }

            const newReview = await res.json();

            setReview([review, newReview]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteReview = async (id) => {
        try {
            await fetch(`${BASE_URL}/review/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            setReview(review.filter(review => review._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className='admin-header button-container'>
                <h2>Review</h2>
                <button className="add-button" onClick={handleAddReview}>Thêm</button>
            </div>
            <div className='admin-content px-3'>
                {loading ? (
                    <h2>Đang tải...</h2>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : review.length === 0 ? (
                    <p>Không tìm thấy</p>
                ) : (
                    <ul>
                        {review.map((review) => (
                            <li key={review._id}>
                                <p>Review ID: {review._id}</p>
                                <p>User: {review.username}</p>
                                <p>Review Text: {review.reviewText}</p>
                                <p>Rating: {review.rating}</p>
                                <button className="delete-button" onClick={() => handleDeleteReview(review._id)}>Xoá</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EditReview;
