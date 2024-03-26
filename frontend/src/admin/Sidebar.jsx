import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import logo from '../assets/images/logo.png'

const Sidebar = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <div className='bg-white sidebar p-2'>
            <div className="m-2">
                <img src={logo} alt="" style={{ width: '200px', height: 'auto' }} />
            </div>
            <hr className='text-dark' />
            <div className='list-group list-group-flush'>
                <Link to="/admin/tour" className='list-group-item py-2'>
                    <i className='bi bi-map fs-5 me-3'></i>
                    Tour
                </Link>
                <Link to="/admin/user" className='list-group-item py-2'>
                    <i className='bi bi-person fs-5 me-3'></i>
                    User
                </Link>
                <Link to="/admin/booking" className='list-group-item py-2'>
                    <i className='bi bi-file-earmark-text fs-5 me-3'></i>
                    Booking
                </Link>
                <Link to="/admin/review" className='list-group-item py-2'>
                    <i className='bi bi-chat-dots fs-5 me-3'></i>
                    Review
                </Link>
            </div>
            <hr className='text-dark' />
            <div className="mt-auto">
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm ">
                    <i className='bi bi-box-arrow-left fs-5 me-3'></i>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
