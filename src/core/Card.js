import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
    const cardTitle = product ? product.name : "Default Title";
    const cardDescription = product
        ? product.description
        : "Default Description";
    const cardPrice = product ? product.price : "Default price";

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={() => {}}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {}}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        );
    };

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                <div className="rounded border border-success p-2">
                    <ImageHelper product={product} />
                </div>
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">
                    $ {cardPrice}
                </p>
                <div className="row">
                    <div className="col-12">{showAddToCart(addToCart)}</div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
