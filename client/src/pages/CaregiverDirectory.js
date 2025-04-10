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
    <div className="cg-dir-container">
      <Navbar />

      <header className="cg-dir-banner">
        <h3>Find Professional Caregivers</h3>
      </header>

      <section className="cg-dir-qualified">
        <h2>Our <span className="highlight-text">Certified</span> Caregivers</h2>
        <div className="cg-dir-grid">
          {caregivers.length === 0 ? (
            <p>No approved caregivers yet.</p>
          ) : (
            caregivers.map((caregiver, index) => (
              <div
                key={caregiver._id}
                className="cg-dir-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                
                <div className="cg-dir-info">
                  <h3>{caregiver.name}</h3>
                  <p><strong>Experience:</strong> {caregiver.experience} years</p>
                  <p><strong>Availability:</strong> {caregiver.availability}</p>
                  <p><strong>Email:</strong> {caregiver.email}</p>
                  <p><strong>Phone:</strong> {caregiver.contact_number}</p>
                  {isLoggedIn && (
                    <button
                      className="cg-dir-book-btn"
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
        <section className="cg-dir-booked">
          <h2>Your <span className="highlight-text">Booked</span> Caregivers</h2>
          <div className="cg-dir-grid2">
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                className="cg-dir-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="cg-dir-info">
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
        <section className="cg-dir-register">
          <div className="cg-dir-form-container">
            <h2>Become a Caregiver</h2>
            <p className="cg-dir-subtext">
              Join our trusted network and provide compassionate care for those in need.
            </p>
            <form onSubmit={handleRegister} className="cg-dir-form">
              <div className="cg-dir-form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" value={newCaregiver.name} onChange={handleChange} required />
              </div>
              <div className="cg-dir-form-group">
                <label htmlFor="contact_number">Phone Number</label>
                <input type="text" id="contact_number" name="contact_number" placeholder="(123) 456-7890" value={newCaregiver.contact_number} onChange={handleChange} required />
              </div>
              <div className="cg-dir-form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" value={newCaregiver.email} onChange={handleChange} required />
              </div>
              <div className="cg-dir-form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input type="number" id="experience" name="experience" placeholder="e.g. 3" value={newCaregiver.experience} onChange={handleChange} required />
              </div>
              <div className="cg-dir-form-group">
                <label htmlFor="certifications">Certifications (Optional)</label>
                <input type="text" id="certifications" name="certifications" placeholder="e.g. CPR, First Aid" value={newCaregiver.certifications} onChange={handleChange} />
              </div>
              <div className="cg-dir-form-group">
                <label htmlFor="availability">Availability</label>
                <select id="availability" name="availability" value={newCaregiver.availability} onChange={handleChange}>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="On-Call">On-Call</option>
                </select>
              </div>
              <button type="submit" className="cg-dir-submit-btn">✨ Register Now</button>
            </form>
          </div>
        </section>
      )}

      <section className="cg-dir-reviews">
        <h2>Client Caregiver Reviews</h2>
        <div className="cg-dir-review-grid">
          <div className="cg-dir-review-card">
            <p>"John was very kind and professional. Highly recommend!"</p>
            <span>- Emily R.</span>
          </div>
          <div className="cg-dir-review-card">
            <p>"Jane provided excellent care for my father. So grateful!"</p>
            <span>- Mark W.</span>
          </div>
          <div className="cg-dir-review-card">
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
