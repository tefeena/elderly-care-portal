import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Spinner } from "react-bootstrap";
import Navbar from "./Navbar"; 
import "./AdminDashboard.css";
const API_BASE = process.env.REACT_APP_API_BASE_URL;

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/caregivers/all`) // Fetch all caregivers including unapproved
      .then((res) => {
        setCaregivers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching caregivers", err);
        setLoading(false);
      });
  }, []);

  const updateCaregiverStatus = (id, status) => {
    axios
      .put(`http://localhost:5000/api/caregivers/approve/${id}`, { approved: status })
      .then(() => {
        setCaregivers(
          caregivers.map((caregiver) =>
            caregiver._id === id ? { ...caregiver, approved: status } : caregiver
          )
        );
      })
      .catch((err) => console.error("Error updating caregiver status", err));
  };

  const deleteCaregiver = (id) => {
    axios
      .delete(`http://localhost:5000/api/caregivers/${id}`)
      .then(() =>
        setCaregivers(caregivers.filter((caregiver) => caregiver._id !== id))
      )
      .catch((err) => console.error("Error deleting caregiver", err));
  };

  return (
    <div className="caregiver-dashboard">
      <Navbar />
      <Container>
        <h2 className="dashboard-title">Caregiver List</h2>
        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" />
            <p>Loading caregivers...</p>
          </div>
        ) : caregivers.length === 0 ? (
          <p className="no-caregivers">No caregivers found.</p>
        ) : (
          <div className="caregiver-table-container">
            <Table striped bordered hover responsive className="caregiver-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Certifications</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {caregivers.map((caregiver) => (
                  <tr key={caregiver._id}>
                    <td>{caregiver.name}</td>
                    <td>{caregiver.email}</td>
                    <td>{caregiver.experience} years</td>
                    <td>{caregiver.certifications || "N/A"}</td>
                    <td>{caregiver.availability}</td>
                    <td>
                      {caregiver.approved ? (
                        <span className="status-approved">Approved</span>
                      ) : (
                        <span className="status-pending">Pending</span>
                      )}
                    </td>
                    <td className="action-buttons">
                      {!caregiver.approved && (
                        <Button
                          variant="success"
                          onClick={() =>
                            updateCaregiverStatus(caregiver._id, true)
                          }
                        >
                          Approve
                        </Button>
                      )}
                      {" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteCaregiver(caregiver._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CaregiverList;
