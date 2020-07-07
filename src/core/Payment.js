import React, { useState, useEffect } from "react";
import { loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getMeToken, processPayment } from "./helper/paymenthelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

    const getToken = (userId, token) => {
        getMeToken(userId, token).then((info) => {
            console.log(info);

            if (info?.error) {
                setInfo({ ...info, error: info.error });
            } else {
                const clientToken = info.clientToken;
                setInfo({ clientToken });
            }
        });
    };

    const showBTDropin = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) =>
                                (info.instance = instance)
                            }
                        />
                        <button
                            className="btn btn-block btn-success rounded"
                            onClick={onPurchase}
                        >
                            Buy
                        </button>
                    </div>
                ) : (
                    <h3>Please Log IN or add something to class</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNounce = info.instance.requestPaymentMethod().then((data) => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount(),
            };
            processPayment(userId, token, paymentData)
                .then((response) => {
                    setInfo({
                        ...info,
                        success: response.success,
                        loading: false,
                    });
                    console.log("Payment Success");
                })
                .catch((err) => {
                    setInfo({ loading: false, success: false });
                    console.log("Payment FAILED");
                });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map((p) => {
            amount += p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3>Your Bill is {getAmount()}</h3> {showBTDropin()}
        </div>
    );
};

export default Payment;
