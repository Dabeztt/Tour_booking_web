import React, { useContext } from 'react';
import '../styles/user-info.css'
import { AuthContext } from '../context/AuthContext';
import userIcon from '../assets/images/user.png';

const UserInfo = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='UserInfo'>
            <h2>Thông tin tài khoản</h2>
            <div className="AvatarContainer">
                <img src={userIcon} alt="User Icon" />
            </div>
            <p>Tên người dùng: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserInfo;
