import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE_URL;
const HomePage = () => {
  const navigate = useNavigate();
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_BASE}/api/health/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setHealth(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="home-container">
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Elderly Care Portal | Empowering Senior Wellness</title>
        <meta name="description" content="Discover compassionate care for seniors. Book caregivers, track health, and manage medication reminders from one seamless platform." />
        <meta name="keywords" content="elderly care, senior health, caregiver portal, medication reminders, healthcare, compassionate care, health monitoring, wellness" />
        <meta name="author" content="Elderly Care Team" />
        <link rel="canonical" href="https://elderly-care-portal.vercel.app" />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <header className="home-banner">
        <div className="home-banner-overlay">
          <h2>Caring for Seniors with Compassion</h2>
          <p>Empowering elderly individuals with safety, healthcare, and independence.</p>
          <Link to="/register" className="home-btn home-get-started">
            Join Us Today
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="home-features">
        <div className="features-content">
          <h2>Our Features</h2>
          <p>Providing elderly care with efficiency and simplicity.</p>
          <ul>
            <li><span>Medication Reminders</span> - Never miss a dose with automated reminders.</li>
            <li><span>Caregiver Directory</span> - Easily connect with trusted professionals.</li>
            <li><span>Health Monitoring</span> - Track vital health metrics in real-time.</li>
            <li><span>Easy-to-Use Interface</span> - Designed for seniors and caregivers alike.</li>
            <li><span>Real-time Notifications</span> - Stay updated with live alerts and assistance.</li>
          </ul>
        </div>
        <div className="features-image">
          <img src={require("../images/TheSereneGardener.jpeg")} alt="Senior healthcare features" />
        </div>
      </section>

      {/* Services Overview */}
      <section className="home-services">
        <h2>How Do Our Care Services Work?</h2>

        <div className="service-step">
          <div className="service-text">
            <h3>Register and Set Up Your Profile</h3>
            <p>Create your account and personalize your profile to get the best care options tailored for you.</p>
            <Link to="/register" className="service-btn">Get Started</Link>
          </div>
          <div className="service-image">
            <img src={require("../images/step1.jpeg")} alt="Registering elderly profile" />
          </div>
        </div>

        <div className="service-step reverse">
          <div className="service-text">
            <h3>Choose Services and Caregivers</h3>
            <p>Browse our directory and find trusted caregivers or services that suit your needs.</p>
            <Link to="/caregivers" className="service-btn">View Services</Link>
          </div>
          <div className="service-image">
            <img src={require("../images/step2.jpeg")} alt="Choosing caregivers" />
          </div>
        </div>

        <div className="service-step">
          <div className="service-text">
            <h3>Monitor Health and Stay Connected</h3>
            <p>Keep track of health metrics and stay in touch with caregivers and loved ones.</p>
            <Link to="/login" className="service-btn">Go to Dashboard</Link>
          </div>
          <div className="service-image">
            <img src={require("../images/step3.jpeg")} alt="Monitoring senior health" />
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="home-reviews">
        <h2>What Our Users Say</h2>
        <div className="reviews-container">
          <div className="review-card">
            <div className="review-header">
              <img src={require("../images/User1.avif")} alt="Sarah Thompson" />
              <div className="user-info">
                <h3>Sarah Thompson</h3>
                <img src={require("../images/Stars.png")} alt="5-star rating" />
              </div>
            </div>
            <p>"This platform has been a game-changer for my parents! The reminders are lifesaving, and the caregivers are incredibly professional."</p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <img src={require("../images/User2.png")} alt="David Johnson" />
              <div className="user-info">
                <h3>David Johnson</h3>
                <img src={require("../images/Stars.png")} alt="5-star rating" />
              </div>
            </div>
            <p>"The health monitoring features are fantastic! I can now check on my grandmother's well-being from anywhere."</p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <img src={require("../images/User3.png")} alt="Emily Carter" />
              <div className="user-info">
                <h3>Emily Carter</h3>
                <img src={require("../images/Stars.png")} alt="5-star rating" />
              </div>
            </div>
            <p>"Highly recommend this platform! It has brought me peace of mind knowing my father is always connected to caregivers."</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="home-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <input type="checkbox" id="faq1" />
            <label htmlFor="faq1" className="faq-question">What services are available for caregivers?</label>
            <div className="faq-answer">
              <p>We offer services such as scheduling tools, training resources, and care request management.</p>
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq2" />
            <label htmlFor="faq2" className="faq-question">How do I set up medication reminders?</label>
            <div className="faq-answer">
              <p>Navigate to the "Medications" section after logging in and set your medication name, dosage, and time.</p>
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq3" />
            <label htmlFor="faq3" className="faq-question">Can I track my elderly loved one's health metrics?</label>
            <div className="faq-answer">
              <p>Yes, our dashboard allows real-time tracking of vital metrics like heart rate, blood pressure, and temperature.</p>
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq4" />
            <label htmlFor="faq4" className="faq-question">How do I contact emergency services?</label>
            <div className="faq-answer">
              <p>You can call emergency services directly from our "Emergency" section in just one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
