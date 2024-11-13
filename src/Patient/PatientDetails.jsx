import { useLoaderData } from "react-router-dom";
import {
  FaPills,
  FaCalendarAlt,
  FaUser,
  FaNotesMedical,
  FaPlus,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useState } from "react";
import Swal from "sweetalert2";

const PatientDetails = () => {
  const patientData = useLoaderData();
  const [patient, setPatient] = useState(patientData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dayCount, setDayCount] = useState(1);


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
  } = patient;

  // Assuming each medicine has at least one schedule entry, get the initial date from the first schedule
  const initialDate =
    medicines?.[0]?.schedule[0]?.date || dayjs().format("YYYY-MM-DD");

  if (!patient) {
    return (
      <div className="max-w-lg w-full  bg-white border-2 border-black rounded-lg shadow-lg p-8 mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Patient Details
        </h2>
        <p className="text-gray-600">
          Loading patient details or no patient found...
        </p>
      </div>
    );
  }

  const getScheduleColor = (taken, date) => {
    const currentDate = dayjs().startOf("day");
    const scheduleDate = dayjs(date).startOf("day");

    if (taken) return "bg-green-500";
    if (scheduleDate.isSame(currentDate)) return "bg-blue-500";
    if (scheduleDate.isBefore(currentDate)) return "bg-red-500";
    return "bg-gray-300";
  };

  const handleDayClick = async (medicineIndex, scheduleIndex) => {
    const scheduleItem =
      patient.medicines[medicineIndex].schedule[scheduleIndex];
    const taken = scheduleItem.taken;
    const scheduleDate = dayjs(scheduleItem.date);
    const currentDate = dayjs().startOf("day");

    if (scheduleDate.isAfter(currentDate)) {
      Swal.fire(
        "Not Allowed",
        "You cannot change the status of a future day.",
        "warning"
      );
      return;
    }

    const result = await Swal.fire({
      title: taken ? "Mark as not-taken?" : "Mark as taken?",
      text: `Do you want to mark this day's medicine as ${
        taken ? "not-taken" : "taken"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: taken
        ? "Yes, mark as not-taken"
        : "Yes, mark as taken",
    });

    if (result.isConfirmed) {
      setPatient((prevPatient) => {
        const updatedMedicines = [...prevPatient.medicines];
        updatedMedicines[medicineIndex].schedule[scheduleIndex].taken = !taken;
        return { ...prevPatient, medicines: updatedMedicines };
      });

      fetch(`http://localhost:5000/allPatients/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicines: patient.medicines }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.medicines) {
            setPatient((prevPatient) => ({
              ...prevPatient,
              medicines: data.medicines,
            }));
            Swal.fire(
              "Updated!",
              `The medicine schedule has been marked as '${
                !taken ? "taken" : "not-taken"
              }'.`,
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
          setPatient((prevPatient) => {
            const revertedMedicines = [...prevPatient.medicines];
            revertedMedicines[medicineIndex].schedule[scheduleIndex].taken =
              taken;
            return { ...prevPatient, medicines: revertedMedicines };
          });
          Swal.fire(
            "Error!",
            "There was a problem updating the database. Please try again.",
            "error"
          );
        });
    }
  };

  const addDaysToSchedule = async () => {
    const newDate = dayjs(initialDate)
      .add(dayCount - 1, "day")
      .format("YYYY-MM-DD");

    const newSchedule = {
      day: dayCount,
      date: newDate,
      taken: false,
    };

    const updatedMedicines = patient.medicines.map((med) => ({
      ...med,
      schedule: [...med.schedule, newSchedule],
    }));

    setPatient((prevPatient) => ({
      ...prevPatient,
      medicines: updatedMedicines,
    }));

    try {
      const response = await fetch(`http://localhost:5000/allPatients/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicines: updatedMedicines }),
      });
      const data = await response.json();
      if (data && data.medicines) {
        setPatient((prevPatient) => ({
          ...prevPatient,
          medicines: data.medicines,
        }));
        Swal.fire(
          "Success!",
          `Day ${dayCount} added to the schedule.`,
          "success"
        );
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      setPatient((prevPatient) => ({
        ...prevPatient,
        medicines: patient.medicines,
      }));
      Swal.fire(
        "Error!",
        "There was a problem updating the database. Please try again.",
        "error"
      );
    }

    setShowModal(false);
  };

  const handleAddDay = () => {
    setShowModal(true);
  };
    const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
   const handleAddMedicineSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const newMedicine = {
      medicineName: form.medicineName.value,
      medicineDosage: form.medicineDosage.value,
      measurementUnit: form.measurementUnit.value,
      intakeType: form.intakeType.value,
      necessityDosage: form.necessityDosage.value,
      schedule: [
        {
          day: form.day.value,
          date: appointmentDate,
          taken: false,
        },
      ],
    };

    const updatedMedicines = [...patient.medicines, newMedicine];
    setPatient((prevPatient) => ({ ...prevPatient, medicines: updatedMedicines }));

    fetch(`http://localhost:5000/allPatients/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicines: updatedMedicines }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.medicines) {
          setPatient((prevPatient) => ({ ...prevPatient, medicines: data.medicines }));
          Swal.fire("Success!", "New medicine added successfully.", "success");
        }
      })
      .catch((error) => {
        console.error("Error adding medicine:", error);
        Swal.fire("Error!", "There was a problem adding the new medicine. Please try again.", "error");
      });

    closeModal();
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gray-50 rounded-lg shadow-lg  border ">
      <div className="border-b pb-6 mb-6">
        <h2 className="text-5xl font-bold text-blue-700 mb-2">
          {name}'s Medical Overview
        </h2>
        <p className="text-gray-500 text-lg mb-4">
          Patient Details & Medication Information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {[
          {
            label: "Age",
            value: `${age} years`,
            icon: <FaUser className="text-blue-500" />,
          },
          {
            label: "Height",
            value: `${height} cm`,
            icon: <FaNotesMedical className="text-blue-500" />,
          },
          {
            label: "Weight",
            value: `${weight} kg`,
            icon: <FaNotesMedical className="text-blue-500" />,
          },
          {
            label: "Body Surface Area (BSA)",
            value: `${Math.sqrt((height * weight) / 3600).toFixed(3)} m²`,
            icon: <FaNotesMedical className="text-blue-500" />,
          },
        ].map((info, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-6 shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105"
          >
            <div className="text-3xl">{info.icon}</div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {info.label}
              </p>
              <p className="text-2xl text-gray-900">{info.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DetailCard
          label="Disease"
          value={disease}
          icon={<FaNotesMedical className="mr-2 text-blue-500 text-3xl" />}
        />
        <DetailCard
          label="Diagnosis"
          value={diagnosis}
          icon={<FaNotesMedical className="mr-2 text-blue-500 text-3xl" />}
        />
        <DetailCard
          label="Next Appointment"
          value={appointmentDate}
          icon={<FaCalendarAlt className="mr-2 text-blue-500 text-3xl" />}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">
          Medication Plan
        </h3>
        <p className="text-gray-600 mb-4">
          Treatment Type: <span className="font-medium text-gray-800"></span>
        </p>

        {medicines?.map((med, medIndex) => (
          <div key={medIndex} className="mb-6">
            <div className="bg-white rounded-lg p-6 shadow-md mb-4 transition-shadow hover:shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-gray-900 flex items-center">
                  <FaPills className="mr-2 text-blue-500" /> {med.medicineName}
                </p>
                <div className="flex justify-center space-x-2 text-lg">
                  <p>
                    {med.medicineDose} {med.measurementUnit}
                  </p>
                  <p>{med.intakeType}</p>
                </div>
                <p className="font-medium text-gray-500">
                <span>  {(med.necessityDosage * med.medicineDosage).toFixed(2)}{" "}</span>
                  {med.measurementUnit} total
                </p>
              </div>

              <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Medicine Schedule
                </h4>
                <div className="grid grid-cols-7 gap-2">
                  {med.schedule?.map((schedule, scheduleIndex) => (
                    <div
                      key={scheduleIndex}
                      className="flex flex-col items-center"
                    >
                      <div
                        onClick={() => handleDayClick(medIndex, scheduleIndex)}
                        className={`${getScheduleColor(
                          schedule.taken,
                          schedule.date
                        )} text-white rounded-full px-4 py-2 mb-1 text-center text-sm font-medium transition-transform hover:scale-105 cursor-pointer`}
                      >
                        Day {schedule.day}
                      </div>
                      <p className="text-gray-700 text-sm font-medium">
                        {schedule.date}
                      </p>
                    </div>
                  ))}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleAddDay}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-center text-sm font-medium transition-transform hover:scale-105 flex items-center space-x-1"
                    >
                      <FaPlus /> <span>Add day</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Add Days to Schedule
            </h3>
            <p className="text-gray-600 mb-4">
              Enter the number of days to add:
            </p>
            <input
              type="number"
              value={dayCount}
              onChange={(e) => setDayCount(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addDaysToSchedule}
                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-center text-sm font-medium transition-transform hover:scale-105 flex items-center space-x-1"
        >
          <FaPlus /> <span>Add Medicine</span>
        </button>

        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Medicine</h2>
            <form onSubmit={handleAddMedicineSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Medicine Name</label>
                <input type="text" name="medicineName" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Dosage</label>
                <input type="number" name="medicineDosage" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Measurement Unit</label>
                <input type="text" name="measurementUnit" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Intake Type</label>
                <input type="text" name="intakeType" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Necessity Dosage</label>
                <input type="number" name="necessityDosage" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Day</label>
                <input type="number" name="day" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

const DetailCard = ({ label, value, icon }) => (
  <div className="bg-white rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 flex items-center">
    {icon}
    <div>
      <p className="text-lg font-semibold text-gray-700">{label}</p>
      <p className="text-2xl text-gray-900">{value}</p>
    </div>
  </div>
);

export default PatientDetails;
