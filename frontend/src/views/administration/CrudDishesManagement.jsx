import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DishesManagement = () => {
  const [dishes, setDishes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentDish, setCurrentDish] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dish/findByRes", {
        withCredentials: true,
      });
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleCreateDish = async (newDish) => {
    try {
      const priceAsNumber = parseFloat(newDish.price);
      const idRestaurantAsNumber = parseInt(newDish.idRestaurant);
      if (!isNaN(priceAsNumber) && !isNaN(idRestaurantAsNumber)) {
        const dishWithNumberValues = {
          ...newDish,
          price: priceAsNumber,
          idRestaurant: idRestaurantAsNumber,
        };
        const response = await axios.post(
          "http://localhost:3000/dish/create",
          dishWithNumberValues,
          {
            withCredentials: true,
          }
        );
        setDishes([...dishes, response.data]);
      } else {
        console.error("Invalid price or idRestaurant value:", newDish);
      }
    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/dish/delete/${id}`, {
        withCredentials: true,
      });
      const updatedDishes = dishes.filter((dish) => dish.id !== id);
      setDishes(updatedDishes);
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleEditDish = (dish) => {
    setEditing(true);
    setCurrentDish(dish);
  };

  const handleUpdateDish = async (id, updatedDish) => {
    try {
      const priceAsNumber = parseFloat(updatedDish.price);
      const idRestaurantAsNumber = parseInt(updatedDish.idRestaurant);

      if (isNaN(priceAsNumber) || isNaN(idRestaurantAsNumber)) {
        console.error("Invalid price or idRestaurant value:", updatedDish);
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/dish/update`,
        {
          ...updatedDish,
          price: priceAsNumber,
          idRestaurant: idRestaurantAsNumber,
        },
        {
          withCredentials: true,
        }
      );

      setDishes((prevDishes) =>
        prevDishes.map((dish) => (dish.id === id ? response.data : dish))
      );
      setEditing(false);
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentDish({});
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Dishes Management</h1>
      <input
        type="text"
        placeholder="Search for dishes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3 w-25 p-3"
      />
      <div className="d-flex p-3">
        {editing ? (
          <EditDishForm
            currentDish={currentDish}
            onUpdateDish={handleUpdateDish}
            onCancelEdit={handleCancelEdit}
            editing={editing}
          />
        ) : (
          <>
            <AddDishForm onCreateDish={handleCreateDish} />
            {filteredDishes && filteredDishes.length > 0 && (
              <DishList
                dishes={filteredDishes}
                onDeleteDish={handleDeleteDish}
                onEditDish={handleEditDish}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const AddDishForm = ({ setDishes, dishes }) => {
  const [dish, setDish] = useState({
    name: "",
    price: 1,
    imageUrl: "",
    idRestaurant: 1,
    productline: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setDish({
      name: "",
      price: 1,
      imageUrl: "",
      idRestaurant: 1,
      productline: "",
    });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", dish.name);
    formData.append("price", dish.price);
    formData.append("idRestaurant", dish.idRestaurant);
    formData.append("productline", dish.productline);
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/dish/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDishes([...dishes, response.data]);
      resetForm();
      setSuccessMessage("Dish successfully added!");
    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            value={dish.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={dish.price}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="productline"
            placeholder="Product Line"
            value={dish.productline}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Dish
        </button>
      </form>
    </div>
  );
};

const EditDishForm = ({
  currentDish,
  onUpdateDish,
  onCancelEdit,
  editing,
  handleFileChange,
}) => {
  const [dish, setDish] = useState(currentDish);

  useEffect(() => {
    setDish(currentDish);
  }, [currentDish, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateDish(currentDish.id, dish);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={dish.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={dish.price}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="productline"
          value={dish.productline}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Dish
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onCancelEdit}
      >
        Cancel
      </button>
    </form>
  );
};

const DishList = ({ dishes, onDeleteDish, onEditDish }) => {
  return (
    <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: "7%" }} />
        <col style={{ width: "40%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "12%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>ID Restaurant</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dishes.map((dish) => (
          <tr key={dish.id}>
            <td>{dish.id}</td>
            <td>
              <img
                src={dish.imageUrl}
                alt={dish.name}
                style={{ width: "250px" }}
              />
            </td>
            <td>{dish.name}</td>
            <td>${dish.price}</td>
            <td>{dish.idRestaurant}</td>
            <td>
              <button onClick={() => onEditDish(dish)} className="btn btn-info">
                Edit
              </button>
              <button
                onClick={() => onDeleteDish(dish.id)}
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

export default DishesManagement;
