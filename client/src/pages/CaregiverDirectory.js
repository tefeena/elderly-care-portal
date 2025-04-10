import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CaregiverDirectory.css";

const CaregiverDirectory = () => {
  const [caregivers, setCaregivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newCaregiver, setNewCaregiver] = useState({
    name: "",
    contact_number: "",
    email: "",
    experience: "",
    certifications: "",
    availability: "Full-Time",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!token);

    axios
      .get("http://localhost:5000/api/caregivers/")
      .then((response) => setCaregivers(response.data))
      .catch((error) => console.error("Error fetching caregivers:", error));

    if (userId) {
      axios
        .get(`http://localhost:5000/api/bookings/${userId}`)
        .then((response) => setBookings(response.data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, []);

  const handleChange = (e) => {
    setNewCaregiver({ ...newCaregiver, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/caregivers/register", newCaregiver)
      .then(() => {
        alert("Caregiver registered successfully! Pending admin approval.");
        setNewCaregiver({
          name: "",
          contact_number: "",
          email: "",
          experience: "",
          certifications: "",
          availability: "Full-Time",
        });
      })
      .catch((error) => {
        console.error("Error registering caregiver:", error.response?.data || error);
        if (error.response?.status === 400) {
          alert(error.response.data.message);
        } else {
          alert("Registration failed. Please try again.");
        }
      });
  };

  return (
    <div className="caregiver-container">
      <Navbar />

      <header className="caregiver-banner">
        <h3>Find Professional In-Home Caregivers</h3>
        <p>Connect with trusted professionals for your loved one's care</p>
      </header>

      <section className="qualified-caregivers">
        <h2>Our Certified Caregivers</h2>
        <div className="caregiver-grid">
          {caregivers.length === 0 ? (
            <p>No approved caregivers yet.</p>
          ) : (
            caregivers.map((caregiver) => (
              <div key={caregiver._id} className="caregiver-card">
                <div className="caregiver-info">
                  <h3>{caregiver.name}</h3>
                  <p><strong>Experience:</strong> {caregiver.experience} years</p>
                  <p><strong>Availability:</strong> {caregiver.availability}</p>
                  <p><strong>Email:</strong> {caregiver.email}</p>
                  <p><strong>Phone:</strong> {caregiver.contact_number}</p>
                  {isLoggedIn && (
                    <button
                      className="book-btn"
                      onClick={() => navigate(`/caregivers/book/${caregiver._id}`)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {isLoggedIn && bookings.length > 0 && (
        <section className="booked-caregivers">
          <h2>Your Booked Caregivers</h2>
          <div className="caregiver-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="caregiver-card booked">
                <div className="caregiver-info">
                  <h3>{booking.caregiverName}</h3>
                  <p><strong>Plan:</strong> {booking.plan}</p>
                  <p><strong>Amount:</strong> ${booking.amount}</p>
                  <p><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!isLoggedIn && (
        <section className="register-caregiver">
          <div className="caregiver-form-container">
            <h2>Become a Caregiver</h2>
            <p className="register-subtext">
              Join our trusted network and provide compassionate care for those in need.
            </p>
            <form onSubmit={handleRegister} className="caregiver-form">
              <div className="form-group">
                <input type="text" name="name" placeholder="Full Name" value={newCaregiver.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="contact_number" placeholder="Phone Number" value={newCaregiver.contact_number} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" value={newCaregiver.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="number" name="experience" placeholder="Years of Experience" value={newCaregiver.experience} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="certifications" placeholder="Certifications (Optional)" value={newCaregiver.certifications} onChange={handleChange} />
              </div>
              <div className="form-group">
                <select name="availability" value={newCaregiver.availability} onChange={handleChange}>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="On-Call">On-Call</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Register Now</button>
            </form>
          </div>
        </section>
      )}

      <section className="caregiver-reviews">
        <h2>Client Caregiver Reviews</h2>
        <div className="review-grid">
          <div className="review-card">
            <p>"John was very kind and professional. Highly recommend!"</p>
            <span>- Emily R.</span>
          </div>
          <div className="review-card">
            <p>"Jane provided excellent care for my father. So grateful!"</p>
            <span>- Mark W.</span>
          </div>
          <div className="review-card">
            <p>"David made sure my mother was comfortable and happy."</p>
            <span>- Sarah L.</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaregiverDirectory;
