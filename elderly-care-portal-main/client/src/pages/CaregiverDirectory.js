// import React from 'react';
// import { Link } from 'react-router-dom';
// import './CaregiverDirectory.css';

// const CaregiverPage = () => {
//     return (
//         <div className="Caregiver_container">
//             {/* Navbar */}
//             <nav className="Caregiver_navbar">
//                 <h1 className="Caregiver_logo">Elderly Care</h1>
//                 <div className="Caregiver_nav-links">
//                     <Link to="/">Home</Link>
//                     <Link to="/caregiverDirectory">Caregivers</Link>
//                     <Link to="/health-dashboard">Dashboard</Link>
//                     <Link to="/emergency">Emergency</Link>
//                     <Link to="/login" className="Caregiver_btn Caregiver_login">Login</Link>
//                     <Link to="/register" className="Caregiver_btn Caregiver_signup">Sign Up</Link>
//                 </div>
//             </nav>
            
//             {/* Caregivers Section */}
//             <section className="Caregiver_section">
//                 <h2>👨‍⚕️ Available Caregivers</h2>
//                 <div className="caregiver-list">
//                     <div className="caregiver-card">
//                         <img src={require("../images/Caregiver1.jpg")} alt="Caregiver" className="caregiver-img" />
//                         <h3>Sarah Johnson</h3>
//                         <p><strong>Specialty:</strong> Senior Nursing Assistant</p>
//                         <p><strong>Experience:</strong> 8 Years</p>
//                         <p><strong>Contact:</strong> +1 234 567 8901</p>
//                         <button className="contact-btn">Contact</button>
//                     </div>
                    
//                     <div className="caregiver-card">
//                         <img src={require("../images/Caregiver2.jpg")} alt="Caregiver" className="caregiver-img" />
//                         <h3>Michael Lee</h3>
//                         <p><strong>Specialty:</strong> Home Health Aide</p>
//                         <p><strong>Experience:</strong> 5 Years</p>
//                         <p><strong>Contact:</strong> +1 987 654 3210</p>
//                         <button className="contact-btn">Contact</button>
//                     </div>
                    
//                     <div className="caregiver-card">
//                         <img src={require("../images/Caregiver3.jpg")} alt="Caregiver" className="caregiver-img" />
//                         <h3>Emma Wilson</h3>
//                         <p><strong>Specialty:</strong> Certified Elderly Care Nurse</p>
//                         <p><strong>Experience:</strong> 10 Years</p>
//                         <p><strong>Contact:</strong> +1 555 123 4567</p>
//                         <button className="contact-btn">Contact</button>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="Caregiver_footer">
//                 <p>&copy; Conestoga College</p>
//             </footer>
//         </div>
//     );
// };

// export default CaregiverPage;
