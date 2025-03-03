import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicationPage = () => {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/medications/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => setMedications(response.data))
        .catch(error => console.error("Error fetching medications:", error));
    }, []);

    return (
        <div>
            <h2>Medication List</h2>
            <ul>
                {medications.map((med) => (
                    <li key={med._id}>{med.medication_name} - {med.dosage}</li>
                ))}
            </ul>
            <footer className="Emergency_footer">
                <p>&copy; Conestoga College</p>
            </footer>
        </div>
    );
};

export default MedicationPage;
