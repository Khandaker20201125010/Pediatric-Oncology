import { useState } from "react";
import Patient from "./patient";
import { useLoaderData } from "react-router-dom";

const AllPatients = () => {

  // useEffect to simulate data fetching
  // useEffect(() => {
  //   // Simulate an API call to fetch patient data
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("localhost:5000/allPatients");
  //       const data = await response.json();
  //       setPatients(data.patients);  // Set the patient data
  //       setLoading(false);  // Data is loaded
  //     } catch (error) {
  //       console.error("Error fetching the patient data:", error);
  //       setLoading(false);  // Stop loading even if there's an error
  //     }
  //   };

  const allPatients = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-10">
        All Patients
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allPatients.length > 0 ? (
          allPatients.map((allPatients) => (
            <Patient key={allPatients.id} allPatients={allPatients} />
          ))
        ) : (
          <div className="text-center text-lg font-bold">No patients found.</div>
        )}
      </div>
    </div>
  );
};

export default AllPatients;