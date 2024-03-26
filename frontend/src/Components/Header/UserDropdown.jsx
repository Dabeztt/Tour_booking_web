import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import userIcon from '../../assets/images/user.png';
import './UserDropdown.css';

const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                <img src={userIcon} alt="User Icon" style={{ width: '30px', height: '30px' }} />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem tag={Link} to="/user-info">
                    Thông tin cá nhân
                </DropdownItem>
                <DropdownItem tag={Link} to="/tour-booked">
                    Xem tour đã đặt
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserDropdown;
