import {
  FaUserCircle,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaUserEdit,
} from "react-icons/fa";
import {
  FaRuler,
  FaWeight,
  FaStethoscope,
  FaChild,
} from "react-icons/fa";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

import Swal from "sweetalert2";

const Patient = ({ allPatients, onDelete }) => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { _id, name, age, height, weight, appointmentDate, medicines } =
    allPatients;
  const today = moment();
  const bsa = Math.sqrt((height * weight) / 3600).toFixed(3);

  let medicineTodayCount = 0;
  let medicineTomorrowCount = 0;
  let medicineYesterdayCount = 0;
  let allMedicinesTakenToday = true;

  medicines.forEach((medicine) => {
    medicine.schedule.forEach((schedule) => {
      const medicineDate = moment(schedule.date);
      if (medicineDate.isSame(today, "day")) {
        medicineTodayCount += 1;
        if (!schedule.taken) allMedicinesTakenToday = false;
      } else if (medicineDate.isSame(today.clone().add(1, "day"), "day")) {
        medicineTomorrowCount += 1;
      } else if (medicineDate.isSame(today.clone().subtract(1, "day"), "day")) {
        medicineYesterdayCount += 1;
      }
    });
  });

  let status = "No Medicine Recently";
  let statusColor = "bg-gray-200 text-gray-600";
  let StatusIcon = null;

  if (medicineTodayCount > 0 && !allMedicinesTakenToday) {
    status = `${medicineTodayCount} Medicine(s) Today`;
    statusColor = "bg-blue-50 text-blue-600 border border-blue-400";
    StatusIcon = FaCheckCircle;
  } else if (medicineTomorrowCount > 0) {
    status = `${medicineTomorrowCount} Medicine(s) Tomorrow`;
    statusColor = "bg-gray-50 text-gray-600 border border-gray-400";
    StatusIcon = FaClock;
  } else if (medicineTodayCount > 0 && allMedicinesTakenToday) {
    status = `Medicine(s) Taken Today`;
    statusColor = "bg-green-50 text-green-600 border border-green-400";
    StatusIcon = FaCheckCircle;
  } else if (medicineYesterdayCount > 0) {
    status = `${medicineYesterdayCount} Medicine(s) Yesterday`;
    statusColor = "bg-yellow-50 text-yellow-600 border border-yellow-400";
    StatusIcon = FaExclamationCircle;
  }

  const handleDetailsClick = () => {
    navigate(`/patientDetails/${_id}`);
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosPublic.delete(`/allPatients/${_id}`);
      if (res.data.deletedCount > 0) {
        queryClient.invalidateQueries("allPatients");
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        onDelete(_id);
      }
    }
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-end gap-3">
        <Link to={`/updatePatient/${_id}`}>
          <button>
            <FaUserEdit className="text-2xl text-green-700 hover:bg-black hover:rounded-full " />
          </button>
        </Link>

        <button onClick={() => handleDelete(_id)}>
          <GiCancel className="text-xl text-red-700" />
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <FaUserCircle className="text-teal-500 text-6xl" />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">Pediatric Patient</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaChild className="text-teal-500 text-2xl mr-2" />
          <p className="text-gray-700 font-bold">Age: {age} years</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaRuler className="text-teal-500 text-2xl mr-2" />
          <p className="text-gray-700 font-bold">Height: {height} cm</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaWeight className="text-teal-500 text-2xl mr-2" />
          <p className="text-gray-700 font-bold">Weight: {weight} kg</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaStethoscope className="text-teal-500 text-2xl mr-2" />
          <p className="text-gray-700 font-bold">BSA: {bsa} m²</p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <p className="text-gray-700 font-medium">Appointment Date:</p>
        <p className="text-gray-900 font-semibold">{appointmentDate}</p>
      </div>

      <div
        className={`flex items-center justify-center py-2 px-4 rounded-full font-semibold ${statusColor}`}
      >
        {StatusIcon && <StatusIcon className="mr-2" />}
        <span>{status}</span>
      </div>

      <div className="text-center">
        <button
          onClick={handleDetailsClick}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-8 rounded-full mt-4"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Patient;
