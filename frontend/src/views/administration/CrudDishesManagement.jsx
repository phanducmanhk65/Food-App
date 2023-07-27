import React, { useState, useEffect } from "react";
import axios from "axios";

const initialDishes = [
  // {
  //   id: 1,
  //   name: "Bún Chả",
  //   price: 10,
  //   image:
  //     "https://i-giadinh.vnecdn.net/2023/04/16/Buoc-11-Thanh-pham-11-7068-1681636164.jpg",
  // },
  // {
  //   id: 2,
  //   name: "Cơm Tấm",
  //   price: 15,
  //   image:
  //     "https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/09_2022/quan-com-tam-o-ha-noi-.jpg",
  // },
  // {
  //   id: 3,
  //   image:
  //     "https://daynauan.info.vn/wp-content/uploads/2020/11/com-rang-dua-bo.jpg",
  //   name: "Cơm rang dưa bò",
  //   price: 20,
  // },
  // {
  //   id: 4,

  //   name: "Phở bò",
  //   price: 25,
  //   image:
  //     "https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg",
  // },
  // {
  //   id: 5,

  //   name: "Bánh cuốn",
  //   price: 15,
  //   image:
  //     "https://cdn.tgdd.vn/Files/2017/10/22/1034982/cach-lam-banh-cuon-bang-bot-lam-banh-cuon-mikko-202111111226513462.jpg",
  // },
  // {
  //   id: 6,
  //   price: 20,
  //   image:
  //     "https://cdn.tgdd.vn/2021/05/CookProduct/Banhcanhcuabien-1200x676.jpg",
  //   name: "Bánh canh cua",
  // },
];

const DishesManagement = () => {

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("");
      setDishes(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [dishes, setDishes] = useState(initialDishes);
  const [editing, setEditing] = useState(false);
  const [currentDish, setCurrentDish] = useState({});

  const handleAddDish = (dish) => {
    setDishes([...dishes, dish]);
  };

  const handleDeleteDish = (id) => {
    const updatedDishes = dishes.filter((dish) => dish.id !== id);
    setDishes(updatedDishes);
  };

  const handleEditDish = (dish) => {
    setEditing(true);
    setCurrentDish(dish);
  };

  const handleUpdateDish = (id, updatedDish) => {
    setEditing(false);
    setDishes(dishes.map((dish) => (dish.id === id ? updatedDish : dish)));
  };

  return (
    <div className="container mt-4">
      <h1>Dishes Management</h1>
      <div className="d-flex p-3">
        {editing ? (
          <EditDishForm
            currentDish={currentDish}
            onUpdateDish={handleUpdateDish}
          />
        ) : (
          <AddDishForm onAddDish={handleAddDish} />
        )}
      </div>
      <div>
        <h2>Dishes List</h2>
        <DishList
          dishes={dishes}
          onDeleteDish={handleDeleteDish}
          onEditDish={handleEditDish}
        />
      </div>
    </div>
  );
};

const AddDishForm = ({ onAddDish }) => {
  const [dish, setDish] = useState({ name: "", price: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDish({ ...dish, id: Date.now() });
    setDish({ name: "", price: "", image: "" });
  };

  return (
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
          name="price"
          placeholder="Price"
          value={dish.price}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={dish.image}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Dish
      </button>
    </form>
  );
};

const EditDishForm = ({ currentDish, onUpdateDish }) => {
  const [dish, setDish] = useState(currentDish);

  useEffect(() => {
    setDish(currentDish);
  }, [currentDish]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
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
          name="price"
          value={dish.price}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="image"
          value={dish.image}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Dish
      </button>
    </form>
  );
};

const DishList = ({ dishes, onDeleteDish, onEditDish }) => {
  return (
    <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: "10%" }} />
        <col style={{ width: "40%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "20%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dishes.map((dish) => (
          <tr key={dish.id}>
            <td>{dish.id}</td>
            <td>
              <img
                src={dish.image}
                alt={dish.name}
                style={{ width: "250px" }}
              />
            </td>
            <td>{dish.name}</td>
            <td>${dish.price}</td>
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
