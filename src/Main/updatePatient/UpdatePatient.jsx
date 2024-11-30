import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaUserEdit } from "react-icons/fa";

const UpdatePatient = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: singlePatientData = {}, isLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allPatients/${id}`);
      return res.data;
    },
  });

  const {
    _id,
    name,
    age,
    height,
    weight,
    disease,
    diagnosis,
    appointmentDate,
    medicines,
  } = singlePatientData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  
    // Copy the existing medicines array to avoid mutation
    const updatedMedicines = [...medicines];
  
    // Check if the medicine fields are filled out and update accordingly
    if (form.medicineName.value || form.medicineDosage.value) {
      updatedMedicines[0] = {
        medicineName: form.medicineName.value || updatedMedicines[0].medicineName,
        medicineDosage: form.medicineDosage.value || updatedMedicines[0].medicineDosage,
        measurementUnit: form.measurementUnit.value || updatedMedicines[0].measurementUnit,
        intakeType: form.intakeType.value || updatedMedicines[0].intakeType,
        necessityDosage: form.necessityDosage.value || updatedMedicines[0].necessityDosage,
        schedule: [
          ...updatedMedicines[0].schedule, // Retain the existing schedule
          ...(form.day.value && !updatedMedicines[0].schedule.some(sch => sch.day === form.day.value) ? [
            {
              day: form.day.value,
              date: appointmentDate, // Keep the original appointment date
              taken: false,
            }
          ] : []), // Only add new day if it's not already in the schedule
        ],
      };
    }
  
    // Now construct the patient object with updated medicines
    const patient = {
      email: user?.email,
      name: form.patientName.value,
      age: form.age.value,
      height: form.height.value,
      weight: form.weight.value,
      disease: form.disease.value,
      diagnosis: form.diagnosis.value,
      medicines: updatedMedicines, // Updated medicines array
    };
  
    // Send the PUT request to update the patient details
    fetch(`https://pediatric-oncology-server.vercel.app/allPatients/${id}`, {
      method: "PUT", // PUT method to update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Patient updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/allPatients");
        }
      });
  };
  
  
  

  return (
   <div className="min-h-screen bg-gray-100 p-2">
     <div className="p-8 bg-green-100 shadow-xl rounded-lg max-w-3xl mx-auto border border-gray-200">
      <Helmet>
        <title>Update Patient</title>
      </Helmet>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        <FaUserEdit></FaUserEdit> Update Patient
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Patient Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="font-medium">Patient Name</label>
            <input
              type="text"
              name="patientName"
              defaultValue={name}
              placeholder="Enter patient name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="form-control">
            <label className="font-medium">Age</label>
            <input
              type="number"
              name="age"
              defaultValue={age}
              placeholder="Enter age"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="form-control">
            <label className="font-medium">Height (cm)</label>
            <input
              type="number"
              name="height"
              defaultValue={height}
              placeholder="Enter height"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="form-control">
            <label className="font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              defaultValue={weight}
              placeholder="Enter weight"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Disease and Diagnosis */}
        <div className="form-control mb-4">
          <label className="font-medium">Disease</label>
          <input
            type="text"
            name="disease"
            defaultValue={disease}
            placeholder="Enter disease"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="form-control mb-4">
          <label className="font-medium">Diagnosis</label>
          <textarea
            name="diagnosis"
            defaultValue={diagnosis}
            placeholder="Enter diagnosis details"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Medicines */}
        <div className="form-control mb-4">
          <label className="font-medium">Medicine Name</label>
          <input
            type="text"
            name="medicineName"
            defaultValue={medicines?.[0]?.medicineName}
            placeholder="Enter medicine name"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="form-control mb-4">
          <label className="font-medium">Dosage</label>
          <input
            type="text"
            name="medicineDosage"
            defaultValue={medicines?.[0]?.medicineDosage}
            placeholder="Enter dosage"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="form-control mb-4">
          <label className="font-medium">Unit of Measurement</label>
          <input
            type="text"
            name="measurementUnit"
            defaultValue={medicines?.[0]?.measurementUnit}
            placeholder="Enter unit"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="form-control mb-4">
          <label className="font-medium">Intake Type</label>
          <input
            type="text"
            name="intakeType"
            defaultValue={medicines?.[0]?.intakeType}
            placeholder="Enter intake type"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="form-control mb-4">
          <label className="font-medium">Necessary Dosage</label>
          <input
            type="text"
            name="necessityDosage"
            defaultValue={medicines?.[0]?.necessityDosage}
            placeholder="Enter necessary dosage"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="form-control mb-6">
          <label className="font-medium">Schedule Day</label>
          <input
            type="text"
            name="day"
            defaultValue={medicines?.[0]?.schedule[0]?.day}
            placeholder="Enter schedule day"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full"
          >
            Update Patient
          </button>
        </div>
      </form>
    </div>
   </div>
  );
};

export default UpdatePatient;
