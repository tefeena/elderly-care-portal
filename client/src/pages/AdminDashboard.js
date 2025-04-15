import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./AdminDashboard.css";
import Navbar from "./Navbar";

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    caregivers: 0,
    sessions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/api/users/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-header">
        <h1>Welcome, Admin</h1>
        <p>Monitor your application’s performance and user activity</p>
      </div>
      <Container>
        <Row className="stat-cards-row">
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h4>Total Users</h4>
                <p>{stats.users}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h4>Total Caregivers</h4>
                <p>{stats.caregivers}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h4>Active Sessions</h4>
                <p>{stats.sessions}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
