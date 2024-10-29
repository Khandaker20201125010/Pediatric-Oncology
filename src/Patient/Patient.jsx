import { FaUserCircle, FaCheckCircle, FaExclamationCircle, FaClock } from "react-icons/fa";
import { FaRuler, FaWeight, FaStethoscope, FaChild } from "react-icons/fa";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Patient = ({ allPatients }) => {

  const { _id, name, age, height, weight, disease, diagnosis, appointmentDate, medicines, meditationType } = allPatients;

  const today = moment();
  const navigate = useNavigate();

  const bsa = Math.sqrt((height * weight) / 3600).toFixed(3);

  // Initialize medicine counters
  let medicineTodayCount = 0;
  let medicineTomorrowCount = 0;
  let medicineYesterdayCount = 0;
  let allMedicinesTakenToday = true;

  // Count medicines for today, tomorrow, and yesterday, checking 'taken' status
  medicines.forEach(medicine => {
    medicine.schedule.forEach(schedule => {
      const medicineDate = moment(schedule.date);

      if (medicineDate.isSame(today, "day")) {
        medicineTodayCount += 1;
        if (!schedule.taken) {
          allMedicinesTakenToday = false; // If any medicine today is not taken
        }
      } else if (medicineDate.isSame(today.clone().add(1, "day"), "day")) {
        medicineTomorrowCount += 1;
      } else if (medicineDate.isSame(today.clone().subtract(1, "day"), "day")) {
        medicineYesterdayCount += 1;
      }
    });
  });

  // Determine medicine status
  let status = 'No Medicine Recently';
  let statusColor = "bg-gray-200 text-gray-600";
  let StatusIcon = null;

  if (medicineTodayCount > 0 && !allMedicinesTakenToday) {
    // There are medicines today and at least one is not taken
    status = `${medicineTodayCount} Medicine(s) Today`;
    statusColor = "bg-blue-50 text-blue-600 border border-blue-400";
    StatusIcon = FaCheckCircle;
  } else if (medicineTomorrowCount > 0) {
    // There are medicines for tomorrow
    status = `${medicineTomorrowCount} Medicine(s) Tomorrow`;
    statusColor = "bg-gray-50 text-gray-600 border border-gray-400";
    StatusIcon = FaClock;
  } else if (medicineTodayCount > 0 && allMedicinesTakenToday) {
    // All today's medicines are taken and no medicines tomorrow
    status = `Medicine(s) Taken Today`;
    statusColor = "bg-green-50 text-green-600 border border-green-400";
    StatusIcon = FaCheckCircle;
  } else if (medicineYesterdayCount > 0) {
    // There were medicines yesterday
    status = `${medicineYesterdayCount} Medicine(s) Yesterday`;
    statusColor = "bg-yellow-50 text-yellow-600 border border-yellow-400";
    StatusIcon = FaExclamationCircle;
  }

  const handleDetailsClick = () => {
    // Navigate to the PatientDetails page
    navigate(`/patientDetails/${_id}`);
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* User Icon and Name */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-shrink-0">
          <FaUserCircle className="text-teal-500 text-6xl" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">Pediatric Patient</p>
        </div>
      </div>

      {/* Patient Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Age */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaChild className="text-teal-500 text-2xl mr-2" />
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">Age:</p>
            <p className="text-gray-900 font-bold">{age} years</p>
          </div>
        </div>

        {/* Height */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaRuler className="text-teal-500 text-2xl mr-2" />
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">Height:</p>
            <p className="text-gray-900 font-bold">{height} cm</p>
          </div>
        </div>

        {/* Weight */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaWeight className="text-teal-500 text-2xl mr-2" />
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">Weight:</p>
            <p className="text-gray-900 font-bold">{weight} kg</p>
          </div>
        </div>

        {/* BSA */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <FaStethoscope className="text-teal-500 text-2xl mr-2" />
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">BSA:</p>
            <p className="text-gray-900 font-bold">{bsa} m²</p>
          </div>
        </div>
      </div>

      {/* Appointment Date */}
      <div className="flex gap-4 mb-4">
        <p className="text-gray-700 font-medium">Appointment Date:</p>
        <p className="text-gray-900 font-semibold">{appointmentDate}</p>
      </div>

      {/* Status */}
      <div className={`flex items-center justify-center py-2 px-4 rounded-full font-semibold ${statusColor}`}>
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