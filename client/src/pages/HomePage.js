import { Link } from "react-router-dom"; 
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <h1 className="home-logo">Elderly Care</h1>
        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/caregivers">Caregivers</Link>
          <Link to="/health-dashboard">Dashboard</Link>
          <Link to="/medications">Medications</Link>
          <Link to="/emergency">Emergency</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      </nav>

      <header className="home-banner">
        <h2>Caring for Seniors - Simplifying Care</h2>
        <p>Empowering elderly individuals with safety, healthcare, and independence.</p>
        <Link to="/register" className="home-btn home-get-started">Sign Up With Us</Link>
      </header>

      <section className="home-features">
        <div className="features-list">
          <h2>Our Features</h2>
          <ul>
            <li>📅 Medication Reminders</li>
            <li>👩‍⚕️ Caregiver Directory</li>
            <li>📊 Health Monitoring</li>
            <li>📱 Easy-to-Use Interface</li>
            <li>⏰ Real-time Notifications</li>
          </ul>
        </div>
        <div className="features-image">
          <img src={require("../images/Features.webp")} alt="Features" />
        </div>
      </section>

      <section className="home-whats">
  <h2>What can we do for you?</h2>
  <div className="home-whats-content">
    <div className="home-what">
      <h3>📅 Medication Management</h3>
      <p>Set reminders for medications and track schedules with ease.</p>
      <Link to="/MedicationPage">Learn More →</Link>
    </div>
    <div className="home-what">
      <h3>👩‍⚕️ Caregiver Directory</h3>
      <p>Find and book trusted caregivers for assistance.</p>
      <Link to="/caregivers">Find Caregivers →</Link>
    </div>
    <div className="home-what">
      <h3>📊 Health Dashboard</h3>
      <p>Monitor health metrics and get real-time insights.</p>
      <Link to="/health-dashboard">View Dashboard →</Link>
    </div>
  </div>
</section>

      <section className="home-services">
        <h2>How Do Our Care Services Work?</h2>
        <div className="service-step">
          <img src={require("../images/Step1.jpg")} alt="Step 1" />
          <div class= "right=section">
          <h3>Register and set up your profile</h3>
          <button className="service-btn">
          <a href="/register" className="btn-link">Get Started</a>
         </button>
        </div>
        </div>
        <div className="service-step">
          <img src={require("../images/Step2.jpg")} alt="Step 2" />
          <div class= "right=section">
          <h3>Choose services and caregivers</h3>
          <button className="service-btn">
          <a href="/caregivers" className="btn-link">View Services and Caregivers</a>
         </button>
          </div>
        </div>
        <div className="service-step">
          <img src={require("../images/Step3.jpg")} alt="Step 3" />
          <div class= "right=section">
          <h3>Monitor health and stay connected</h3>
          <button className="service-btn">
          <a href="/health-dashboard" className="btn-link">Go to Your Dashboard</a>
         </button>
          </div>
        </div>
      </section>

      <section className="home-reviews">
        <h2>User Reviews and Feedback</h2>
        <div className="review-card">
          <img src={require("../images/User1.avif")} alt="User 1" />
          <img src={require("../images/Stars.png")} alt="User 1 Stars" />
          <p>"Excellent service, very helpful for my parents! The platform has really improved their quality of life, helping them stay more independent and engaged. The medication reminders are spot-on, and the caregivers have been amazing. Highly recommend it to anyone looking for an easy and reliable way to manage elderly care."</p>
        </div>
        <div className="review-card">
          <img src={require("../images/User2.png")} alt="User 2" />
          <img src={require("../images/Stars.png")} alt="User 2 Stars" />
          <p>"A great way to manage elderly care remotely. I was struggling to find reliable caregivers for my grandmother, but this platform made it easy. The health monitoring features are very helpful, and I feel much more confident about her well-being now. It's also incredibly user-friendly, even for seniors who aren't tech-savvy."</p>
        </div>
        <div className="review-card">
          <img src={require("../images/User3.png")} alt="User 3" />
          <img src={require("../images/Stars.png")} alt="User 3 Stars" />
          <p>"Highly recommend this for elderly individuals. My father has been using the platform for a few months, and it's made a world of difference. It's comforting to know that he is always connected to caregivers and health services. The app is easy for him to use, and it’s also great for monitoring his health remotely."</p>
        </div>
      </section>

      <section className="home-faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <input type="checkbox" id="faq1" />
          <label htmlFor="faq1">What services are available for caregivers?</label>
          <div className="faq-answer">
            <p>We offer a variety of services for caregivers including scheduling assistance, access to training resources, and tools to connect with elderly clients in need of care. You can also find client reviews to help you make the best choices for your caregiving career.</p>
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="faq2" />
          <label htmlFor="faq2">How do I set up medication reminders?</label>
          <div className="faq-answer">
            <p>Setting up medication reminders is simple. After creating your profile, navigate to the "Medications" section, where you can add each of your medications, dosage, and reminder times. You will receive automatic notifications for each scheduled dose.</p>
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="faq3" />
          <label htmlFor="faq3">Can I track my elderly loved one's health metrics?</label>
          <div className="faq-answer">
            <p>Yes! Our platform provides the option to track various health metrics such as blood pressure, heart rate, and blood sugar levels. The health dashboard offers a comprehensive view of their well-being and alerts you if any readings fall outside of normal ranges.</p>
          </div>
        </div>

        <div className="faq-item">
          <input type="checkbox" id="faq4" />
          <label htmlFor="faq4">How do I contact emergency services?</label>
          <div className="faq-answer">
            <p>If you’re in an emergency situation, you can contact local emergency services directly through our "Emergency" page. Additionally, caregivers and family members can be alerted if immediate assistance is needed.</p>
          </div>
        </div>

      </section>

      <footer className="home-footer">
        <p>&copy; Conestoga College</p>
      </footer>
    </div>
  );
};

export default HomePage;
