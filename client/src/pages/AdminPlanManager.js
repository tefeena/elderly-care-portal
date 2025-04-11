import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Container,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import Navbar from "./Navbar";
import "./AdminDashboard.css";

const AdminPlanManager = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({
    name: "",
    label: "",
    price: 0,
    features: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    axios
      .get("http://localhost:5000/api/plans")
      .then((res) => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plans", err);
        setLoading(false);
      });
  };

  const handleShowModal = (plan = null) => {
    setEditingPlan(plan);
    if (plan) {
      setForm({ ...plan, features: plan.features.join(", ") });
    } else {
      setForm({ name: "", label: "", price: 0, features: "" });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const payload = {
      ...form,
      features: form.features.split(",").map((f) => f.trim()),
    };

    const request = editingPlan
      ? axios.put(`http://localhost:5000/api/plans/${editingPlan._id}`, payload)
      : axios.post("http://localhost:5000/api/plans", payload);

    request
      .then(() => {
        fetchPlans();
        setShowModal(false);
        setForm({ name: "", label: "", price: 0, features: "" });
        setEditingPlan(null);
      })
      .catch((err) => console.error("Error saving plan", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      axios
        .delete(`http://localhost:5000/api/plans/${id}`)
        .then(() => fetchPlans())
        .catch((err) => console.error("Error deleting plan", err));
    }
  };

  return (
    <div className="user-dashboard">
      <Navbar />
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="dashboard-title">Manage Caregiver Booking Plans</h2>
          <Button variant="primary" onClick={() => handleShowModal()}>
            ➕ Add New Plan
          </Button>
        </div>

        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" />
            <p>Loading plans...</p>
          </div>
        ) : plans.length === 0 ? (
          <p className="no-caregivers">No plans found.</p>
        ) : (
          <div className="user-table-container">
            <Table striped bordered hover responsive className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Label</th>
                  <th>Price ($)</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id}>
                    <td>{plan.name}</td>
                    <td>{plan.label}</td>
                    <td>{plan.price}</td>
                    <td>
                      <ul style={{ textAlign: "left", paddingLeft: 20 }}>
                        {plan.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="action-buttons">
                      <Button
                        variant="outline-warning"
                        className="me-2"
                        onClick={() => handleShowModal(plan)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(plan._id)}
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Modal for Add/Edit Plan */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className="plan-form-card"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-primary fw-bold">
              {editingPlan ? "Edit Plan" : "Add New Plan"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Daily"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., For One Day"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g., 50"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Features (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="24-hour care, Meals included"
                  value={form.features}
                  onChange={(e) =>
                    setForm({ ...form, features: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingPlan ? "Update Plan" : "Add Plan"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminPlanManager;
