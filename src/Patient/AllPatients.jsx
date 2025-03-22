import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import usePatientData from "../Hooks/usePatientData";
import Patient from "./Patient";
import { AuthContext } from "../Providers/AuthProvider";
import moment from "moment";


const AllPatients = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [allPatient, refetch] = usePatientData(); // Fetch all patients
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [time, setTime] = useState(moment().format("h:mm:ss a"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("h:mm:ss a"));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Filter patients added by logged-in user
  const userPatients = allPatient.filter(
    (patient) => patient.email === user?.email
  );

  // Filter by search term
  const filteredPatients = userPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Helmet>
        <title>All Patients || Pediatric Oncology</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">
        My Patients
      </h1>
      <div className="text-center text-xl font-bold mb-2">{time}</div>
   
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
            <Patient
              key={patient._id}
              allPatients={patient}
              refetch={refetch}
            />
          ))
        ) : (
          <div className="text-center text-lg font-bold">
            No patients found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPatients;
