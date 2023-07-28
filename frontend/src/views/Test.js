import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../views/Test.scss"

const initialUsers = [
  // {
  //   id: 1,
  //   name: "John Doe",
  //   username: "Joe_Dohn",
  //   email: "john@example.com",
  //   password: "999",
  //   address: "New York",
  //   phonenumber: "122133"
  // },
  // {
  //   id: 2,
  //   name: "Jane Smith",
  //   username: "Jith_Smane",
  //   email: "jane@example.com",
  //   password: "888",    
  //   address: "Los Angeles",
  //   phonenumber: "233244"
  // },

];

const Test = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user');
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/user/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await axios.patch(`/user/${id}`, updatedUser);
      setEditing(false);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSelectUser = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    setCurrentUser(selectedUser);
    setSelectedUserId(id);
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <div className="d-flex p-3">
        {editing ? (
          <EditUserForm
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            className="p-2"
          />
        ) : (
          <AddUserForm onAddUser={handleAddUser} className="p-2" />
        )}
      </div>
      <div>
        <h2>User List</h2>
        <UserList
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
          onSelectUser={handleSelectUser}
        />
      </div>
      {selectedUserId && <UserDetails user={currentUser} />}
    </div>
  );
};


const AddUserForm = ({ onAddUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    username: "",
    password: "",
    phonenumber: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user", user);
      const newUser = response.data;
      onAddUser(newUser);
      setUser({
        name: "",
        username: "",
        email: "",
        address: "",
        password: "",
        phonenumber: "",
        avatar: "",
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(currentUser.id, user);
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

const UserDetails = ({ user }) => {
  return (
    <div>
      <h3>User Details</h3>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Phone Number: {user.phonenumber}</p>
    </div>
  );
};

const UserList = ({ users, onDeleteUser, onEditUser, onSelectUser  }) => {
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
                <button onClick={() => onDeleteUser(user.id)} className="btn btn-danger">
                  Delete
                </button>
                <button onClick={() => onSelectUser(user.id)} className="btn btn-primary">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
