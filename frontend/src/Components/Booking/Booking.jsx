import React, { useState, useContext } from 'react';
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import withFees from './FeeHOC';
import PayPalCheckout from './PayPalCheckout';

const Booking = ({ tour, avgRating, serviceFee, insuranceFee }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: "",
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    const handleChange = e => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee + insuranceFee;

    const handleClick = async e => {
        e.preventDefault();

        console.log(booking);

        try {
            if (!user || user === undefined || user === null) {
                return alert('Vui lòng đăng nhập');
            }

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            });

            const result = await res.json();

            if (!res.ok) {
                return alert(result.message);
            }
            navigate("/thank-you");

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>{price}đ <span> /người</span></h3>
                <span className="tour__rating d-flex align-items-center ">
                    <i class="ri-star-fill" > </i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            <div className="booking__form">
                <h5>Thông tin</h5>
                <Form className="booking__info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input type="text" placeholder="Họ và tên" id="fullName" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="number" placeholder="Số điện thoại" id="phone" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input type="date" placeholder="" id="bookAt" required onChange={handleChange} />
                        <input type="number" placeholder="Số khách" id="guestSize" required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            {price}đ <i class="ri-close-line"></i> 1 người
                        </h5>
                        <span>{price}đ</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Phí dịch vụ</h5>
                        <span>{serviceFee}đ</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Phí bảo hiểm</h5>
                        <span>{insuranceFee}đ</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Tổng</h5>
                        <span>{totalAmount}đ</span>
                    </ListGroupItem>
                </ListGroup>

                <PayPalCheckout onSuccess={handleClick} totalAmount={totalAmount} />
            </div>
        </div>
    )
}

export default withFees(Booking);
