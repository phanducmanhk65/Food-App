import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RestaurantManagement = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState({});

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurant/all`);
            setRestaurants(response.data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const handleCreateRestaurant = async (newRestaurant) => {
        try {
            const response = await axios.post("http://localhost:3000/restaurant/create", newRestaurant);
            setRestaurants([...restaurants, response.data]);
        } catch (error) {
            console.error("Error creating restaurant:", error);
        }
    };

    const handleDeleteRestaurant = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/restaurant/delete/${id}`);
            const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
            setRestaurants(updatedRestaurants);
        } catch (error) {
            console.error("Error deleting restaurant:", error);
        }
    };

    const handleEditRestaurant = (restaurant) => {
        setEditing(true);
        setCurrentRestaurant(restaurant);
    };

    const handleUpdateRestaurant = async (id, updatedRestaurant) => {
        try {
            const response = await axios.patch(
                `http://localhost:3000/restaurant/updateres/${id}`,
                updatedRestaurant
            );

            setRestaurants((prevRestaurants) =>
                prevRestaurants.map((restaurant) => (restaurant.id === id ? response.data : restaurant))
            );

            setEditing(false);
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setCurrentRestaurant({});
    };

    return (
        <div className="container mt-4">
            <h1>Restaurant Management</h1>
            <div className="d-flex p-3">
                {editing ? (
                    <EditRestaurantForm
                        currentRestaurant={currentRestaurant}
                        onUpdateRestaurant={handleUpdateRestaurant}
                        onCancelEdit={handleCancelEdit}
                    />
                ) : (
                    <>
                        <AddRestaurantForm onCreateRestaurant={handleCreateRestaurant} />
                        {restaurants && restaurants.length > 0 && (
                            <RestaurantList
                                restaurants={restaurants}
                                onDeleteRestaurant={handleDeleteRestaurant}
                                onEditRestaurant={handleEditRestaurant}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const AddRestaurantForm = ({ onCreateRestaurant }) => {
    const [restaurant, setRestaurant] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateRestaurant({ ...restaurant });
        setRestaurant({
            name: "",
            address: "",
            phone: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Restaurant Name"
                    value={restaurant.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={restaurant.address}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={restaurant.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Add Restaurant
            </button>
        </form>
    );
};

const EditRestaurantForm = ({ currentRestaurant, onUpdateRestaurant, onCancelEdit }) => {
    const [restaurant, setRestaurant] = useState(currentRestaurant);

    useEffect(() => {
        setRestaurant(currentRestaurant);
    }, [currentRestaurant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant((prevRestaurant) => ({
            ...prevRestaurant,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateRestaurant(currentRestaurant.id, restaurant);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={restaurant.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="address"
                    value={restaurant.address}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="phone"
                    value={restaurant.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Update Restaurant
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                Cancel
            </button>
        </form>
    );
};

const RestaurantList = ({ restaurants, onDeleteRestaurant, onEditRestaurant }) => {
    return (
        <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
            <colgroup>
                <col style={{ width: "7%" }} />
                <col style={{ width: "40%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "13%" }} />
            </colgroup>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {restaurants.map((restaurant) => (
                    <tr key={restaurant.id}>
                        <td>{restaurant.id}</td>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.address}</td>
                        <td>{restaurant.phone}</td>
                        <td>
                            <button onClick={() => onEditRestaurant(restaurant)} className="btn btn-info">
                                Edit
                            </button>
                            <button
                                onClick={() => onDeleteRestaurant(restaurant.id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RestaurantManagement;
