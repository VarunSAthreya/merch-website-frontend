import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "../core/helper/CartHelper";
import { Link } from "react-router-dom";
import StripeGateway from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "../core/helper/orderhelper";

const StripeCheckout = ({
    products,
    setReload = (f) => f,
    reload = undefined,
}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: "",
    });

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;

    useEffect(() => {}, []);

    const getFinalPrice = () => {
        var amount = 0;
        products.map((product) => {
            amount += product.price;
        });
        return amount;
    };

    const makePayment = (token) => {
        const body = {
            token,
            products,
        };
        const headers = {
            "Content-Type": "application/json",
        };
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => {
                console.log(response);
                const { status } = response;
                console.log("STATUS", status);
            })
            .catch((err) => console.log(err));
    };

    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeGateway
                stripeKey="pk_test_51H1Cw9EUqn7XzXigmB7RKLTzZHEtdR8Kpv3sLlDQOAwckuVaWWzHbD23KJBxQtgm7i9mh1AwWW485a4MpcE4L30V00tDFpi8qK"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy T-shirts"
                currency="USD"
                billingAddress
                shippingAddress
            >
                <button className="btn btn-success rounded">
                    Pay with Stripe
                </button>
            </StripeGateway>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning rounded">Signin</button>
            </Link>
        );
    };

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;
