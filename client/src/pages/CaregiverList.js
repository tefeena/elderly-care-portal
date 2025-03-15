import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import "./AdminDashboard.css";
import Navbar from "./Navbar"; 

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/caregivers")
      .then((res) => setCaregivers(res.data))
      .catch((err) => console.error("Error fetching caregivers", err));
  }, []);

  const deleteCaregiver = (id) => {
    axios
      .delete(`http://localhost:5000/api/caregivers/${id}`)
      .then(() => setCaregivers(caregivers.filter((caregiver) => caregiver._id !== id)))
      .catch((err) => console.error("Error deleting caregiver", err));
  };

  return (
    
    <div className="caregiver-dashboard">
        <Container>
         <Navbar />
      <h2>Caregiver List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Experience</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {caregivers.map((caregiver) => (
            <tr key={caregiver._id}>
              <td>{caregiver.name}</td>
              <td>{caregiver.experience} years</td>
              <td>{caregiver.availability}</td>
              <td>
                <Button variant="warning">Edit</Button>{" "}
                <Button variant="danger" onClick={() => deleteCaregiver(caregiver._id)}>
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

export default CaregiverList;
