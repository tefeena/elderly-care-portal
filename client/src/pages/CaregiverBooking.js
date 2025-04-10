import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CaregiverBooking.css";

const plans = [
  { name: "Daily", price: 50 },
  { name: "Weekly", price: 300 },
  { name: "Monthly", price: 1000 },
];

const CaregiverBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/caregivers/${id}`)
      .then(res => setCaregiver(res.data))
      .catch(err => console.error("Error fetching caregiver", err));
  }, [id]);

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const proceedToPayment = () => {
    localStorage.setItem("bookingInfo", JSON.stringify({ caregiver, plan: selectedPlan.name }));
    navigate(`/caregivers/payment/${caregiver._id}`, {
      state: { caregiver, plan: selectedPlan.name }
    });
  };

  if (!caregiver) return <p>Loading...</p>;

  return (
    <div className="booking-page">
      <h2>Book {caregiver.name}</h2>
      <p><strong>Experience:</strong> {caregiver.experience} years</p>
      <p><strong>Availability:</strong> {caregiver.availability}</p>

      <h3>Select a Plan</h3>
      <div className="plan-options">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${selectedPlan?.name === plan.name ? 'selected' : ''}`}
            onClick={() => handleSelect(plan)}
          >
            <h4>{plan.name}</h4>
            <p>${plan.price}</p>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <button className="proceed-btn" onClick={proceedToPayment}>Proceed to Payment</button>
      )}
    </div>
  );
};

export default CaregiverBooking;