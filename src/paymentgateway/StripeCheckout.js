import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "../core/helper/CartHelper";
import { Link } from "react-router-dom";

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

    const showStripeButton = () => {
        return isAutheticated() ? (
            <button className="btn btn-success rounded">Pay with Stripe</button>
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
