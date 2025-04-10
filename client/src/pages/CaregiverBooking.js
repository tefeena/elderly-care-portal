import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CaregiverBooking.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const plans = [
  { name: "For One Day", price: 50, features: ["24-hour care", "Meals included"] },
  { name: "For One Week", price: 300, features: ["Weekly care", "Daily health check"] },
  { name: "For One Month", price: 1000, features: ["Full-month care", "Health and wellness"] },
];

const CaregiverBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/caregivers/${id}`)
      .then((res) => setCaregiver(res.data))
      .catch((err) => console.error("Error fetching caregiver", err));
  }, [id]);

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const proceedToPayment = () => {
    localStorage.setItem(
      "bookingInfo",
      JSON.stringify({ caregiver, plan: selectedPlan.name })
    );
    navigate(`/caregivers/payment/${caregiver._id}`, {
      state: { caregiver, plan: selectedPlan.name },
    });
  };

  if (!caregiver) return <p className="loading">Loading caregiver details...</p>;

  return (
    <div className="cg-booking-page">
      <Navbar />
      <div className="cg-caregiver-info">
        <h2 className="cg-title">Book Caregiver: <span>{caregiver.name}</span></h2>
        <div className="cg-details">
          <p><strong>Experience:</strong> {caregiver.experience} years</p>
          <p><strong>Availability:</strong> {caregiver.availability}</p>
        </div>
      </div>
  
      <h3 className="cg-section-title">Choose Your Plan</h3>
      <div className="cg-plan-options">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`cg-plan-card ${selectedPlan?.name === plan.name ? "cg-selected" : ""}`}
            onClick={() => handleSelect(plan)}
          >
            <div className="cg-plan-header">
              <h4 className="cg-plan-name">{plan.name}</h4>
              <span className="cg-plan-price">${plan.price}</span>
            </div>
            <ul className="cg-plan-features">
              {plan.features?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div class="but_cla">
      {selectedPlan && (
        <button className="cg-proceed-btn" onClick={proceedToPayment}>
          Proceed to Secure Payment
        </button>
      )}
      </div>
      {/* Footer */}
      <Footer />

    </div>
    
  );
  
};

export default CaregiverBooking;