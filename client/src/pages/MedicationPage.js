import React, { useEffect, useState } from "react";
import axios from "axios";
import "animate.css";
import "./MedicationPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const MedicationPage = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [newMedication, setNewMedication] = useState({
    medication_name: "",
    dosage: "",
    time: "",
    frequency: "Daily",
    notes: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found! Redirecting to login.");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/medications/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedications(response.data);
    } catch (error) {
      console.error("❌ Error fetching medications:", error.response?.data || error);
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to load medications." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewMedication({ ...newMedication, [e.target.name]: e.target.value });
  };

  const handleEdit = (med) => {
    setNewMedication(med); // Set form fields with existing medication data
    setEditingId(med._id); // Store the ID of the medication being edited
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        setMessage({ type: "error", text: "Unauthorized. Please log in." });
        return;
    }

    if (!newMedication.medication_name || !newMedication.dosage || !newMedication.time) {
        setMessage({ type: "error", text: "Please fill in all required fields." });
        return;
    }

    try {
        if (editingId) {
            // ✅ Update existing medication
            const response = await axios.put(
                `http://localhost:5000/api/medications/update/${editingId}`,
                newMedication,
                { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
            );

            console.log("✅ Medication Updated:", response.data);
            setMessage({ type: "success", text: "Medication updated successfully!" });

            setMedications(medications.map((med) => (med._id === editingId ? response.data.medication : med)));
        } else {
            // ✅ Add new medication
            const response = await axios.post("http://localhost:5000/api/medications/add", newMedication, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });

            console.log("✅ Medication Added:", response.data);
            setMessage({ type: "success", text: "Medication added successfully!" });

            setMedications([...medications, response.data.medication]);
        }

        // Reset form
        setNewMedication({ medication_name: "", dosage: "", time: "", frequency: "Daily", notes: "" });
        setEditingId(null);
    } catch (error) {
        console.error("❌ Error updating medication:", error.response?.data || error);
        setMessage({ type: "error", text: error.response?.data?.message || "Failed to update medication." });
    }
};


  const deleteMedication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/medications/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMedications(medications.filter((med) => med._id !== id));
      setMessage({ type: "success", text: "Medication deleted successfully!" });
    } catch (error) {
      console.error("Error deleting medication:", error);
      setMessage({ type: "error", text: "Failed to delete medication." });
    }
  };

  return (
    <div>
     {/* Navbar */}
     <Navbar />
    <div className="medication-container animate__animated animate__fadeIn">
      
      <header className="medication-header">
        <h1>Medication Management</h1>
      </header>

      {message.text && (
        <div className={`message ${message.type === "success" ? "success-msg" : "error-msg"}`}>
          {message.text}
        </div>
      )}

      <div className="medication-form">
        <h2>{editingId ? "Edit Medication" : "Add New Medication"}</h2>
        <div className="medication-inputs">
          <input type="text" name="medication_name" placeholder="Medication Name" value={newMedication.medication_name} onChange={handleChange} />
          <input type="text" name="dosage" placeholder="Dosage" value={newMedication.dosage} onChange={handleChange} />
          <input type="time" name="time" value={newMedication.time} onChange={handleChange} />
          <select name="frequency" value={newMedication.frequency} onChange={handleChange}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <input type="text" name="notes" placeholder="Notes (Optional)" value={newMedication.notes} onChange={handleChange} />
          <button onClick={handleSubmit} className="add-btn">
            {editingId ? "Update Medication" : "Add Medication"}
          </button>
        </div>
      </div>

      <div className="medication-list">
        <h2>Your Medications</h2>
        {loading ? (
          <p>Loading medications...</p>
        ) : medications.length === 0 ? (
          <p>No medications added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Time</th>
                <th>Frequency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med) => (
                <tr key={med._id}>
                  <td>{med.medication_name}</td>
                  <td>{med.dosage}</td>
                  <td>{med.time}</td>
                  <td>{med.frequency}</td>
                  <td>
                    <button onClick={() => handleEdit(med)} className="edit-btn">Edit</button>
                    <button onClick={() => deleteMedication(med._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    
      {/* Footer */}
      <Footer />
    </div>
    
  );
};

export default MedicationPage;
