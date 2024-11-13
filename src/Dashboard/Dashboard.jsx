// Dashboard.js
import { useState } from 'react';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.patientName.value;
    const age = form.age.value;
    const height = form.height.value;
    const weight = form.weight.value;
    const disease = form.disease.value;
    const diagnosis = form.diagnosis.value;
    const appointmentDate = form.appointmentDate.value;
    const medicineName = form.medicineName.value;
    const medicineDosage = form.medicineDosage.value;
    const necessityDosage = form.necessityDosage.value;
    const measurementUnit = form.measurementUnit.value;
    const intakeType = form.intakeType.value;
    const day = form.day.value;

    const patient = {
      name,
      age,
      height,
      weight,
      disease,
      diagnosis,
      appointmentDate,
      medicines: [
        {
          medicineName,
          medicineDosage,
          measurementUnit,
          intakeType,
          necessityDosage,
          schedule: [
            {
              day: day,
              date: appointmentDate,
              taken: false
            }
          ]
        }
      ]
    };

    fetch('http://localhost:5000/allPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Success!',
          text: 'Patient Added Successfully',
          icon: 'success',
          confirmButtonText: 'Great'
        })
        // Handle success or error
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message
        });
        // Handle error
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Patient Data Upload</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Patient Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-800">Patient Name</label>
              <input
                type="text"
                name="patientName"
                placeholder="Enter patient name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Height (cm)</label>
              <input
                type="number"
                name="height"
                placeholder="Enter height"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="Enter weight"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-800">Disease Name</label>
              <input
                type="text"
                name="disease"
                placeholder="Enter disease name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-800">Diagnosis</label>
              <textarea
                name="diagnosis"
                placeholder="Enter diagnosis details"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-800">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-800">Patient Details</label>
              <input
                type="text"
                name="patientDetails"
                placeholder="Enter additional patient details"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Medicine Details */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Medicine Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  placeholder="Enter medicine name"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Medicine Dosage</label>
                <input
                  type="number"
                  name="medicineDosage"
                  placeholder="Enter dosage"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Measurement Unit</label>
                <input
                  type="text"
                  name="measurementUnit"
                  placeholder="Enter measurement unit"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Intake Type</label>
                <input
                  type="text"
                  name="intakeType"
                  placeholder="Enter intake type"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Necessity Dosage</label>
                <input
                  type="number"
                  name="necessityDosage"
                  placeholder="Enter necessity dose"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800">Day</label>
                <input
                  type="number"
                  name="day"
                  placeholder="Enter Day"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
            >
              Submit Patient Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;