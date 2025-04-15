import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CaregiverDirectory.css";
const API_BASE = process.env.REACT_APP_API_BASE_URL;

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
      .get(`${API_BASE}/api/caregivers/`)
      .then((res) => setCaregivers(res.data))
      .catch((err) => console.error("Error fetching caregivers:", err));

    if (userId) {
      axios
        .get(`${API_BASE}/api/bookings/${userId}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, []);

  const handleChange = (e) => {
    setNewCaregiver({ ...newCaregiver, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/api/caregivers/register`, newCaregiver)
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
      .catch((err) => {
        console.error("Error registering caregiver:", err.response?.data || err);
        alert(err.response?.data?.message || "Registration failed. Please try again.");
      });
  };

  return (
    <div className="cg-dir-container">
      <Helmet>
        <title>Caregiver Directory | Elderly Care Portal</title>
        <meta
          name="description"
          content="Browse professional caregivers, view availability, and register to offer care for the elderly. Trusted network, verified professionals."
        />
      </Helmet>

      <Navbar />

      <header className="cg-dir-banner" role="banner">
        <h1>Find Professional Caregivers</h1>
        <p>Explore our certified network of trusted caregivers and get the help you deserve.</p>
      </header>

      <main>
        <section className="cg-dir-qualified">
          <h2>
            Our <span className="highlight-text">Certified</span> Caregivers
          </h2>
          <div className="cg-dir-grid">
            {caregivers.length === 0 ? (
              <p>No approved caregivers yet.</p>
            ) : (
              caregivers.map((caregiver, index) => (
                <article
                  key={caregiver._id}
                  className="cg-dir-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={`Caregiver profile for ${caregiver.name}`}
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
                        aria-label={`Book ${caregiver.name}`}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {isLoggedIn && bookings.length > 0 && (
          <section className="cg-dir-booked">
            <h2>
              Your <span className="highlight-text">Booked</span> Caregivers
            </h2>
            <div className="cg-dir-grid2">
              {bookings.map((booking, index) => (
                <article
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
                </article>
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
            <div className="cg-dir-review-card" aria-label="Review by Emily R.">
              <p>"John was very kind and professional. Highly recommend!"</p>
              <span>- Emily R.</span>
            </div>
            <div className="cg-dir-review-card" aria-label="Review by Mark W.">
              <p>"Jane provided excellent care for my father. So grateful!"</p>
              <span>- Mark W.</span>
            </div>
            <div className="cg-dir-review-card" aria-label="Review by Sarah L.">
              <p>"David made sure my mother was comfortable and happy."</p>
              <span>- Sarah L.</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaregiverDirectory;
