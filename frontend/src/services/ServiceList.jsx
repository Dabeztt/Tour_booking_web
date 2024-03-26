import React from 'react'
import ServiceCard from './ServiceCard'

import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'
const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Tính toán Thời tiết",
        desc: "Hiển thị thông tin thời tiết hiện tại và dự báo trong tương lai. Cung cấp số liệu chính xác để giúp bạn chuẩn bị cho mọi điều kiện thời tiết.",
    },
    {
        imgUrl: guideImg,
        title: "Hướng dẫn du lịch tốt nhất",
        desc: "Khám phá những điểm đến tuyệt vời nhất với hướng dẫn du lịch chuyên nghiệp. Đánh giá và gợi ý giúp bạn có trải nghiệm du lịch đầy đủ và không quên.",
    },
    {
        imgUrl: customizationImg,
        title: "Tùy chỉnh",
        desc: "Tận hưởng trải nghiệm cá nhân hóa với các tùy chọn độc đáo. Tuỳ chỉnh để đáp ứng nhu cầu và sở thích cá nhân của bạn, tạo ra một trải nghiệm duy nhất và phù hợp với bạn.",
    },
];

const ServiceList = () => {
    return (
        <>
            {servicesData.map((item, index) => (
                <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
                    <ServiceCard item={item} />
                </Col>
            ))}
        </>
    );
};

export default ServiceList