import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../views/Test.scss"

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
];

<<<<<<< HEAD
const Test = () => {
  const [users, setUsers] = useState([]);
=======
const DishesManagement = () => {

  const [dishes, setDishes] = useState(initialDishes);
>>>>>>> long
  const [editing, setEditing] = useState(false);
  const [currentDish, setCurrentDish] = useState({});
  
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('http://localhost:3000/user');
      setUsers(response.data.data);
=======
      const response = await axios.get("http://localhost:3000/dish");
      setDishes(response.data.data);
>>>>>>> long
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const handleCreateDish = async (newDish) => {
    try {
      const response = await axios.post("http://localhost:3000/dish/create", newDish);
      setDishes([...dishes, response.data]);
    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/dish/delete/${id}`);
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
      await axios.patch(`http://localhost:3000/dish/update/${id}`, updatedDish);
      setEditing(false);
      setDishes(dishes.map((dish) => (dish.id === id ? updatedDish : dish)));
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  // const handleAddDish = (dish) => {
  //   handleCreateDish(dish); 
  // };

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
<<<<<<< HEAD
          <AddUserForm onAddUser={handleAddUser} users={users} setUsers={setUsers} className="p-2" />

        )}
      </div>
      <div>
        <h2>User List</h2>
        <UserList users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser} onSelectUser={handleSelectUser} />
      </div>
      {selectedUserId && <UserDetails user={currentUser} />}
=======
          <>
            <AddDishForm onCreateDish={handleCreateDish} />
            {dishes && dishes.length > 0 && (
              <DishList
                dishes={dishes}
                onDeleteDish={handleDeleteDish}
                onEditDish={handleEditDish}
              />
            )}
          </>
        )}
      </div>
>>>>>>> long
    </div>
  );
  
};

const AddDishForm = ({ onCreateDish }) => {

<<<<<<< HEAD
const AddUserForm = ({ onAddUser, users, setUsers }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    username: "",
    password: "",
    phonenumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user", user);
      const newUser = response.data;

      if (!Array.isArray(users)) {
        setUsers([]);
      }

      onAddUser(newUser);
      setUser({
        name: "",
        username: "",
        email: "",
        address: "",
        password: "",
        phonenumber: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
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
          value={user.address}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          value={user.phonenumber}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add User
      </button>
    </form>
  );
};

const EditUserForm = ({ currentUser, onUpdateUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
=======
  const [dish, setDish] = useState({ name: "", price: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
>>>>>>> long
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateDish({ ...dish, id: Date.now() });
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

<<<<<<< HEAD
const UserList = ({ users, onDeleteUser, onEditUser, onSelectUser }) => {
  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
=======
const DishList = ({ dishes, onDeleteDish, onEditDish }) => {
  return (
    <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
>>>>>>> long
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
