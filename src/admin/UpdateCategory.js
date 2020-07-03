import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAutheticated();

    const preload = (categoryId) => {
        getCategory(categoryId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setName(data.name);
            }
        });
    };
    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const goBack = () => (
        <div className="mt-5">
            <Link
                className="btn btn-sm btn-info mb-3 rounded"
                to="/admin/categories"
            >
                Category List
            </Link>
        </div>
    );

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // BACKEND REQUEST FIRED

        updateCategory(match.params.categoryId, user._id, token, { name }).then(
            (data) => {
                if (data.error) {
                    setError(true);
                    console.log(data.error);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            }
        );
    };

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success"> Category updated successfully</h4>
            );
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-danger"> Failed to update category</h4>;
        }
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update the Category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. : Summer"
                />
                <button
                    onClick={onSubmit}
                    className="btn btn-outline-info rounded"
                >
                    Update Category
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Create a category"
            description="Add a new category for new tshirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
