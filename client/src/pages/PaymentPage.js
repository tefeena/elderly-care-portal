import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js"; // ✅ Stripe.js
import "./PaymentPage.css";

const stripePromise = loadStripe("pk_test_51RC7yRJrIGVXhQ5Gw9hrlZo12xKIgboEQddNJj6ZPPQ32Mr3BwE72WCbKYeXh6tD41NqjfvnUjuAGcv0wtcfrYkJ00v3GiyAhP"); // ✅ Use your own publishable key

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [caregiver, setCaregiver] = useState(location.state?.caregiver || null);
  const [plan, setPlan] = useState(location.state?.plan || "");
  const [loading, setLoading] = useState(!caregiver);
  
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    if (!caregiver && id) {
      axios.get(`http://localhost:5000/api/caregivers/${id}`)
        .then(res => {
          setCaregiver(res.data);
          const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));
          if (bookingInfo?.plan) {
            setPlan(bookingInfo.plan);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching caregiver", err);
          setLoading(false);
        });
    }
  }, [id, caregiver]);

  const handlePayment = async () => {
    try {
      const amount = plan === "Daily" ? 50 : plan === "Weekly" ? 300 : 1000;
      const userId = localStorage.getItem("userId");
  
      const { data } = await axios.post(`${API_BASE}/api/payments/create-checkout-session`, {
        caregiverId: caregiver._id,
        caregiverName: caregiver.name,
        userId,
        plan,
        amount,
      });
  
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("Payment failed. Please try again.");
    }
  };
  

  if (!caregiver || !plan) {
    return <div className="payment-container">Invalid access. No caregiver selected.</div>;
  }

  return (
    <div className="payment-container">
      <h2>Payment Gateway</h2>
      <div className="summary-box">
        <h4>Booking Summary</h4>
        <p><strong>Caregiver:</strong> {caregiver.name}</p>
        <p><strong>Plan:</strong> {plan}</p>
        <p><strong>Amount:</strong> {
          plan === "Daily" ? "$50" : plan === "Weekly" ? "$300" : "$1000"
        }</p>
      </div>

      <div className="button-group">
  <button className="cancel-btn" onClick={() => navigate("/caregivers")}>
    Cancel
  </button>
  <button className="pay-btn" onClick={handlePayment}>
    Pay with Stripe
  </button>
</div>

    </div>
  );
};

export default PaymentPage;
