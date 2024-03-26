import React, { useRef, useEffect, useState } from "react";
import Booking from "./Booking.jsx";
import ThankYou from "../../Pages/ThankYou.jsx"

const PayPalCheckout = ({ totalAmount }) => {
    const paypal = useRef();
    const [transactionStatus, setTransactionStatus] = useState(null);

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Tour Booking",
                            amount: {
                                currency_code: "VND",
                                value: totalAmount.toString()
                            }
                        }
                    ]
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();

                console.log("success", order);
                setTransactionStatus("success");
            },
            onError: (err) => {
                console.log(err);
                setTransactionStatus("failure");
            }
        }).render(paypal.current);
    }, [totalAmount]);

    if (transactionStatus === "success") {
        return <ThankYou />;
    }

    if (transactionStatus === "failure") {
        return <Booking />;
    }

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default PayPalCheckout;
