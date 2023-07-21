import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", birthYear: 1990 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", birthYear: 1985 },
];

const CrudUser = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const handleUpdateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
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
        />
      </div>
    </div>
  );
};

const AddUserForm = ({ onAddUser }) => {
  const [user, setUser] = useState({ name: "", email: "", birthYear: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ ...user, id: Date.now() });
    setUser({ name: "", email: "", birthYear: "" });
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
          type="number"
          name="birthYear"
          placeholder="Birth Year"
          value={user.birthYear}
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
          value={user.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="birthYear"
          value={user.birthYear}
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
    <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: "10%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Birth Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.birthYear}</td>
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
  );
};

export default CrudUser;
