import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./AdminDashboard.css";
import Navbar from "./Navbar"; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />

      <Container>
        <h3 className="dashboard-title">Welcome, Admin</h3>
        <Row>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h4>Total Users</h4>
                <p>120</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h4>Total Caregivers</h4>
                <p>45</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h4>Active Sessions</h4>
                <p>30</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
