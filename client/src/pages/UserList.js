import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form, Spinner } from "react-bootstrap";
import "./AdminDashboard.css";
import Navbar from "./Navbar";
const API_BASE = process.env.REACT_APP_API_BASE_URL;
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
        alert("Failed to fetch users. Please check your server.");
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/users/${id}`)
        .then(() => setUsers(users.filter((user) => user._id !== id)))
        .catch((err) => console.error("Error deleting user", err));
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    axios
      .put(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser)
      .then(() => {
        setUsers(users.map((user) => (user._id === selectedUser._id ? selectedUser : user)));
        setShowModal(false);
      })
      .catch((err) => console.error("Error updating user", err));
  };

  return (
    <div className="user-dashboard">
      <Navbar />
      <Container>
        <h2 className="dashboard-title">User List</h2>
        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" />
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          <div className="user-table-container">
            <Table striped bordered hover responsive className="user-table">
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
                    <td className="action-buttons">
                      <Button variant="warning" onClick={() => handleEditClick(user)}>
                        Edit
                      </Button>{" "}
                      <Button variant="danger" onClick={() => deleteUser(user._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Edit User Modal */}
        {selectedUser && (
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={selectedUser.email} disabled />
                </Form.Group>

                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="Elderly">Elderly</option>
                    <option value="Caregiver">Caregiver</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default UserList;
