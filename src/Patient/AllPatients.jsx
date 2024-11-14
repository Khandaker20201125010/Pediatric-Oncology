import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Patient from "./Patient";
import { Helmet } from "react-helmet-async";

const AllPatients = () => {
  const initialPatients = useLoaderData(); // Load data on initial render
  const [allPatients, setAllPatients] = useState(initialPatients); // Set as local state
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Function to handle removing a patient from state after deletion
  const removePatient = (patientId) => {
    setAllPatients((prevPatients) => prevPatients.filter((p) => p._id !== patientId));
  };

  // Filter patients based on search term
  const filteredPatients = allPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Helmet>All Patients || Pediatric Oncology</Helmet>
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">All Patients</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Patient key={patient._id} allPatients={patient} onDelete={removePatient} />
          ))
        ) : (
          <div className="text-center text-lg font-bold">No patients found.</div>
        )}
      </div>
    </div>
  );
};

export default AllPatients;
