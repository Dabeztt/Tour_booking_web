import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import '../styles/admin.css';

const EditUser = () => {
    const [user, setUser] = useState([]);
    const [editFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [editingUserId, setEditingUserId] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${BASE_URL}/users`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }

                const result = await res.json();
                setUser(result.data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${BASE_URL}/users`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }

                const result = await res.json();
                setUser(result.data);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    
    const handleAddUser = async () => {
        try {
            //Thêm người dùng mới 
            const res = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                credentials: 'include',
                // Truyền dữ liệu của người dùng mới từ state vào body của request
                body: JSON.stringify(editFormData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Failed to add user');
            }
            //Lấy dữ liệu của người dùng vừa thêm vào từ response
            const newUser = await res.json();
            //Cập nhật state user, thêm người dùng mới vào mảng user hiện tại
            setUser([...user, newUser]);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await fetch(`${BASE_URL}/users/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            setUser(user.filter(user => user._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className='admin-header button-container'>
                <h2>User</h2>
                <button className="add-button" onClick={handleAddUser}>Thêm</button>
            </div>
            <div className='admin-content px-3'>
                {loading ? (
                    <h2>Đang tải...</h2>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : user.length === 0 ? (
                    <p>Không tìm thấy</p>
                ) : (
                    <ul>
                        {user.map(user => (
                            <li key={user._id}>
                                <p>User ID: {user._id}</p>
                                <p>Username: {user.username}</p>
                                <p>Email: {user.email}</p>
                                <p>Password: {user.password}</p>
                                <p>Role: {user.role}</p>
                                {/* <button className="edit-button" onClick={() => handleEditUser(user._id)}>Sửa</button> */}
                                <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Xoá</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EditUser;
