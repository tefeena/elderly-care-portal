import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Spinner, Modal, Form } from "react-bootstrap";
import Navbar from "./Navbar";
import "./AdminDashboard.css";

const AdminBookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/bookings/${id}`)
      .then(() => {
        setBookings(bookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.error("Error deleting booking", err));
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:5000/api/bookings/${selectedBooking._id}`, selectedBooking)
      .then((res) => {
        fetchBookings();
        setShowEditModal(false);
      })
      .catch((err) => console.error("Error updating booking", err));
  };

  return (
    <div className="caregiver-dashboard">
      <Navbar />
      <Container>
        <h2 className="dashboard-title">All Bookings</h2>

        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" />
            <p>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <p className="no-caregivers">No bookings found.</p>
        ) : (
          <Table striped bordered hover responsive className="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Caregiver</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Booked At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.userId?.email || "-"}</td>
                  <td>{booking.caregiverName}</td>
                  <td>{booking.plan}</td>
                  <td>${booking.amount}</td>
                  <td>{booking.status}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                  <td className="action-buttons">
                   
                    <Button variant="danger" onClick={() => handleDelete(booking._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={selectedBooking.status}
                  onChange={(e) =>
                    setSelectedBooking({ ...selectedBooking, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedBooking.notes || ""}
                  onChange={(e) =>
                    setSelectedBooking({ ...selectedBooking, notes: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBookingManager;
