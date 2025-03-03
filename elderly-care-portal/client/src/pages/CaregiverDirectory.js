import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CaregiverDirectory = () => {
    const [caregivers, setCaregivers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/caregivers/all')
            .then(response => setCaregivers(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Caregiver Directory</h2>
            <ul>
                {caregivers.map(caregiver => (
                    <li key={caregiver._id}>
                        <strong>{caregiver.name}</strong> - {caregiver.experience} years experience
                        <br />
                        <em>Availability:</em> {caregiver.availability}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CaregiverDirectory;
