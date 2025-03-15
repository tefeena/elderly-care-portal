import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import "./AdminDashboard.css";
import Navbar from "./Navbar"; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((err) => console.error("Error deleting user", err));
  };

  return (
    <div className="user-dashboard">
    <Container>
         <Navbar />
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning">Edit</Button>{" "}
                <Button variant="danger" onClick={() => deleteUser(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  </div>);
};

export default UserList;
