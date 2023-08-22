import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CrudUser.scss"

const initialUsers = [

];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:3000/user', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3000/user/${updatedUser.id}`, updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? response.data : user)));
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <div className="d-flex p-3">
        {editing ? (
          <EditUserForm
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
        ) : (
          <AddUserForm onAddUser={handleAddUser} />
        )}
      </div>
      <div>
        <h2>User List</h2>
        <UserList
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
      </div>
    </div>
  );
};

const AddUserForm = ({ onAddUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    username: "",
    phonenumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ ...user, id: Date.now() });
    setUser({ name: "", username: "", email: "", address: "", phonenumber: "" });
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
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.username) {
      onUpdateUser(user);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name || ""}
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
          value={user.username || ""}
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
          value={user.email || ""}
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
          value={user.address || ""}
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
          value={user.password || ""}
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
          value={user.phonenumber || ""}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update User
      </button>
    </form>
  );
};

const UserList = ({ users, onDeleteUser, onEditUser }) => {
  return (
    <div className="table-wrapper">
      <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "8%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "12%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phonenumber}</td>
              <td>
                <button onClick={() => onEditUser(user)} className="btn btn-info">
                  Edit
                </button>
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
