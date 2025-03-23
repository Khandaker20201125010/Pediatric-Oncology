import React, { useState } from "react";

const ViewPatientsCards = ({ patient }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>
      <p>
        <strong>Disease:</strong> {patient.disease}
      </p>
      <p>
        <strong>Appointment:</strong> {patient.appointmentDate}
      </p>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>

      {showDetails && (
        <div className="mt-4">
          <p>
            <strong>Diagnosis:</strong> {patient.diagnosis}
          </p>
          <p>
            <strong>Details:</strong> {patient.details}
          </p>
          <div className="mt-2">
            <h3 className="text-lg font-bold">Medicines:</h3>
            {patient.medicines.map((medicine, index) => (
              <div key={index} className="mt-2">
                <p>
                  <strong>{medicine.medicineName}</strong> (
                  {medicine.necessityDose} {medicine.measurementUnit})
                </p>
                <p>
                  <strong>Schedule:</strong>
                </p>
                <ul>
                  {medicine.schedule.map((dose, i) => (
                    <li key={i}>
                      {dose.day} - {dose.date} - {dose.time}{" "}
                      {dose.taken ? "✔️" : "❌"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatientsCards;
