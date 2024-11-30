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

    const patient = {
      email: user?.email,
      name: form.patientName.value,
      age: form.age.value,
      height: form.height.value,
      weight: form.weight.value,
      disease: form.disease.value,
      diagnosis: form.diagnosis.value,
      appointmentDate: form.appointmentDate.value,
      medicines: [
        {
          medicineName: form.medicineName.value,
          medicineDosage: form.medicineDosage.value,
          measurementUnit: form.measurementUnit.value,
          intakeType: form.intakeType.value,
          necessityDosage: form.necessityDosage.value,
          schedule: [
            {
              day: form.day.value,
              date: form.appointmentDate.value,
              taken: false,
            },
          ],
        },
      ],
    };

    fetch(`https://pediatric-oncology-server.vercel.app/allPatients/${id}`, {
      method: "PUT", // Use PUT for updating
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
    <div className="p-8 bg-green-100 shadow-xl rounded-lg max-w-3xl mx-auto border border-gray-200 mt-5">
    <Helmet>
      <title>Update Patient</title>
    </Helmet>
    
    {/* Title */}
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
    <FaUserEdit /> Update Patient
    </h2>
    
    {/* Form */}
    <form onSubmit={handleSubmit}>
      {/* Patient Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Patient Name</label>
          <input
            type="text"
            name="patientName"
            defaultValue={name}
            placeholder="Enter patient name"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Age</label>
          <input
            type="number"
            name="age"
            defaultValue={age}
            placeholder="Enter age"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Height (cm)</label>
          <input
            type="number"
            name="height"
            defaultValue={height}
            placeholder="Enter height"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            defaultValue={weight}
            placeholder="Enter weight"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>
  
      {/* Disease and Diagnosis */}
      <div className="mb-8">
        <label className="text-gray-600 font-medium mb-2 block">Disease</label>
        <input
          type="text"
          name="disease"
          defaultValue={disease}
          placeholder="Enter disease"
          className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
        />
      </div>
      <div className="mb-8">
        <label className="text-gray-600 font-medium mb-2 block">Diagnosis</label>
        <textarea
          name="diagnosis"
          defaultValue={diagnosis}
          placeholder="Enter diagnosis details"
          className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
        />
      </div>
  
      {/* Appointment Details */}
      <div className="mb-8">
        <label className="text-gray-600 font-medium mb-2 block">Appointment Date</label>
        <input
          type="date"
          name="appointmentDate"
          defaultValue={appointmentDate}
          className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
        />
      </div>
  
      {/* Medicine Details */}
      <h3 className="text-xl font-semibold text-gray-700 mb-6">Medicine Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Medicine Name</label>
          <input
            type="text"
            name="medicineName"
            defaultValue={medicines?.[0]?.medicineName}
            placeholder="Enter medicine name"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Dosage</label>
          <input
            type="text"
            name="medicineDosage"
            defaultValue={medicines?.[0]?.medicineDosage}
            placeholder="Enter dosage"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Unit</label>
          <input
            type="text"
            name="measurementUnit"
            defaultValue={medicines?.[0]?.measurementUnit}
            placeholder="Enter unit"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="form-group">
          <label className="text-gray-600 font-medium mb-2 block">Intake Type</label>
          <input
            type="text"
            name="intakeType"
            defaultValue={medicines?.[0]?.intakeType}
            placeholder="Enter intake type"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>
  
      {/* Schedule */}
      <div className="mb-8">
        <label className="text-gray-600 font-medium mb-2 block">Schedule Day</label>
        <input
          type="text"
          name="day"
          defaultValue={medicines?.[0]?.schedule?.[0]?.day}
          placeholder="Enter schedule day"
          className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400"
        />
      </div>
  
      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
        >
          Update Patient
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default UpdatePatient;
